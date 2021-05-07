import {
    getMovieCategories
} from "./fetch.js";

const movieTitle = document.querySelector('.movie-detail-description h4');
const movieCategory = document.querySelector('.movie-detail-description span');
const movieRate = document.querySelector('.movie-detail-description .rate');
const movieRate = document.querySelector('.movie-detail-description .rate');

const movieBg = document.querySelector('.movie-detail-bg');

const API_KEY = "0872d5dd1f8ee0ee90233d854bce0ad4";
const url = new URL(window.location.href); // URLをオブジェクトとして返す
const movieId = url.searchParams.get("id"); // 指定したクエリ引数へアクセスする
const url_detail = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&append_to_response=videos,images`;

console.log(url_detail);

fetch(url_detail).then((response) => response.json())
    .then((json) => {
        movieTitle.textContent = json.title;
        console.log(json);

        movieBg.innerHTML = `<img src="https://image.tmdb.org/t/p/w500${json.backdrop_path}" alt="${json.title} trailer">`
    });
