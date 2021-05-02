'use strict';

const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();

// using + to convert string to number
let ticketPrice = +movieSelect.value;

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

// update total and count
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    // copy selected seats into arr
    // Map through array
    // return a new array indexes
    const seatsIndex = [...selectedSeats].map(function (seat) {
        return [...seats].indexOf(seat)
    });

    // key value pair: key is selected seats and value is JSON.stringify(seatsIndex)
    // The JSON.stringify() method converts a JavaScript object or value to a JSON string, it converted seatsIndex array to string
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    const selectedSeatsCount = selectedSeats.length;

    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
};

// Get data from local storage and populate UI
// json parse setting it back to array
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            // if something isnt there in array then it shows -1
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if(selectedMovieIndex !== null){
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}

// movie select event
movieSelect.addEventListener('change', function (e) {
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
});

// seat click event
container.addEventListener('click', function (e) {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {}
    e.target.classList.toggle('selected');

    updateSelectedCount();
});

// update selected count and total set
updateSelectedCount();