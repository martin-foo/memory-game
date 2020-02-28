var mydeck = document.querySelector('.container');
var changeDeck = document.body.querySelectorAll('.deck li');
var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var totalSeconds = 0;
var myVar = 0;
var cards = [];
var match = 0;
var x = 0;
var y = 3;
var k = 0;
var setCards = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-anchor", "fa-leaf", "fa-bicycle", "fa-diamond",
    "fa-bomb", "fa-leaf", "fa-bomb", "fa-bolt", "fa-bicycle", "fa-paper-plane-o", "fa-cube"
];
// var myP= document.querySelector("p");
// var addElement= document.createElement("p");
//      mydeck.appendChild(addElement);


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

function hideStar() {
    if (x % 10 == 0) {
        y = y - 1;
        document.getElementsByClassName("fa fa-star")[y].style.visibility = "hidden";
    }
};

function increaseNumber() {
    x = x + 1;
    document.getElementsByClassName("moves")[0].textContent = x;
}

function cardMatch(event) {
    let classChildResult = event.target.lastChild.className;
    let classParentResult = event.target.className;
    event.target.className = "card match";
    if (document.getElementsByClassName(classParentResult)[0].lastChild.className = classChildResult) {
        document.getElementsByClassName(classParentResult)[0].className = "card match";
    }
};


function cardNoMatch(event) {
    let classChildResult = event.target.lastChild.className;
    let classParentResult = event.target.className;

    setTimeout(function() {
        event.target.className = "card";
        if (document.getElementsByClassName(classParentResult)[0].className = "card open show") {
            document.getElementsByClassName(classParentResult)[0].className = "card";
        }
    }, 500)
};


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
};

function clearMoves() {
    x = 0;
    document.getElementsByClassName("moves")[0].textContent = 0;
    for (let z = 0; z <= 2; z++) {
        document.getElementsByClassName("fa fa-star")[z].style.visibility = "visible";
    }
}


function changeCards(event) {
    setCards = shuffle(setCards);
    clearMoves();
    for (let i = 0; i <= 15; i++) {
        changeDeck[i].className = "card";
        changeDeck[i].lastChild.className = "fa " + setCards[i];

    }
};

function stopTimer() {
    clearInterval(myVar);
    k = 0;
    totalSeconds = 0;
    valString = 0;
    secondsLabel.innerHTML = "00";
    minutesLabel.innerHTML = "00";
}

function myAlert() {
    if (confirm("You have won! \n You have made " + x + " moves \n Your success rate was " + y + " stars." + "\n It took you " + minutesLabel.textContent + ":" + secondsLabel.textContent)) {
        changeCards();
        stopTimer();
    } else {
        close();
        clearInterval(myVar);
    }
}

function setTimer() {
    totalSeconds += 1;
    secondsLabel.innerHTML = pad(totalSeconds % 60);
    minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}

function pad(val) {
    var valString = val + "";
    if (valString.length < 2) {
        return "0" + valString;
    } else {
        console.log(valString);
        return valString;
    }
}



function respondToTheClick(event) {
    if (event.target.className == "fa fa-repeat") {
        changeCards(event);
    } else if (event.target.className != "deck") {
        k += 1;
        if (k == 1) {
            myVar = setInterval(setTimer, 1000);
        };
        event.target.className = "card open show";
        cards.push(event.target.innerHTML);
        compareCards(event)
    }
};




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
