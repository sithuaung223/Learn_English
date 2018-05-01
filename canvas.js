function writeTextToCanvas(c, label) {
	c.name = label;
	var ctx = c.getContext("2d");
	ctx.textAlign = "center";
	ctx.fillText(label, c.width/2, c.height/2);
}

function setCanvasStyle(c)
{
	c.width = '200';
	c.height = 100;
	c.style.border = '1px solid #000000';
}

function setCanvasId(c, id) { c.id = id; }

function deleteTextInCanvas(c) {
	var ctx = c.getContext("2d");
	ctx.clearRect(0, 0, c.width, c.height);
}

function rewriteTextToCanvas(c, text) {
	deleteTextInCanvas(c);
	writeTextToCanvas(c, text);
}

function createCanvasWithText(doc, id, text) {
	var canvas = doc.createElement("canvas");
    setCanvasId(canvas, id);
    setCanvasStyle(canvas);
	writeTextToCanvas(canvas, text);
	canvas.onclick = function(){
    window.location = './animals.html?category='+text;
    };
  return canvas;
}

function createCanvasWithCard(doc, card) {
	var canvas = createCanvasWithText(document, card.id, card.word[card.flip]);
	canvas.onclick = function() {
		card.flip = Math.abs(card.flip - 1);
		rewriteTextToCanvas(canvas, card.word[card.flip]);
	}
	return canvas;
}

function createCard(doc, dict, w, i) {
	var card = {
		id: i,
		word: [w, dict[w]],
		flip: 0,
	};
	var canvas = createCanvasWithCard(doc, card);
	var cb = createCheckBox(doc, "myLearnBox", false);
	var flash_card = {
		canvas: canvas,
		learnBox: cb
	}
	return flash_card;
}

function createDeckWithDictionary(doc, dict) {
	var deck = [];
	var i = 0;
	for (var w in dict) {
		var card = createCard(doc, dict, w, i);
		deck.push(card);
		++i;
	}
	return deck;
}

function getNewCardWithIndex(deck, current_card, new_index) {
	if (new_index >= 0 && new_index < deck.length) {
		current_card = deck[new_index];
	}
	return current_card;
}

function incrementIndexWithButton(index, current_btn) {
	if (current_btn.id == 'next') {
		return (index+1);
	}
	else if (current_btn.id == 'prev') {
		return (index-1);
	}
}

function getIndexOfCard(deck, current_card) {
	return index = deck.indexOf(current_card);
}

function removeCardFromNewDeck(new_deck, card) {
	var index = getIndexOfCard(new_deck, card);
	var learn_card = card;
	if (index > -1) {
		new_deck.splice(index, 1);
	}
}

function updateLearning(decks, card) {
	if (card.learnBox.checked) {
		removeCardFromNewDeck(decks.new_deck, card);
		// add to learnDeck;
		decks.learn_deck.push(card);
		console.log(decks.learn_deck[decks.learn_deck.length-1].canvas.id);
	}
}

function insertNewCard(doc, new_card, next_btn) {
	doc.body.insertBefore(new_card.canvas, next_btn);
	doc.body.insertBefore(new_card.learnBox, next_btn);
}

function getNewCardWithButton(doc, decks, current_btn) {
	var index = getIndexOfCard(decks.new_deck, decks.current_card);
	var new_index = incrementIndexWithButton(index, current_btn);
	// displayButtonWithNewIndex(deck, new_index, btn);
	var new_card = getNewCardWithIndex(decks.new_deck, decks.current_card, new_index);

	return new_card;
}

function removeCard(doc, current_card) {
	doc.body.removeChild(current_card.canvas);
	doc.body.removeChild(current_card.learnBox);
}

function replaceWithNewCard(doc, decks, btn) {
	removeCard(doc,decks.current_card);
	var new_card = getNewCardWithButton(document, decks, btn.current);
	insertNewCard(doc, new_card, btn.next);

	updateLearning(decks, decks.current_card);

	return new_card;
}

function createButton(doc, id) {
	var btn = doc.createElement("BUTTON");
	btn.id = id;
	btn.innerHTML = id;

	btn.style.backgroundColor='#4CAF50';
    btn.style.border= 'none';
    btn.style.padding= '15px 32px';
    btn.style.textAlign= 'center';
    btn.style.textDecoration= 'none';
    btn.style.display= 'inline-block';
    btn.style.fontSize= '16px';
    btn.style.margin= '4px 2px';
    btn.style.cursor= 'pointer';

	return btn;
}

function createCheckBox(doc, id, check) {
	var input = doc.createElement("input");
	input.id = id;
	input.type = "checkbox";
	input.checked = check;

	return input;
}

function getParamFromURL(param) {
	var url_string = window.location.href;
	var url = new URL(url_string);
	var value = url.searchParams.get(param);
	return value;
}

// function displayButtonWithNewIndex(deck, new_index, btn) {
// 	if (new_index == 0 && btn.id == 'prev') {
// 	    btn.style.display= 'none';
// 	}
// 	else if (new_index == deck.length-1 && btn.id == 'next') {
// 	    btn.style.display= 'none';
// 	}
// }
