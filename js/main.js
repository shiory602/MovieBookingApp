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

main();

function main() {

    newLineS('A');
    newLineS('B');
    newLineL('C');
    newLineL('D');
    newLineL('E');
    newLineL('F');
    newLineL('G');
    newLineL('H');

    seats = [...document.querySelectorAll('.jsSeat')];
    selectedSeats = load();

    seats.forEach(box => box.addEventListener('click', e => {
        /** @type {HTMLElement} */
        const el = e.currentTarget;
        const text = el.textContent;
        if (el.classList.contains('sold')) {
            alert('This seat is already sold.');
        } else if (el.classList.contains('available')) {
            el.classList.add('selected');
            el.classList.remove('available');
            selectedSeats.push(text);
            save(selectedSeats);
        } else if (el.classList.contains('selected')) {
            el.classList.add('available');
            el.classList.remove('selected');
            decrement(selectedSeats, text);
        }
        countSelectedSeats();
        changePrices();
        changeTime();
        seatCount.innerHTML = seatSum;
    }));


    movies.addEventListener('change', e => {
        changePrices();
    })
}

function newLineS(alpha) {
    const line = document.createElement('div');
    line.classList.add('line');
    line.innerHTML = `
         <div class="jsSeat box seat-number available">${alpha}3</div>
         <div class="jsSeat box seat-number available">${alpha}2</div>
 
         <div class="jsSeat box seat-number available">${alpha}4</div>
         <div class="jsSeat box seat-number available">${alpha}5</div>
         <div class="jsSeat box seat-number sold">${alpha}6</div>
         <div class="jsSeat box seat-number sold">${alpha}7</div>
         <div class="jsSeat box seat-number available">${alpha}8</div>
         <div class="jsSeat box seat-number available">${alpha}9</div>
         `;

    seatsList.appendChild(line);
}

function newLineL(alpha) {
    const line = document.createElement('div');
    line.classList.add('line');
    line.innerHTML = `
     <div class="jsSeat box seat-number available">${alpha}1</div>
     <div class="jsSeat box seat-number available">${alpha}2</div>
     <div class="jsSeat box seat-number available">${alpha}3</div>
 
     <div class="jsSeat box seat-number available">${alpha}4</div>
     <div class="jsSeat box seat-number available">${alpha}5</div>
     <div class="jsSeat box seat-number available">${alpha}6</div>
     <div class="jsSeat box seat-number available">${alpha}7</div>
 
     <div class="jsSeat box seat-number available">${alpha}8</div>
     <div class="jsSeat box seat-number available">${alpha}9</div>
     <div class="jsSeat box seat-number available">${alpha}10</div>
         `;

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
function render(data) {
    console.log(data);

    countSelectedSeats();
    changePrices();
    changeTime();
    seatCount.innerHTML = seatSum;
    totalPrice.innerHTML = `$${price}`;
    time.innerHTML = startTime;

    // seatsList.innerHtml = "";
    // data.forEach((seatNum) => {
    //     (seatNum);
    // });
}

/**
 * Decrement,
 * @param {Item[]} data 
 */
function decrement(data, el) {
    let index = data.indexOf(el)
    data.splice(index, 1);

    render(data);
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
    render(data);
    return data;
}