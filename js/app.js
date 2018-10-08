/*
 * Create a list that holds all of your cards
 */
let cardArray = ['fa-umbrella', 'fa-umbrella',
'fa-leaf', 'fa-leaf',
'fa-fire', 'fa-fire',
'fa-pencil', 'fa-pencil',
'fa-power-off', 'fa-power-off',
'fa-save', 'fa-save',
'fa-user-secret', 'fa-user-secret',
'fa-paperclip', 'fa-paperclip'];
const STARVALUES = [
	10, //2 star criteria
	16, //1 star criteria
];
let matchArray = [];
let moveCounter = 0;
let startCard;
let savedCard;
const deck = document.querySelector('.deck');
const reset = document.querySelector('.restart');
let savedTimer;

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

cardArray = shuffle(cardArray);
updateCounter(); //clear counter to zero
const newDeck = document.createElement('ul');

cardArray.forEach(function(arrayCard) {
	let newCard = document.createElement('li')
	newCard.className = 'card';
	const newIcon = createIcon(arrayCard);
	newCard.appendChild(newIcon);
	newDeck.appendChild(newCard);
});

deck.innerHTML = newDeck.innerHTML;
deck.addEventListener('click',startTimer);
deck.addEventListener('click', respondToClick);
reset.addEventListener('click', resetGame);
setInitialTimerValue();

function setInitialTimerValue(){
	const timerDiv = document.querySelector('.timer');
	timerDiv.innerHTML = '0'+' seconds';
}

//add icon to card html
function createIcon(arrayCard) {
	const newIcon = document.createElement('i');
	newIcon.classList.add('fa', arrayCard);
	return newIcon;
}
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(cardArray) {
	let currentIndex = cardArray.length,
		temporaryValue, randomIndex;
	while (currentIndex !== 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = cardArray[currentIndex];
		cardArray[currentIndex] = cardArray[randomIndex];
		cardArray[randomIndex] = temporaryValue;
	}
	return cardArray;
}

/* startTimer begins an interval to keep
 * track of the time spent on the memory game
*/
function startTimer(){
	let timerDiv = document.querySelector('.timer');
	let start = Date.now();
	savedTimer = setInterval(function() {  //store savedTimer to clear interval later
    timerValue = Date.now() - start; // milliseconds elapsed since start

    timerDiv.innerText = (Math.floor(timerValue / 1000)) +' seconds'; // in seconds
    // alternatively just show wall clock time:
    //console.log(new Date().toUTCString());
	}, 1000);
	deck.removeEventListener('click',startTimer);
}

/*
 * add an event listener that flips the card,
 * compares its icon with the card's icon in the matchArray
 * or adds it to the matchArray if the array is empty.
 * if startCard has a value at the beginning of this function
 * two cards are in the "show" mode and need to be hidden
*/
function respondToClick() {
	if (startCard) {
		hideCards(startCard,savedCard);
		startCard = null;
		savedCard = null;
	}

	startCard = event.target.closest('li');
	if (!startCard) return;
	if ((startCard.classList.contains('match')) ||
	(startCard.classList.contains('show'))) {
		startCard = null;
		return;
	}
	const iconChild = startCard.firstChild;
	showCard(startCard);
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
			setMatch(startCard,savedCard);
		} else {
			savedCard = matchArray.pop();
		}
	}
}

function resetGame() {
  starContainer = document.querySelector('.stars');
  moveCounter=0;
  updateCounter();
	resetCards();
  resetStars(starContainer);
	clearInterval(savedTimer);
	setInitialTimerValue();
	deck.addEventListener('click', startTimer);
}

function resetCards(){
	let cardParent = document.querySelectorAll('.card');
	cardParent.forEach(function(card){
		card.classList.remove('match');
		card.classList.remove('show');
		card.classList.remove('open');
	});
}

function resetStars(starContainer){
  while (starContainer.childNodes.length < 3){
    let listElement = document.createElement('li');
    let starElement = document.createElement('i');
    starElement.classList.add('fa','fa-star');
    listElement.appendChild(starElement);
    starContainer.appendChild(listElement);
  }
}

// shows the card to the user by setting the "show" classes
function showCard(startCard) {
	startCard.classList.add('open', 'show');
}

//removes the show/open functions
function hideCards(startCard,savedCard) {
	if(savedCard&&startCard) {
	savedCard.classList.remove('show', 'open');
	startCard.classList.remove('show', 'open');
	} else if(savedCard) {
	savedCard.classList.remove('show', 'open');
}
}
// sets cards as matches
function setMatch(startCard,savedCard) {
	savedCard.classList.add('match');
	startCard.classList.add('match');
  if(wonGame()){
			youWonTheGame();
  }
}

function youWonTheGame(){
	clearInterval(savedTimer);
	const starParent = document.querySelector('.stars');
	const timerDiv = document.querySelector('.timer');
	const starNum = starParent.childNodes.length;
	alert(`you won with ${timerDiv.innerText}, ${moveCounter} moves ` +
		`and ${starNum} stars w o  w`);
	deck.addEventListener('click', respondToClick);
}

//check if all cards have been matched
function wonGame(){
 let gameCount = document.querySelectorAll('.match');
 return gameCount.length == 16;
}

//increment the counter and verify the star values
function updateCounter() {
	 const moves = document.querySelector('.moves');
	 moves.innerText = moveCounter;
	 checkStars();
}

// check the star value compared to the STARVALUES array
// and remove a star if move criteria is met.
function checkStars(){
	let starParent = document.querySelector('.stars');
	starParent.childNodes.forEach(function(kid) {
		if (kid.nodeType == 3) { //remove node if the node is a text type
			starParent.removeChild(kid);
		}
	});

	kids = starParent.childNodes;

 // compare the move # with the starValue amounts.
 if((moveCounter > STARVALUES[1])&&(kids.length==2)){ //starvalue for 1 star
	 //remove li & i elements
	 starParent.removeChild(starParent.firstChild);
 }else if((moveCounter > STARVALUES[0])&&(kids.length==3)){ //starvalue for 2 stars
	 //remove li & i elements
	 starParent.removeChild(starParent.firstChild);
 }
}
