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

function getNextCard(deck, current_card) {
	var index = deck.indexOf(current_card);
	index = index + 1;
	if (index < deck.length) {
		next_card = deck[index];
	}
	return next_card;
}

function insertNextCard(doc, next_card, next_btn) {
		doc.body.insertBefore(next_card, next_btn);
}

function nextBtnOnClick(doc, current_card, deck, next_btn) {
	removeCard(doc,current_card);
	var next_card = getNextCard(deck, current_card);
	insertNextCard(doc, next_card, next_btn);
	return next_card;
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
