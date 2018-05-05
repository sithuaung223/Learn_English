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

function reminderJS_main(filtered_deck) {
	// date simulation for testing purpose
	console.log("In Reminder Function");
	var dateToday = NOW + date_increment;
	console.log("dateToday: ", dateToday);


	var reminder_card_btns = getReminderCardBtn_FromFilteredDeck_WithTodayDate(dateToday, filtered_deck);
	console.log(reminder_card_btns);

	// var isRemembered_btn = createButton(document, 'isRemembered');
	// var notRemembered_btn = createButton(document, 'notRemembered');

	// // flash_card.card.dateIsLearned = dateToday;
	// var card_btn = reminder_card_btns[0];

	// // var isRemembered = true; // Testing click remember
	// // flash_card.card.remindingDayCount *= (isRemembered) ? 2 : 1/2;
	//	// console.log("Reminding : ", flash_card.card.front_side);

	// document.body.appendChild(card_btn);
	// document.body.appendChild(isRemembered_btn);
	// document.body.appendChild(notRemembered_btn);
	++date_increment;
}
