function isRemindingDay(dateToday, dateIsLearned, remindingDayCount) {
	console.log("dateIsLearned: ", dateIsLearned, "remindingDayCount : ", remindingDayCount);
	var reminderDate = new Date();
	reminderDate.setDate(dateIsLearned.getDate() + remindingDayCount);
	reminderDate.setHours(0, 0, 0, 0);
	console.log("reminderDate: ", reminderDate);
	
	return (dateToday >= reminderDate) ? true : false;
}

function getReminderCardBtn_FromFilteredDeck_WithTodayDate(dateToday, filtered_deck) {
	var reminder_card_btns = [];
	for (var i in filtered_deck.cards) {
		var card_btn = filtered_deck.cards[i];
		var flash_card = flash_card_dict[card_btn.id];
		if ( isRemindingDay(dateToday, new Date(flash_card.card.dateIsLearned), flash_card.card.remindingDayCount) ) {
			reminder_card_btns.push(card_btn);
		}
	}

	return reminder_card_btns;
}

function updateRemindingDayCountWithCardBtn(isRemembered, card) {
	card.remindingDayCount *= (isRemembered) ? 2 : 1/2;
	card.remindingDayCount = Math.ceil(card.remindingDayCount);
}

// Thing To be deleted after testing
function newDateSimulator() {
	++date_increment;
	var dateToday = new Date();
	dateToday.setDate(dateToday.getDate() + date_increment);
	console.log("dateToday: ", dateToday);
	date_text.innerHTML = "Day: " + dateToday;
	document.body.appendChild(date_text);
	document.body.appendChild(br1);

	return dateToday;
}
// Thing To be deleted after testing
