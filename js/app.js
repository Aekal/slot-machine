$(document).ready(function() {

	$("#start").on("click", start);
	$("#stop").on("click", stop);
	var isMoving = true;

	function start() {

		//Set loop
		isMoving = true;
		setInterval(roll, 0);
		// move();

	}

	//Animate li items
	function roll() {
		if (isMoving) {
			var rollsStart = [$("#roll_1 li:first"), $("#roll_2 li:first"), $("#roll_3 li:first")];

			for (var i = 0; i < rollsStart.length; i++) {
				rollsStart[i].animate({

					//Move first element outside the box
					marginTop: "-200px"

				}, 100, function() {

					//Move first element after last
					var last = $(this).siblings(":last");
					$(this).remove().css("margin-top", "0");
					last.after(this);

				});
			}
		}
	}

	function stop() {

		// Random 1-4 seconds
		var rand = Math.round((Math.random()*1 + 1) * 1000);
		console.log(rand);
		setTimeout(function() {

			isMoving = false;

		}, rand);

	}
});
