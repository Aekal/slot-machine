$(document).ready(function() {

	var isMoving = [];
	var randDuration = [];
	var gold = 50;

	setNumbers();
	setMachine();

	function setMachine() {

		//Event listeners for start and stop button
		$("#start").on("click", start);
		$("#stop").on("click", stop);

		//Set start amount of gold
		$(".gold").text(gold);

		disableButton("stop");

	}

	function start() {

		//Stop if out of money
		if (securityCheck()) {

			score(-1);
			disableButton("start");
			enableButton("stop");
			$(".message").text("");
			isMoving = [true, true, true];

			//Random rolling speed (30 - 90)
			randDuration = [
				Math.round(((Math.random()) * 60) + 30),
				Math.round(((Math.random()) * 60) + 30),
				Math.round(((Math.random()) * 60) + 30)
			];

			//Loop rolling
			setInterval(roll, 0);
		}
	}

	function setNumbers() {

		var roll1 = $("#roll_1 div");
		var roll2 = $("#roll_2 div");
		var roll3 = $("#roll_3 div");

		for (var i = 0; i < roll1.length; i++) {
			roll1[i].index = i+1;
		}

		for (i = 0; i < roll2.length; i++) {
			roll2[i].index = i+1;
		}

		for (i = 0; i < roll3.length; i++) {
			roll3[i].index = i+1;
		}
	}

	function securityCheck() {

		if ( checkGold() ) {
			return true;
		}

		//Start of money amount > 0
		function checkGold() {
			var goldAmount = parseInt($(".gold").text());
			if (goldAmount > 0) {
				return true;
			} else {
				return false;
			}
		}
	}

	function roll() {

		//Grab visible (first) line of li items
		var rollsStart = [$("#roll_1 li:first"), $("#roll_2 li:first"), $("#roll_3 li:first")];

		for (var i = 0; i < rollsStart.length; i++) {
			var itemHeight = rollsStart[i].height();

			if (isMoving[i]) {

				rollsStart[i].animate({

					//Move first element outside the box
					marginTop: "-" + itemHeight

				}, randDuration[i], function() {

					//Move first element after last
					var last = $(this).siblings(":last");
					$(this).remove().css("margin-top", "0");
					last.after(this);

				});
			}
		}
	}

	function disableButton(type) {
		if (type == "start") {
			$("#start").attr("disabled", true);
		} else if (type == "stop"){
			$("#stop").attr("disabled", true);
		}
	}

	function enableButton(type) {
		if (type == "start") {
			$("#start").attr("disabled", false);
		} else if (type == "stop"){
			$("#stop").attr("disabled", false);
		}
	}

	function score(value) {

		var displayTime = 800;

		//Display win/lose text
		if (value > 0) {
			$(".scored").text("+" + value).css("color", "green");
			$(".scored").fadeIn(displayTime - 200);
			$(".scored").fadeOut(displayTime + 200);
		} else {
			$(".scored").text(value).css("color", "red");
			$(".scored").fadeIn(displayTime - 200);
			$(".scored").fadeOut(displayTime + 200);
		}

		//Change gold amount
		gold += value;
		$(".gold").text(gold);
	}

	function stop() {
		var timeout = 600;
		disableButton("stop");

		for (var i = 0; i < isMoving.length; i++) {

			doSetTimeout(i, timeout);

		}

		//Set timeout for every roll separate
		function doSetTimeout(i, timeout) {

			setTimeout(function() {

				isMoving[i] = false;

			}, timeout * (i+1));
		}

		//Display message after stop rolling + change score
		setTimeout(function() {

			enableButton("start");
			checkWin();

		}, (timeout+50) * 3);
	}

	function checkWin() {

		var winNumber = [
			$("#roll_1 li:first div")[0].index,
			$("#roll_2 li:first div")[0].index,
			$("#roll_3 li:first div")[0].index
		];

		if ((winNumber[0] === winNumber[1]) && (winNumber[0] === winNumber[2])) {

			score(5);
			$(".message").css("color", "green");
			$(".message").text("You won!");

		} else {

			$(".message").css("color", "red");
			$(".message").text("Try again!");

		}
	}
});
