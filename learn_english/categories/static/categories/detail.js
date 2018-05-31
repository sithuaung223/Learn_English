function main(card_dict, meaning_dict){
  // var meaning_dict = JSON.parse('{{ meaning_dict | escapejs }}');
  console.log("meaning_dict",meaning_dict);

  var deck = {
    cards:[]
  };
  var filtered_deck = {
    cards:[]
  };

  deck.cards = createDeckWithDictionary(meaning_dict, flash_card_dict);
  var current_card_btn = deck.cards[0]

  var prev_btn = createButton(document, 'prev');
  prev_btn.disabled = true;
  var next_btn = createButton(document, 'next');

  var isLearned = createCheckBoxWithLabel("isLearned", "isLearned");
  isLearned.checked = flash_card_dict[current_card_btn.id].card.isLearned;
  var isFiltered = createCheckBoxWithLabel("isFiltered", "isFiltered");

  prev_btn.onclick = function() {
    flash_card_dict[current_card_btn.id].card.isLearned = isLearned.checked;
    flash_card_dict[current_card_btn.id].card.dateIsLearned = (isLearned.checked) ? NOW : null;

    var display_deck = getDisplayDeckWithIsFiltered(deck, filtered_deck, isFiltered.checked);
    var new_card_btn = getNewCardBtn(display_deck.cards, current_card_btn, prev_btn);

    current_card_btn = replaceWithNewCardBtn(current_card_btn, new_card_btn, next_btn);
    isLearned.checked = cardBtnIsLearned(current_card_btn);
    isEndDisableButton(display_deck.cards, current_card_btn, next_btn, prev_btn);
  };
  next_btn.onclick = function() {
    // change here
    flash_card_dict[current_card_btn.id].card.isLearned = isLearned.checked;
    flash_card_dict[current_card_btn.id].card.dateIsLearned = (isLearned.checked) ? NOW : null;

    var display_deck = getDisplayDeckWithIsFiltered(deck, filtered_deck, isFiltered.checked);
    var new_card_btn = getNewCardBtn(display_deck.cards, current_card_btn, next_btn);

    current_card_btn = replaceWithNewCardBtn(current_card_btn, new_card_btn, next_btn);
    // change here
    isLearned.checked = cardBtnIsLearned(current_card_btn);
    isEndDisableButton(display_deck.cards, current_card_btn, next_btn, prev_btn);
  };
  isFiltered.onclick = function() {
  flash_card_dict[current_card_btn.id].card.isLearned = isLearned.checked; 
  flash_card_dict[current_card_btn.id].card.dateIsLearned = (isLearned.checked) ? NOW : null;

  var display_deck = getDisplayDeckWithIsFiltered(deck, filtered_deck, isFiltered.checked);
  new_card_btn = display_deck.cards[0];

    current_card_btn = replaceWithNewCardBtn(current_card_btn, new_card_btn, next_btn);
    isLearned.checked = cardBtnIsLearned(current_card_btn);
    isEndDisableButton(display_deck.cards, current_card_btn, next_btn, prev_btn);
  }



  document.body.appendChild(prev_btn);
  document.body.appendChild(current_card_btn);
  document.body.appendChild(next_btn);
  
  document.write("<br>");
  var isLearnedLabel = createLabelForCheckBox("isLearned");
  document.body.appendChild(isLearnedLabel);
  document.body.appendChild(isLearned);

  document.write("<br>");
  var isFilteredLabel = createLabelForCheckBox("isFiltered");
  document.body.appendChild(isFilteredLabel);
  document.body.appendChild(isFiltered);
  
  $("#isLearned").change(function () {
    console.log( $(this)[0].checked);
    console.log(current_card_btn.id);
    var isLearned = $(this)[0].checked;
    var front_side = current_card_btn.id;

    $.ajax({
      url: "{% url 'categories:update_isLearnedCard' %}",
      data: {
        'front_side' : front_side,
        'isLearned' : isLearned
      },
      dataType: 'json',
      success: function(data) {
        console.log(data.name, " isLearned: ", data.val);
        console.log("date: ", data.dateIsLearned);
      }
    });

  });
  // document.write("<br>");
  // document.write("<hr>");
  // document.write("<br>");

  // var reminder = createButton(document, 'Show Reminder Page');
  // document.body.appendChild(reminder);
  // reminder.onclick = function() {
  //   window.localStorage.setItem("flash_card_dict", JSON.stringify(flash_card_dict)); // Saving
  //   window.location = './reminder.html?category='+selected_category;
  // }


}