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

function createDeckWithDictionary(doc, dict) {
	var deck = [];
	var i = 0;
	for (var w in dict) {
		var card = {
			id: i,
			word: [w, dict[w]],
			flip: 0
		};
		var canvas = createCanvasWithCard(doc, card);
		deck.push(canvas);
		++i;
	}
	return deck;
}

function removeCard(doc, current_card) {
	doc.body.removeChild(current_card);
}

function getNewCardWithIndex(deck, current_card, new_index) {
	if (new_index >= 0 && new_index < deck.length) {
		current_card = deck[new_index];
	}
	return current_card;
}

// function displayButtonWithNewIndex(deck, new_index, btn) {
// 	if (new_index == 0 && btn.id == 'prev') {
// 	    btn.style.display= 'none';
// 	}
// 	else if (new_index == deck.length-1 && btn.id == 'next') {
// 	    btn.style.display= 'none';
// 	}
// }

function incrementIndexWithButton(index, btn) {
	if (btn.id == 'next') {
		return (index+1);
	}
	else if (btn.id == 'prev') {
		return (index-1);
	}
}

function getIndexOfCard(deck, current_card) {
	return index = deck.indexOf(current_card);
}

function getNewCardWithButton(doc, current_card, deck, btn) {
	var index = getIndexOfCard(deck, current_card);
	var new_index = incrementIndexWithButton(index, btn);
	// displayButtonWithNewIndex(deck, new_index, btn);
	var new_card = getNewCardWithIndex(deck, current_card, new_index);

	return new_card;
}

function insertNewCard(doc, new_card, next_btn) {
	doc.body.insertBefore(new_card, next_btn);
}


function replaceWithNewCard(doc, current_card, deck, btn, next_btn) {
	removeCard(doc,current_card);
	var new_card = getNewCardWithButton(document, current_card, deck, btn);
	insertNewCard(doc, new_card, next_btn);

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

function getParamFromURL(param) {
	var url_string = window.location.href;
	var url = new URL(url_string);
	var value = url.searchParams.get(param);
	return value;
}
