$(document).ready(function() {
	var machine = {
		isMoving : [],
		randDuration : [],
		gold : 50,
		init : function() {
			this.cacheDom();
			this.bindEvents();
			this.setNumbers();
			this.disableButton(this.$stop, true);
			//Set start amount of gold
			this.$gold.text(this.gold);
		},
		cacheDom : function() {
			this.$start = $("#start");
			this.$stop = $("#stop");
			this.$gold = $(".gold");
			this.$message = $(".message");
			this.$scored = $(".scored");
			this.rolls = [$("#roll_1 div"), $("#roll_2 div"), $("#roll_3 div")];
		},
		bindEvents : function() {
			this.$start.on("click", this.start.bind(this));
			this.$stop.on("click", this.stop.bind(this));
		},
		setNumbers : function() {
			//Assign an index for each roll item
			//Required for checkWin
			for (j = 0; j < this.rolls.length; j++) {
				for (i = 0; i < this.rolls[j].length; i++) {
					this.rolls[j][i].index = i+1;
				}
			}
		},
		disableButton : function (button, isDisabled) {
			button.attr("disabled", isDisabled);
		},
		start : function() {
			if (this.gold > 0) {
				this.score(-1);
				this.disableButton(this.$start, true);
				this.disableButton(this.$stop, false);

				//Clear message box
				this.$message.text("");

				this.isMoving = [true, true, true];

				//Random rolling speed (30 - 90)
				this.randDuration = [
					Math.round(((Math.random()) * 60) + 30),
					Math.round(((Math.random()) * 60) + 30),
					Math.round(((Math.random()) * 60) + 30)
				];

				// Loop rolling
				setInterval(this.roll.bind(this), 0);
			}
		},
		roll : function() {
			//Grab visible line of fruits
			var $rollsStart = [
				$("#roll_1 li:first"),
				$("#roll_2 li:first"),
				$("#roll_3 li:first")
			];

			function moveElement() {
				//Move first element after last
				var $this = $(this);
				var $last = $this.siblings(":last");
				$this.remove().css("margin-top", "0");
				$last.after(this);
			}

			for (i = 0; i < $rollsStart.length; i++) {
				var itemHeight = $rollsStart[i].height();
				if (this.isMoving[i]) {
					$rollsStart[i].animate({
						//Move first element outside the box
						marginTop: "-" + itemHeight
					}, this.randDuration[i], moveElement);
				}
			}
		},
		score : function(value) {
			var displayTime = 800;

			//Change gold animation
			if (value > 0) {
				this.$scored.text("+" + value).css("color", "green");
				this.$scored.fadeIn(displayTime - 200);
				this.$scored.fadeOut(displayTime + 200);
			} else {
				this.$scored.text(value).css("color", "red");
				this.$scored.fadeIn(displayTime - 200);
				this.$scored.fadeOut(displayTime + 200);
			}

			//Change gold amount
			this.gold += value;
			this.$gold.text(this.gold);
		},
		stop : function() {
			var timeout = 600;
			this.disableButton(this.$stop, true);

			for (var i = 0; i < this.isMoving.length; i++) {
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
				machine.disableButton(machine.$start, false);
				machine.checkWin();
			}, (timeout+50) * 3);
		},
		checkWin : function() {
			var $winNumber = [
				$("#roll_1 li:first div")[0].index,
				$("#roll_2 li:first div")[0].index,
				$("#roll_3 li:first div")[0].index
			];

			//Compare index of fruits and display messages
			if (($winNumber[0] === $winNumber[1]) && ($winNumber[0] === $winNumber[2])) {
				this.score(5);
				this.$message.css("color", "green");
				this.$message.text("You won!");
			} else {
				this.$message.css("color", "red");
				this.$message.text("Try again!");
			}
		}
	};
	machine.init();
});
