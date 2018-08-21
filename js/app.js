/*
 * Create a list that holds all of your cards
 */
let front = '<li class="card"><i class="fa ', back = '"></i></li>';
let cardsList = [
    front+'fa-diamond'+back,
    front+'fa-paper-plane-o'+back,
    front+'fa-anchor'+back,
    front+'fa-bolt'+back,
    front+'fa-cube'+back,
    front+'fa-anchor'+back,
    front+'fa-leaf'+back,
    front+'fa-bicycle'+back,
    front+'fa-diamond'+back,
    front+'fa-bomb'+back,
    front+'fa-leaf'+back,
    front+'fa-bomb'+back,
    front+'fa-bolt'+back,
    front+'fa-bicycle'+back,
    front+'fa-paper-plane-o'+back,
    front+'fa-cube'+back,
];
let openCardList = [], moves = document.getElementsByClassName('moves')[0], move = 0;

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

function displayCards(array) {
    let deck = document.querySelector('.deck'), cardsHTML;
    cardsHTML = shuffle(array).join('');
    deck.innerHTML = cardsHTML;
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

document.addEventListener('DOMContentLoaded', function() {
    displayCards(cardsList);
});

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
document.querySelector('.deck').addEventListener('click', clickCard);

function clickCard(event) {
    if(event.target.tagName==='UL' || event.target.tagName==='I' || event.target.classList.contains('open'))
        return;
    openCard(event.target);
}

function openCard(card) {
    card.classList.add('open');
    if(openCardList.length % 2 === 0)
        addOpenCardToList(card);
    else
        checkCardInList(card);
}

function addOpenCardToList(card) {
    openCardList.push(card);
}

function removeHideCard() {
    let hideCard = openCardList.pop();
    hideCard.classList.remove('open');
}

//TODO: close transition of second card

function checkCardInList(card) {
    let symbol1 = card.firstElementChild.classList[1];
    let symbol2 = openCardList[openCardList.length-1].firstElementChild.classList[1];
    move++;
    moves.textContent = ''+move+' '+((move === 1)?'Move':'Moves');
    // check = openCardList.some(function(item) {
    //     return item.firstElementChild.classList[1] === symbol;
    // });
    if(symbol1 === symbol2)
        addOpenCardToList(card);
    else {
        removeHideCard();
        card.classList.remove('open');
    }
}