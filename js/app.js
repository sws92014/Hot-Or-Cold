$(document).ready(pageLoad);

function pageLoad(){
	

	//variables
	var secretNumber, 
	userGuess, 
	pastGuesses = [], 
	count,
	guessHtml,
	userFeedback,
	alreadyGuessed,
	newgameBtn,
	form ,
	input,
	feedback,
	countElement,
	guessList;


	/*--- Show information modal box ---*/
  	$(".what").click(function(){
    	$(".overlay").fadeIn(1000);
  	});

  	/*--- Hide information modal box ---*/
  	$("a.close").click(function(){
  		$(".overlay").fadeOut(1000);
  	});


  	//dom objects
  	newgameBtn = $('a.new');
  	form = $('form');
  	input = form.find('#userGuess');
  	feedback = $('#feedback');
  	countElement = $('#count');
  	guessList = $('#guessList');

    //reload page
    newGame();
    //event functions
    form.submit(function(event){
      event.preventDefault();
      getUserGuess();
    });
    newgameBtn.click(newGame);


	//new game function
	function newGame(){
		form.find('input[type=submit]').css('opacity','1');
		resetVariables();
		display();
		generateNumber();
	}

	//get the user guess
	function getUserGuess(){
	//get the user guess
	userGuess = input.val();
	//reset input value
	input.val('');
	//focus on input for next guess
	input.focus();
	//ensure valid input
	if(isValidInput()){return ;}
	//generate feedback
	generateFeedback();
	//track the users past guesses
	displayPastGuesses();
	//keep a "count" of the guesses made
	guessCount();
	//display changes to the page
	display();
	}

  	//check for valid input
  	function isValidInput(){
  		if(userGuess % 1 !== 0){
  			alert('please input a number');
  			return true;
  		}
  		if(userGuess < 0 || userGuess > 101){
  			alert('please choose a number between zero and 100');
  			return true;
  		}
  		if(pastGuesses.length > 0){
			console.log(pastGuesses)
			$.each(pastGuesses,function(guess,value){
				if(userGuess == value){
					alreadyGuessed = true;
				}
			}); 
		}
		if(alreadyGuessed){
			alreadyGuessed = false;
			alert('You guessed this number already');
			return true;
		}
    return false;
	}

	//generate user feedback
	function generateFeedback(){
		if(secretNumber == userGuess){
			winner();
		} else if(Math.abs(secretNumber - userGuess) < 10){
			userFeedback = 'Hot';
		} else if(Math.abs(secretNumber - userGuess) < 20 && Math.abs(secretNumber - userGuess) > 9){
			userFeedback = 'Getting Warmer';
		} else if(Math.abs(secretNumber - userGuess) < 30 && Math.abs(secretNumber - userGuess) > 19){
			userFeedback = 'Less Warm';
		} else {
			userFeedback = 'Cold';
		}
	}

		//keep track of users past guesses
		function displayPastGuesses(){
		pastGuesses.push(userGuess);
		guessHtml = '';
		if(pastGuesses[0].length) {
			$.each(pastGuesses,function(guess,value){
				guessHtml += '<li>' + value + '</li>';
			});
		}
	}

	//keep track of guess count
	function guessCount(){
		count++;
	}

	// display page functions
	function display(){
		guessList.html(guessHtml);
		countElement.html(count);
		feedback.html(userFeedback);
	}

	function winner(){
		userFeedback = 'You Won! Click New Game To Reset';
		form.find('input[type=submit]').css('opacity','0');
		$('h2').css('background', '#839d57');
	}
  	
	//generate secret number
	function generateNumber(){
		secretNumber = Math.floor(Math.random()*100)+1;
		console.log("generated secret Number = "+ secretNumber);
	}

	//reset page 
	function resetVariables(){
		count = 0;
		pastGuesses = [];
		guessHtml = '';
		userGuess = '';
		userFeedback = 'Make your Guess!';
	}
}


