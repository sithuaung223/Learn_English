function createCardBtn(dict, w, flash_card_dict) {
	var card_json = card_dict[w];
	card_data = JSON.parse(card_json);
	console.log("card_data: ", card_data);
	var Card = card_data[0].fields;

	var card = {
		front_side: Card.front_side,
		flipped_side: Card.flipped_side,
		isLearned: Card.isLearned,
		dateIsLearned: Card.dateIsLearned,
		remindingDayCount: Card.remindingDayCount 
	};
	console.log("card.dateIsLearned: ", card.dateIsLearned);
	var flash_card = {
		card: card,
		isFrontSide: true
	}
	var card_btn = createCardBtnWithFlashCard(w, flash_card);
	flash_card_dict[w] = flash_card;
	return card_btn;
}

function createCardBtnWithFields(id, card_fields) {
	var card = {
		front_side: card_fields.front_side ,
		flipped_side: card_fields.flipped_side,
		isLearned: card_fields.isLearned,
		dateIsLearned: card_fields.dateIsLearned,
		remindingDayCount: card_fields.remindingDayCount 
	};

	var flash_card = {
		id: id,
		card: card,
		isFrontSide: true
	};
	var card_btn = createCardBtnWithFlashCard(flash_card.id, flash_card);
	flash_card_dict[flash_card.id] = flash_card;
	return card_btn;
}

function createDeckWithDictionary(dict, flash_card_dict) {
	var deck = [];
	for (var w in dict) {
		var card_btn = createCardBtn(dict, w, flash_card_dict);
		deck.push(card_btn);
	}
	return deck;
}

function getIndexOfCard(cards, current_card_btn) {
	return index = cards.indexOf(current_card_btn);
}

function insertNewCard(parent, new_card, next_btn) {
	if (new_card != null ) {
		parent.insertBefore(new_card, next_btn);
	}
}

function getDisplayDeckWithIsFiltered(deck, filtered_deck, isFiltered) {
	filtered_deck = updateFilteredDeck(deck, filtered_deck);
	var display_deck = (isFiltered) ? filtered_deck : deck;
	return display_deck;
}

function getNewCardBtn(cards, current_card_btn, btn) {
	var index = getIndexOfCard(cards, current_card_btn);
	var new_card_btn = (btn.id =='next') 
					? cards[index+1]
					: cards[index-1];
	return new_card_btn;
}

function replaceWithNewCardBtn(parent, current_card_btn, new_card_btn, next_btn) {
	parent.removeChild(current_card_btn);
	insertNewCard(parent, new_card_btn, next_btn);
	return new_card_btn;
}

function cardBtnIsLearned(card_btn) {
	return flash_card_dict[ card_btn.id ].card.isLearned;
}

function updateFilteredDeck(deck, filtered_deck) {
	filtered_deck.cards = [];
	for (var i in deck.cards) {
		var card_btn = deck.cards[i];
		if (cardBtnIsLearned(card_btn))
			filtered_deck.cards.push(card_btn);
	}
	return filtered_deck;
}

function isEndDisableButton(cards, current_card_btn, next_btn, prev_btn) {
   	var index = getIndexOfCard(cards, current_card_btn);
   	prev_btn.disabled = (index <= 0 ) ? true : false;
   	next_btn.disabled = (index >= cards.length-1) ? true : false;
}

