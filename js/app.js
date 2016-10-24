$(document).ready(function() {

	$("#start").on("click", start);
	$("#stop").on("click", stop);
	var isMoving = [];
	var randDuration = [];

	function start() {

		isMoving = [true, true, true];
		randDuration = [
			Math.round(((Math.random()) + 0.5) * 100),
			Math.round(((Math.random()) + 0.5) * 100),
			Math.round(((Math.random()) + 0.5) * 100)
		];
		console.log(randDuration);
		setInterval(roll, 0);

	}

	//Animate li items
	function roll() {
		var rollsStart = [$("#roll_1 li:first"), $("#roll_2 li:first"), $("#roll_3 li:first")];

		for (var i = 0; i < rollsStart.length; i++) {

			if (isMoving[i]) {

				rollsStart[i].animate({

					//Move first element outside the box
					marginTop: "-200px"

				}, randDuration[i], function() {

					//Move first element after last
					var last = $(this).siblings(":last");
					$(this).remove().css("margin-top", "0");
					last.after(this);

				});
			}
		}
	}

	function stop() {
		var timeout = 700;
		for (var i = 0; i < isMoving.length; i++) {

			doSetTimeout(i, 700);

		}

		setTimeout(function() {

			checkWin();

		}, timeout * 3)

		function doSetTimeout(i, timeout) {

			setTimeout(function() {

				isMoving[i] = false;

			}, timeout * (i+1));

		}

		function checkWin() {
			var rollsStart = [$("#roll_1 li:first-child div"), $("#roll_2 li:first-child div"), $("#roll_3 li:first-child div")];
			console.log(rollsStart);
		}
	}
});
