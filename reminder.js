function isRemindingDay(dateToday, dateIsLearned, remindingDayCount) {
	console.log("dateIsLearned: ", dateIsLearned, "remindingDayCount : ", remindingDayCount);
	return (dateToday >= (dateIsLearned+remindingDayCount)) ? true : false;
}

function getReminderCardBtn_FromFilteredDeck_WithTodayDate(dateToday, filtered_deck) {
	var reminder_card_btns = [];
	for (var i in filtered_deck.cards) {
		var card_btn = filtered_deck.cards[i]
		var flash_card = flash_card_dict[card_btn.id];
		if ( isRemindingDay(dateToday, flash_card.card.dateIsLearned, flash_card.card.remindingDayCount) ) {
			reminder_card_btns.push(card_btn);
		}
	}
	return reminder_card_btns;
}

function updateRemindingDayCountWithCardBtn(isRemembered, card) {
	card.remindingDayCount *= (isRemembered) ? 2 : 1/2;
}

// Thing To be deleted after testing
var br = document.createElement("br");
var br1 = document.createElement("br");
var date_text = document.createElement("p1");
// Thing To be deleted after testing

var isRemembered_btn = createButton(document, 'next');
var notRemembered_btn = createButton(document, 'next');
isRemembered_btn.innerHTML = "isRemembered";
notRemembered_btn.innerHTML = "notRemembered";

function reminderJS_main(filtered_deck) {
	// Thing To be deleted after testing
	console.log("In Reminder Function");
	++date_increment;
	var dateToday = NOW + date_increment;
	console.log("dateToday: ", dateToday);
	date_text.innerHTML = "Day: " + dateToday;
	document.body.appendChild(date_text);
	document.body.appendChild(br1);
	// Thing To be deleted after testing

	var reminder_card_btns = getReminderCardBtn_FromFilteredDeck_WithTodayDate(dateToday, filtered_deck);
	console.log(reminder_card_btns);

	if (reminder_card_btns.length <= 0)	{
		console.log("EXIT: NO Reminder card for Today!");
		return;
	}


	var card_btn = reminder_card_btns[0];

	isRemembered_btn.onclick = function() {
		var flash_card = flash_card_dict[card_btn.id];
		flash_card.card.dateIsLearned = dateToday;
		updateRemindingDayCountWithCardBtn(true, flash_card.card);

		var new_card_btn = getNewCardBtn(reminder_card_btns, card_btn, isRemembered_btn);
		card_btn = replaceWithNewCardBtn(card_btn, new_card_btn, br);

		if (new_card_btn == null) {
			document.body.removeChild(notRemembered_btn);
			document.body.removeChild(isRemembered_btn);
		}
	}

	notRemembered_btn.onclick = function() {
		var flash_card = flash_card_dict[card_btn.id];
		flash_card.card.dateIsLearned = dateToday;
		updateRemindingDayCountWithCardBtn(false, flash_card.card);
		
		var new_card_btn = getNewCardBtn(reminder_card_btns, card_btn, notRemembered_btn);
		card_btn = replaceWithNewCardBtn(card_btn, new_card_btn, br);

		if (new_card_btn == null) {
			document.body.removeChild(notRemembered_btn);
			document.body.removeChild(isRemembered_btn);
		}
	}

	document.body.appendChild(card_btn);
	document.body.appendChild(br);
	document.body.appendChild(notRemembered_btn);
	document.body.appendChild(isRemembered_btn);
}
