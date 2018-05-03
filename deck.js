function createCardBtn(doc, dict, w, flash_card_dict) {
	var card = {
		front_side: w,
		flipped_side: dict[w],
		isLearned: false
	};
	var flash_card = {
		card: card,
		isFrontSide: true
	}
	var card_btn = createCardBtnWithText(w, flash_card);
	flash_card_dict[w] = flash_card;
	return card_btn;
}

function createDeckWithDictionary(doc, dict, flash_card_dict) {
	var deck = [];
	for (var w in dict) {
		var card_btn = createCardBtn(doc, dict, w, flash_card_dict);
		deck.push(card_btn);
	}
	return deck;
}

function getIndexOfCard(cards, current_card_btn) {
	return index = cards.indexOf(current_card_btn);
}

function insertNewCard(doc, new_card, next_btn) {
	if (new_card != null ) {
		doc.body.insertBefore(new_card, next_btn);
	}
}

function replaceWithNewCardBtn(doc, deck, current_card_btn, btn, isLearned) {
	flash_card_dict[current_card_btn.id].card.isLearned = isLearned;
	document.body.removeChild(current_card_btn);
	var index = getIndexOfCard(deck.cards, current_card_btn);

	var new_card_btn = (btn.current.id =='next') 
					? deck.cards[index+1]
					: deck.cards[index-1];
	insertNewCard(doc, new_card_btn, btn.next);
	return new_card_btn;
}

//TODO: disable button at the end of array