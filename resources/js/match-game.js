var MatchGame = {};

/*
  Sets up a new game after HTML document has loaded.
  Renders a 4x4 board of cards.
*/

$(document).ready(function(){
	var $game = $('#game');
	var values = MatchGame.generateCardValues();
	MatchGame.renderCards(values, $game);
})
function generateCardValues(){

}
/*
  Generates and returns an array of matching card values.
 */

MatchGame.generateCardValues = function () {
	var sequentialValues = [];

	for (var value = 1; value <= 8; value++) {
		sequentialValues.push(value);
		sequentialValues.push(value);
	}

	var cardValues = [];

	while (sequentialValues.length > 0) {
		var randomIndex = Math.floor(Math.random() * sequentialValues.length);
		var randomValue = sequentialValues.splice(randomIndex, 1)[0];
		cardValues.push(randomValue);
	}

	return cardValues;
};

/*
  Converts card values to jQuery card objects and adds them to the supplied game
  object.
*/

MatchGame.renderCards = function(cardValues, $game) {
	var colors = [
	'url("https://www.magazinesdirect.com/images/covers/large-POM.jpg")',
	'url("https://www.magazinesdirect.com/images/covers/large-CRK.jpg")',
	'url("https://www.magazinesdirect.com/images/covers/large-PRG.jpg")',
	'url("https://www.magazinesdirect.com/images/covers/large-TOF.jpg")',
	'url("https://www.magazinesdirect.com/images/covers/large-EDG.jpg")',
	'url("https://www.magazinesdirect.com/images/covers/large-RET.jpg")',
	'url("https://www.magazinesdirect.com/images/covers/large-PCG.jpg")',
	'url("https://www.magazinesdirect.com/images/covers/large-TTT.jpg")'
	]
	
	$game.empty();
	$game.data('flippedCards', []);

	for (var valueIndex = 0; valueIndex < cardValues.length; valueIndex++){
		var $cardElement = $('<div class="col-xs-3 card"></div>');
		var value = cardValues[valueIndex];
		var color = colors[value-1];
		var data = {
			value: value, 
			isFlipped: false,
			color: color
		};
		$cardElement.data(data);

		$game.append($cardElement)
	}

	$('.card').click(function() {
		MatchGame.flipCard($(this), $('#game'));
	})
};

/*
  Flips over a given card and checks to see if two cards are flipped over.
  Updates styles on flipped cards depending whether they are a match or not.
 */
var winnerCounter = 0;	

MatchGame.flipCard = function($card, $game) {
	


	$card.css('background-image', $card.data('color')).text($card.data('value')).data('isFlipped', true);

	var flippedCards = $game.data('flippedCards');
	flippedCards.push($card);

	if (flippedCards.length === 2) {
		if (flippedCards[0].data('value') === flippedCards[1].data('value')) {
			var matchCss = {
				// backgroundColor: 'rgb(153, 153, 153)',
				// color: 'rgb(204, 204, 204)',
				}
			flippedCards[0].css(matchCss);
			flippedCards[1].css(matchCss);
			winnerCounter++;
		} else{
			var card1 = flippedCards[0];
			var card2 = flippedCards[1];
			window.setTimeout(function(){
				card1.css('background-image', '').text('').data('isFlipped', false);
			card2.css('background-image', '').text('').data('isFlipped', false);
		}, 1000)
			
		};	
		

		if (winnerCounter === 8){
		console.log('success!'),
		document.getElementById('secret').style.display = 'block'
		};
		

	$game.data('flippedCards', []);
	};
}



