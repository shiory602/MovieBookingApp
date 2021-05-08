import {
    getMovieCategories
} from "./fetch.js";

const movieTitle = document.querySelector('#movie-title');
const movieCategory = document.querySelector('#category-list');
const movieOverview = document.querySelector('#overview');
const releaseDate = document.querySelector('#release-date');
const voteAverage = document.querySelector('#vote-average');

const movieBg = document.querySelector('.movie-detail-bg');

const API_KEY = "0872d5dd1f8ee0ee90233d854bce0ad4";
const url = new URL(window.location.href); // URLをオブジェクトとして返す
const movieId = url.searchParams.get("id"); // 指定したクエリ引数へアクセスする
const url_detail = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&append_to_response=videos,images`;

console.log(url_detail);

fetch(url_detail).then((response) => response.json())
    .then((json) => {
        movieTitle.textContent = json.title;

        for (const genre of json.genres) {
            // <span></span>
            const genreEl = document.createElement("span");
            // <span>Action</span>
            genreEl.textContent = genre.name;
            genreEl.setAttribute("class", "category");

            movieCategory.insertAdjacentElement("beforeend", genreEl);
        }

        releaseDate.textContent = `Release: ${json.release_date}`;
        voteAverage.textContent = `★${json.vote_average}`;
        movieOverview.textContent = json.overview;

        movieBg.innerHTML = `<img src="https://image.tmdb.org/t/p/w500${json.backdrop_path}" alt="${json.title} trailer">`
    });
