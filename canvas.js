function createCardBtnWithFlashCard(id, flash_card) {
	var btn = document.createElement("BUTTON");
	btn.id = id;
	var word = flash_card.card.front_side;
	btn.innerHTML = word;
    btn.style.padding= '30px 64px';
    btn.style.margin= '10px 4px';

	btn.onclick = function(){
		flash_card.isFrontSide = !flash_card.isFrontSide;
		btn.innerHTML = (flash_card.isFrontSide)
			? flash_card.card.front_side
			: flash_card.card.flipped_side;
    };

  return btn;
}

function createCategoryBoxWithText(id, category) {
	var btn = document.createElement("BUTTON");
	btn.id = id;
	btn.innerHTML = category;
    btn.style.padding= '30px 64px';
    btn.style.margin= '10px 4px';
	btn.onclick = function(){
	    window.location = './deck.html?category='+category;
    };

  return btn;
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

function createCheckBoxWithLabel(id, label_text) {
	var input = document.createElement("input");
	input.label = "learned";
	input.id = id;
	input.type = "checkbox";
	input.checked = false;

	return input;
}

function createLabelForCheckBox(label_text) {
	var label = document.createElement("label");
	var text = document.createTextNode(label_text);
	label.appendChild(text);

	return label;
}

