function isRemindingDay(dateToday, dateIsLearned, remindingDayCount) {
	console.log("dateIsLearned: ", dateIsLearned, "remindingDayCount : ", remindingDayCount);
	return (dateToday >= (dateIsLearned+remindingDayCount)) ? true : false;
}

function reminderJS_main(filtered_deck) {

	console.log("In Reminder Function");
	var dateToday = NOW + date_increment;
	console.log("dateToday: ", dateToday);

	for (var i in filtered_deck.cards) {
		var card_btn = filtered_deck.cards[i]
		var flash_card = flash_card_dict[card_btn.id];
		if ( isRemindingDay(dateToday, flash_card.card.dateIsLearned, flash_card.card.remindingDayCount) ) {
			flash_card.card.dateIsLearned = dateToday;

			document.body.appendChild(card_btn);
			var isRemembered_btn = createButton(document, 'isRemembered');
			var notRemembered_btn = createButton(document, 'notRemembered');
			document.body.appendChild(isRemembered_btn);
			document.body.appendChild(notRemembered_btn);

			var isRemembered = true; // Testing click remember
			flash_card.card.remindingDayCount *= (isRemembered) ? 2 : 1/2;
			console.log("Reminding : ", flash_card.card.front_side);
		}
	}
	++date_increment;
}
