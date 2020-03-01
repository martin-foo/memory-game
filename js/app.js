const mydeck = document.querySelector('.container');
const changeDeck = document.body.querySelectorAll('.deck li');
const minutesLabel = document.getElementById("minutes");
const secondsLabel = document.getElementById("seconds");
var totalSeconds = 0;
var myVar = 0;
var cards = [];
var match = 0;
var x = 0;
var y = 3;
var k = 0;
var setCards = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-anchor", "fa-leaf", "fa-bicycle", "fa-diamond",
    "fa-bomb", "fa-leaf", "fa-bomb", "fa-bolt", "fa-bicycle", "fa-paper-plane-o", "fa-cube"];

// sets moves to 0
document.getElementsByClassName("moves")[0].textContent = 0;

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
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

//function that hide stars via modulo every 10 steps
function hideStar() {
    if (x % 10 == 0) {
        y = y - 1;
        if (y > 0){
           document.getElementsByClassName("fa fa-star")[y].style.visibility = "hidden";
        }
        else{
          y=1;
          document.getElementsByClassName("fa fa-star")[y].style.visibility = "hidden";
        }
    }
}

//function that increase number of moves
function increaseNumber() {
    x = x + 1;
    document.getElementsByClassName("moves")[0].textContent = x;
}

//functino that change classname of second clicked card to "card" match and then seatch html to find class "card open show" and rename it to "card match"
function cardMatch(event) {
    let classChildResult = event.target.lastChild.className;
    let classParentResult = event.target.className;
    event.target.className = "card match";
    if (document.getElementsByClassName(classParentResult)[0].lastChild.className = classChildResult) {
        document.getElementsByClassName(classParentResult)[0].className = "card match";
    }
}

//function that change classname of second clicked card to "card and then search html to find class "card open show" and rename it to "card""
function cardNoMatch(event) {
    let classChildResult = event.target.lastChild.className;
    let classParentResult = event.target.className;
    setTimeout(function() {
        event.target.className = "card";
        event.target.style.pointerEvents ="auto";
        if (document.getElementsByClassName(classParentResult)[0].className = "card open show") {
            document.getElementsByClassName(classParentResult)[0].style.pointerEvents ="auto";
            document.getElementsByClassName(classParentResult)[0].className = "card";
        }
    }, 500)
}

// function that compares 0 and 1 item of "cards" list if they are same it will increase moves and check modulus of moves to decrease star .If they are not same card will change to black
function compareCards(event) {
    let cardsResult = "";

    if (cards.length > 1 && cards.length < 3) {
        cardsResult = cards[0] == cards[1];
        increaseNumber();
        hideStar();
        cards = [];
        if (cardsResult == true) {
            match += 1;
            cardMatch(event);
            if (match == 8) {
                myAlert();
            }
        } else {
            cardNoMatch(event);
        }
    }
}

//function that set 0 to x viaroable which shows 0 to "moves" and shows all 3 stars
function clearMoves() {
    x = 0;
    document.getElementsByClassName("moves")[0].textContent = 0;
    for (let z = 0; z <= 2; z++) {
        document.getElementsByClassName("fa fa-star")[z].style.visibility = "visible";
    }
}

//function that shuffles card from the list and change classnames with shuffled classes
function changeCards(event) {
    setCards = shuffle(setCards);
    clearMoves();
    for (let i = 0; i <= 15; i++) {
        changeDeck[i].className = "card";
        changeDeck[i].style.pointerEvents ="auto";
        changeDeck[i].lastChild.className = "fa " + setCards[i];
    }
}

//function which stop Timer and clear it to 00:00
function stopTimer() {
    clearInterval(myVar);
    k = 0;
    cards=[];
    match=0;
    totalSeconds = 0;
    valString = 0;
    secondsLabel.innerHTML = "00";
    minutesLabel.innerHTML = "00";
}

// Alert window when user won
function myAlert() {
    if (confirm("You have won with " + x + " moves \n Your success rate was " + y + " stars." + "\n It took you " + minutesLabel.textContent + ":" + secondsLabel.textContent + "\n Press OK if you want to play again")) {
        changeCards();
        stopTimer();
    } else {
        close();
        clearInterval(myVar);
    }
}
//functino to set timer for seconds and minutes calling pad function to add 0 if the number is up to 9 or whole number
function setTimer() {
    totalSeconds += 1;
    secondsLabel.innerHTML = zero(totalSeconds % 60);
    minutesLabel.innerHTML = zero(Math.floor(totalSeconds / 60));
}

function zero(value) {
    var valString = value + "";
    if (valString.length < 2) {
        return "0" + valString;
    } else {
        return valString;
    }
}


// function that check if repeat icon was clicked , if so, it will change cards. It also check first click and start timer. And it chances classname of first clicked card to "card open show" to show interval
// Then it puts innerHTML of clicked card into "card" list and start compareCard function.
function respondToTheClick(event) {
    if (event.target.className == "fa fa-repeat") {
        changeCards(event);
        stopTimer();
    } else if (event.target.className == "card") {
        k += 1;
        if (k == 1) {
            myVar = setInterval(setTimer, 1000);
        };
        event.target.className = "card open show";
        event.target.style.pointerEvents ="none";
        cards.push(event.target.innerHTML);
        compareCards(event)
    }
}



// eventlistener applied to .container class
mydeck.addEventListener('click', respondToTheClick);




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
