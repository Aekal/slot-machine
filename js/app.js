$(document).ready(function() {

	//Slot machine object
	var machine = {

		isMoving : [],
		randDuration : [],
		gold : 50,

		setMachine : function() {
			//Set numbers to DOM li elements
			this.setNumbers();

			//Set start amount of gold
			$(".gold").text(this.gold);

			this.disableButton("stop");

			//Event listeners for start and stop button
			$("#start").on("click", this.start);
			$("#stop").on("click", this.stop);
		},

		setNumbers : function() {
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
		},

		start : function() {

			//Stop if out of money
			if (machine.securityCheck()) {

				machine.score(-1);
				machine.disableButton("start");
				machine.enableButton("stop");

				//Clear message box
				$(".message").text("");

				machine.isMoving = [true, true, true];

				//Random rolling speed (30 - 90)
				machine.randDuration = [
					Math.round(((Math.random()) * 60) + 30),
					Math.round(((Math.random()) * 60) + 30),
					Math.round(((Math.random()) * 60) + 30)
				];

				// Loop rolling
				setInterval(machine.roll, 0);
			}

		},

		securityCheck : function() {

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

		},

		roll : function() {
			//Grab visible line of fruits
			var rollsStart = [$("#roll_1 li:first"), $("#roll_2 li:first"), $("#roll_3 li:first")];

			for (var i = 0; i < rollsStart.length; i++) {
				var itemHeight = rollsStart[i].height();

				if (machine.isMoving[i]) {

					rollsStart[i].animate({

						//Move first element outside the box
						marginTop: "-" + itemHeight

					}, machine.randDuration[i], function() {

						//Move first element after last
						var last = $(this).siblings(":last");
						$(this).remove().css("margin-top", "0");
						last.after(this);
					});
				}
			}
		},

		disableButton : function(type) {
			if (type == "start") {
				$("#start").attr("disabled", true);
			} else if (type == "stop"){
				$("#stop").attr("disabled", true);
			}
		},

		enableButton : function(type) {
			if (type == "start") {
				$("#start").attr("disabled", false);
			} else if (type == "stop"){
				$("#stop").attr("disabled", false);
			}
		},

		score : function(value) {
			var displayTime = 800;

			//Change gold animation
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
			machine.gold += value;
			$(".gold").text(machine.gold);
		},

		stop : function() {
			var timeout = 600;
			machine.disableButton("stop");

			for (var i = 0; i < machine.isMoving.length; i++) {

				doSetTimeout(i, timeout);

			}

			//Set timeout for every roll separate
			function doSetTimeout(i, timeout) {

				setTimeout(function() {

					machine.isMoving[i] = false;

				}, timeout * (i+1));
			}

			//Display message after stop rolling + change score
			setTimeout(function() {

				machine.enableButton("start");
				machine.checkWin();

			}, (timeout+50) * 3);
		},

		checkWin : function() {
			var winNumber = [
				$("#roll_1 li:first div")[0].index,
				$("#roll_2 li:first div")[0].index,
				$("#roll_3 li:first div")[0].index
			];

			//Compare index of fruits and display messages
			if ((winNumber[0] === winNumber[1]) && (winNumber[0] === winNumber[2])) {

				machine.score(5);
				$(".message").css("color", "green");
				$(".message").text("You won!");

			} else {

				$(".message").css("color", "red");
				$(".message").text("Try again!");

			}
		}

	}

	machine.setMachine();

});
