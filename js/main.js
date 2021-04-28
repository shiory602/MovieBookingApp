/**
 * @typedef {{ name: string }} Item
 */
const DATA_KEY = 'your-movie-seats';
const seatCount = document.querySelector('#seatCount');
const totalPrice = document.querySelector('#price');
const time = document.querySelector('#time');
const seatsList = document.querySelector('.seats');
/** @type {HTMLElement[]} */
let seats;
const movies = document.querySelector('#movies');
let seatSum = 0;
let price = 0;
let startTime = '--:--';
let selectedSeats = [];
let soldSeats = ['A6', 'A7', 'B6', 'B7'];

main();

function main() {

    selectedSeats = load();
    render(selectedSeats);



    movies.addEventListener('change', e => {
        changePrices();
        changeTime();
    })
}

function clickEvent(e) {
    /** @type {HTMLElement} */
    const el = e.currentTarget;
    const text = el.textContent;

    if (soldSeats.some(v => v === text)) {
        alert('This seat is already sold.');
    } else if (selectedSeats.some(v => v === text)) {
        decrement(selectedSeats, text);
        save(selectedSeats);
        render();
    } else {
        selectedSeats.push(text);
        save(selectedSeats);
        render();
    }
    countSelectedSeats();
    changePrices();
    changeTime();
    seatCount.innerHTML = seatSum;
}


function newLineS(alpha) {
    const line = document.createElement('div');
    line.classList.add('line');
    for (let i = 2; i < 10; i++) {
        let statusClass;
        if (soldSeats.some(v => v === `${alpha}${i}`)) {
            statusClass = 'sold'
        } else if (selectedSeats.some(v => v === `${alpha}${i}`)) {
            statusClass = 'selected';
        } else {
            statusClass = 'available';
        }
        line.innerHTML += `
        <div class="jsSeat box seat-number ${statusClass}">${alpha}${i}</div>
        `;
    }
    seatsList.appendChild(line);
}


function newLineL(alpha) {
    const line = document.createElement('div');
    line.classList.add('line');
    for (let i = 1; i < 11; i++) {
        let statusClass;
        if (soldSeats.some(v => v ===`${alpha}${i}`)) {
            statusClass = 'sold';
        } else if (selectedSeats.some(v => v === `${alpha}${i}`)) {
            statusClass = 'selected';
        } else {
            statusClass = 'available';
        }
        line.innerHTML += `
        <div class="jsSeat box seat-number ${statusClass}">${alpha}${i}</div>
        `;
    }
    seatsList.appendChild(line);
}


function countSelectedSeats() {
    seatSum = seats.filter(v => v.classList.contains('selected')).length;
}


function changeTime() {
    let movieName = movies.value;
    startTime = getStartTime(movieName);
    time.innerHTML = startTime;
}

function getStartTime(name) {
    if (name === '') {
        return '--:--';
    } else if (name === 'avengers') {
        return '20:40';
    } else if (name === 'joker') {
        return '19:10';
    } else if (name === 'toyStory') {
        return '20:15';
    } else if (name === 'theLionKing') {
        return '21:45';
    } else {
        throw new Error(`Unknown movie: ${name}`);
    }
}

function changePrices() {
    let movieName = movies.value;
    price = getMoviePrice(movieName) * seatSum;
    totalPrice.innerHTML = `$${price}`;
}

function getMoviePrice(name) {
    if (name === '') {
        return 0;
    } else if (name === 'avengers') {
        return 10;
    } else if (name === 'joker') {
        return 12;
    } else if (name === 'toyStory') {
        return 8;
    } else if (name === 'theLionKing') {
        return 9;
    } else {
        throw new Error(`Unknown movie: ${name}`);
    }
}

/**
 * 画面更新
 */
function render() {
    console.log(selectedSeats);

    seatsList.innerHTML = '';

    newLineS('A');
    newLineS('B');
    newLineL('C');
    newLineL('D');
    newLineL('E');
    newLineL('F');
    newLineL('G');
    newLineL('H');

    seats = [...document.querySelectorAll('.jsSeat')];

    countSelectedSeats();
    changePrices();
    changeTime();
    seatCount.innerHTML = seatSum;
    totalPrice.innerHTML = `$${price}`;
    time.innerHTML = startTime;

    seats.forEach(box => box.addEventListener('click', e => clickEvent(e)));

}

/**
 * Decrement,
 * @param {Item[]} data 
 */
function decrement(data, el) {
    let index = data.indexOf(el)
    data.splice(index, 1);
}

/**
 * Save,
 * @param {Item[]} data
 */
function save(data) {
    const json = JSON.stringify(data);
    window.localStorage.setItem(DATA_KEY, json);
}

/**
 * Load,
 * @returns {Item[]}
 */
function load() {
    const json = window.localStorage.getItem(DATA_KEY);
    const data = JSON.parse(json) || [];
    return data;
}