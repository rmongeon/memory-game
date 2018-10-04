/*
 * Create a list that holds all of your cards
 */
var array = ['fa-umbrella', 'fa-umbrella', 'fa-leaf', 'fa-leaf', 'fa-fire', 'fa-fire', 'fa-pencil',
'fa-pencil', 'fa-power-off', 'fa-power-off', 'fa-save', 'fa-save', 'fa-user-secret', 'fa-user-secret',
'fa-paperclip', 'fa-paperclip'];
var starValues = [10,16];
var matchArray = [];
var moveCounter = 0;
var startCard;
var savedCard;
var deck = document.querySelector('.deck');
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
array = shuffle(array);
const newDeck = document.createElement('ul');
for (var arrayCard of array) {
	let newCard = document.createElement('li')
	newCard.className = 'card';
	const newIcon = createIcon(arrayCard);
	newCard.appendChild(newIcon);
	newDeck.appendChild(newCard);
};
deck.innerHTML = newDeck.innerHTML;
deck.addEventListener('click', respondToClick);
//add icon to card html
function createIcon() {
	let newIcon = document.createElement('i');
	newIcon.classList.add('fa', arrayCard);
	return newIcon;
}
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
	let currentIndex = array.length,
		temporaryValue, randomIndex;
	while (currentIndex !== 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}
	return array;
}
/*
add an event listener that flips the card, compares it's icon with the card's icon in the matchArray
 or adds it to the matchArray if the array is empty. Controls flip state of cards.
*/
function respondToClick(event) {
	if (startCard) {
		hideCards();
		startCard = null;
		savedCard = null;
	}
	startCard = event.target.closest('li');
	if (!startCard) return;
	if ((startCard.classList.contains('match')) || (startCard.classList.contains('show'))) {
		startCard = null;
		return;
	}
	let iconChild = startCard.firstChild;
	showCard();
	if (matchArray.length == 0) {
		matchArray.push(startCard);
		savedCard = startCard;
		startCard = null;
		return;
	} else {
		moveCounter++;
		updateCounter();
		let iconCompare = savedCard.firstChild;
		if (iconCompare.classList[1] == iconChild.classList[1]) {
			savedCard = matchArray.pop();
			setMatch();
		} else {
			savedCard = matchArray.pop();
		}
	}
}
// shows the card  to the user
function showCard() {
	startCard.classList.add('open', 'show');
};
//removes the show/open functions
function hideCards() {
	savedCard.classList.remove('show', 'open');
	startCard.classList.remove('show', 'open');
}
// sets cards as matches
function setMatch() {
	savedCard.classList.add('match');
	startCard.classList.add('match');
  if(wonGame()){
    alert("you won w o  w");
  }
}

function wonGame(){
 let gameCount = document.querySelectorAll('.match');
 return gameCount.length == 16;
}

function updateCounter() {
	let moves = document.querySelector('.moves');
  let stars = document.querySelector('.stars');
	moves.innerText = moveCounter;

  // compare the move # with the starValue amounts.
  if((moveCounter > starValues[1])&&(stars.childNodes.length > 4)){ //starvalue = 16
    //remove li & i elements
    stars.removeChild(stars.childNodes[0]);
    stars.removeChild(stars.childNodes[0]);
  }else if((moveCounter > starValues[0])&&(stars.childNodes.length>6)){ //starvalue = 10
    //remove li & i elements
    stars.removeChild(stars.childNodes[0]);
    stars.removeChild(stars.childNodes[0]);
  }
}
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
