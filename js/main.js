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
            <a href="./movieDetail.html" target="_blank" rel="noopener noreferrer">
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
                    <a href="./movieDetail.html" target="_blank" rel="noopener noreferrer">
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
        const categoryId = data2.genres.map(i => i.id); // category ID array
        console.log(data1.results[0].genre_ids.map(id => filterGenreID(data2, id)));
        data1.results.forEach(data => {
            if(categoryId.forEach(id => id === data.genre_ids)) {
                genre.innerHTML += `
                    <h2 id="${data2.genres[0].name}">${data2.genres[0].name}</h2>
                    <div class="films">
                        <div class="film-item">
                            <a href="./movieDetail.html" target="_blank" rel="noopener noreferrer">
                            <img src="https://image.tmdb.org/t/p/w500${data.poster_path}" alt="${data.title}">
                                <h4>${data.title}</h4>
                                <p>${data.genre_ids.map(id => findGenreName(data2, id)).join(', ')}</p>
                            </a>
                        </div>
                    </div>
                `;
            }
        })
})
// Genre API: END -----------------------------------------------------------------



function findGenreName(data, id) {
    return data.genres.find(el => el.id === id).name;
}

function filterGenreID(data, id) {
    return data.genres.filter(el => el.id === id);
}