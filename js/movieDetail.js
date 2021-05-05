import {
    getMovieCategories,
    getPopularMovieData,
    getNowPlayingMovieData,
    getUpcomingMovieData
} from "./fetch.js";

const movieDetail = document.querySelector('.movie-detail-description');

Promise.all([
        getNowPlayingMovieData(),
        getMovieCategories(),
    ])
    .then(([data1, data2]) => {
        data1.results.forEach(el => {
            console.log(el);
            movieDetail.innerHTML = `
                <h4>${el.title}<span>${el.genre_ids.map(id => findGenreName(data2, id)).join(', ')}</span></h4>
                <div class="info">
                    <span class="rate">★★★★★</span>
                    <span class="view">13652 views</span>
                </div>
                <p>${el.overview}}</p>
            `;
        });

    })
    .catch(error => console.error(error));

function findGenreName(data, id) {
    return data.genres.find(el => el.id === id).name;
}