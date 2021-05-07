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

startCarousel();


// Search API: START -----------------------------------------------------------------

// Search API: END -----------------------------------------------------------------



// Popular API (Carousel) : START -----------------------------------------------------------------
getPopularMovieData()
    .then(data => {
        let li = document.createElement('li');
        li.classList.add('carousel-list');
        data.results.forEach(i => {
            li.innerHTML += `
                <img class="carousel-img" src="https://image.tmdb.org/t/p/w500${i.backdrop_path}" alt="${i.title}" width="1000px">
            `;
        })
        carousel.appendChild(li);

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

            // 一覧
            const genreMovies = data1.results.filter(
                (v) => v.genre_ids.includes(data.id)
            );
            const elFilmList = createFilmList(genreMovies);
            genre.append(elFilmList);

            // 一覧を生成して返す
            function createFilmList(genreMovies) {
                const el = document.createElement('div');
                el.classList.add("films");
                genreMovies.forEach((movie) => {
                el.innerHTML += `
                    <div class="film-item">
                        <a href="./movieDetail.html" target="_blank" rel="noopener noreferrer">
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



function findGenreName(data, id) {
    return data.genres.find(el => el.id === id).name;
}