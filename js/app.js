$(document).ready(function() {

	var isMoving = [];
	var randDuration = [];
	var gold = 50;
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

		// randDuration = [400, 400, 400]

		//Loop rolling
		setInterval(roll, 0);

	}

	function roll() {

		//Grab visible (first) line of li items
		var rollsStart = [$("#roll_1 li:first"), $("#roll_2 li:first"), $("#roll_3 li:first")];

		for (var i = 0; i < rollsStart.length; i++) {
			var itemHeight = rollsStart[i].height();

			if (isMoving[i]) {

				rollsStart[i].animate({

					//Move first element outside the box
					// marginTop: "-" + 200
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

		var time = 1000;
		if (value > 0) {
			$(".scored").text("+" + value).css("color", "green");
			$(".scored").fadeIn(time);
			$(".scored").fadeOut(time);
		} else {
			$(".scored").text(value).css("color", "red");
			$(".scored").fadeIn(time);
			$(".scored").fadeOut(time);
		}

		gold += value;
		$(".gold").text(gold);
	}

	//Animate li items


	function stop() {
		var timeout = 800;
		disableButton("stop");

		for (var i = 0; i < isMoving.length; i++) {

			doSetTimeout(i, timeout);

		}

		setTimeout(function() {

			enableButton("start");
			checkWin();

		}, (timeout+50) * 3)

		function doSetTimeout(i, timeout) {

			setTimeout(function() {

				isMoving[i] = false;

			}, timeout * (i+1));
		}
	}

	function checkWin() {
		var winNumber = [
			$("#roll_1 li:first div").text(),
			$("#roll_2 li:first div").text(),
			$("#roll_3 li:first div").text()
		];
		if ((winNumber[0] === winNumber[1]) && (winNumber[0] === winNumber[2])) {

			score(10);
			$(".message").css("color", "green");
			$(".message").text("You won!");

		} else {

			$(".message").css("color", "red");
			$(".message").text("Try again!");

		}

	}
});
