/*
 * Create a list that holds all of your cards
 */
var array = ['fa-feather','fa-feather','fa-crow','fa-crow','fa-fish','fa-fish','fa-pencil','fa-pencil','fa-power-off',
'fa-power-off', 'fa-save', 'fa-save','fa-user-secret','fa-user-secret','fa-paperclip','fa-paperclip'];
var matchArray = [];
var moveCounter = 0;
var card;
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

array = shuffle(array);

var deck = document.querySelector('.deck');
const newDeck = document.createElement('ul');



//const fragment = document.createDocumentFragment();

for (var cardy of array) {
  var newCard = document.createElement('li')
  newCard.addEventListener('click',respondToClick);
  newCard.className = 'card';
  const newIcon = createIcon(cardy);
  newCard.appendChild(newIcon);
  newDeck.appendChild(newCard);
};

//deck.replaceWith(newDeck);
deck.innerHTML=newDeck.innerHTML;

 function createIcon(){
   let newIcon = document.createElement('i');
   newIcon.classList.add('fa',cardy);
   return newIcon;
 };



// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};

/*
add an event listener that flips the card, compares it with the matchArray or
adds it to the matchArray if the array is empty.
*/
 function respondToClick(event) {
  card = event.target.closest('li');
  if(!card) return;
  if((card.classList.contains('match'))||(card.classList.contains('show'))) return;
  let currentClasses = card.classList;
  showCard();
  if(matchArray.length==0){
    matchArray.push(card);
  }else if(matchArray.contains(currentIcon)){
    setMatch();
  }

};

// shows the card  to the user
function showCard(){
  card.classList.add('open','show');
};

// sets cards as matches, clears array
function setMatch(){
  const match1 = matchArray.pop();
  match1.classList.remove('show','open');
  match1.classList.add('match');
  card.classList.remove('show','open');
  card.classList.add('match');
  moveCounter++;
};
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
