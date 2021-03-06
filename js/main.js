import {
    getMovieCategories,
    getPopularMovieData,
    getNowPlayingMovieData,
    getUpcomingMovieData,
    getTopRatedData
} from "./fetch.js";

import {
    startCarousel
} from "./carousel.js";


const carousel = document.querySelector('.carousel-area');
const nowShowing = document.querySelector('.nowShowingJS');
const upcoming = document.querySelector('.upcomingJS');
const genreButtons = document.querySelector('.genres');
const genre = document.querySelector('.genreJS');




// Popular API (Carousel) : START -----------------------------------------------------------------
getPopularMovieData()
    .then(imgEl => {
        for (let i = 0; i < 3; i++) {
            const li = document.createElement('li');
            li.setAttribute("class", "carousel-item");
            const a = document.createElement("a");
            a.href = `./movieDetail.html?id=${imgEl.results[i].id}`;
            a.target = "_blank";
            a.rel = "noopener noreferrer";
            const img = document.createElement("img");
            img.setAttribute("class", "carousel-img");
            img.src = `https://image.tmdb.org/t/p/w500${imgEl.results[i].backdrop_path}`;
            img.alt = imgEl.results[i].title;
            a.insertAdjacentElement("beforeend", img);
            li.insertAdjacentElement("beforeend", a);
            carousel.insertAdjacentElement("beforeend", li);
        }
        startCarousel();

    })
    .catch(error => console.error(error));
// Popular API (Carousel) : END -----------------------------------------------------------------


// Now Playing API: START -----------------------------------------------------------------
Promise.all([
        getNowPlayingMovieData(),
        getMovieCategories(),
    ])
    .then(([data1, data2]) => {
        data1.results.forEach(el => {
            nowShowing.innerHTML += `
        <div class="film-item">
            <a href="./movieDetail.html?id=${el.id}" target="_blank" rel="noopener noreferrer">
                <img src="https://image.tmdb.org/t/p/w500${el.poster_path}" alt="${el.title}">
                <h4>${el.title}</h4>
                <p>${el.genre_ids.map(id => findGenreName(data2, id)).join(', ')}</p>
            </a>
        </div>
        `;
        })
    })
    .catch(error => console.error(error));
// Now Playing API: END -----------------------------------------------------------------


// Upcoming API: START -----------------------------------------------------------------
Promise.all([
        getUpcomingMovieData(),
        getMovieCategories(),
    ])
    .then(([data1, data2]) => {
        data1.results.forEach(el => {
            upcoming.innerHTML += `
                <div class="film-item">
                    <a href="./movieDetail.html?id=${el.id}" target="_blank" rel="noopener noreferrer">
                        <img src="https://image.tmdb.org/t/p/w500${el.poster_path}" alt="${el.title}">
                        <h4>${el.title}</h4>
                        <p>${el.genre_ids.map(id => findGenreName(data2, id)).join(', ')}</p>
                    </a>
                </div>
            `;
        })
    })
    .catch(error => console.error(error));
// Upcoming API: END -----------------------------------------------------------------



// Category API: START -----------------------------------------------------------------
getMovieCategories()
    .then(data => {
        const categoryName = data.genres.map(i => i.name); // category Name array

        /*----------------------
        Category Buttons
        -----------------------*/
        categoryName.forEach(el => {
            genreButtons.innerHTML += `
                <a href="#${el}">
                    <div class="genre-item">
                        <h3>${el}</h3>
                    </div>
                </a>
            `;
        });
    })
    .catch(error => console.error(error));
// Category API: END -----------------------------------------------------------------



// Genre API: END -----------------------------------------------------------------
Promise.all([
        getTopRatedData(),
        getMovieCategories(),
    ])
    .then(([data1, data2]) => {
        /*----------------------
        Genre Section
        ----------------------*/
        data2.genres.forEach(data => {
            genre.innerHTML += `<h2 id="${data.name}">${data.name}</h2>`;

            // ??????
            const genreMovies = data1.results.filter(
                (v) => v.genre_ids.includes(data.id)
            );
            const elFilmList = createFilmList(genreMovies);
            genre.append(elFilmList);

            // ???????????????????????????
            function createFilmList(genreMovies) {
                const el = document.createElement('div');
                el.classList.add("films");
                genreMovies.forEach((movie) => {
                    el.innerHTML += `
                    <div class="film-item">
                        <a href="./movieDetail.html?id=${movie.id}" target="_blank" rel="noopener noreferrer">
                        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
                            <h4>${movie.title}</h4>
                            <p>${movie.genre_ids.map(id => findGenreName(data2, id)).join(', ')}</p>
                        </a>
                    </div>
                `;
                })
                return el;
            }
        })
    })
// Genre API: END -----------------------------------------------------------------


// Search API: START -----------------------------------------------------------------
modal();
function modal() {
    //[POINT]id???????????????
    var open = document.querySelector('#open');
    var close = document.querySelector('#close');
    var mask = document.querySelector('#mask');
    var modal = document.querySelector('#modal');
    //[POINT]?????????????????????????????????
    open.addEventListener('click', function (e) { //open?????????????????????????????????????????????????????????????????????
        e.preventDefault();
        //[POINT]????????????????????????CSS????????????????????????????????????
        mask.removeAttribute("class", "hidden");
        modal.removeAttribute("class", "hidden");
    });
    close.addEventListener('click', function () { //close?????????????????????????????????????????????????????????
        //[POINT]??????????????????????????????CSS???????????????
        mask.setAttribute("class", "hidden");
        modal.setAttribute("class", "hidden");
    }); //??????????????????????????????????????????????????????????????????????????????????????????
    mask.addEventListener('click', function () { //close?????????????????????close???????????????????????????????????????????????????
        close.click(); //???????????????????????????????????????
    });
};
// Search API: END -----------------------------------------------------------------



function findGenreName(data, id) {
    return data.genres.find(el => el.id === id).name;
}