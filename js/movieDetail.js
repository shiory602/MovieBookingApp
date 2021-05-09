const movieTitle = document.querySelector('#movie-title');
const movieCategory = document.querySelector('#category-list');
const movieOverview = document.querySelector('#overview');
const releaseDate = document.querySelector('#release-date');
const voteAverage = document.querySelector('#vote-average');
const movieBg = document.querySelector('.movie-detail-bg');
const movieTrailer = document.querySelector("movie-trailer");

const recommendJS = document.querySelector('.recommendJS');


const API_KEY = "0872d5dd1f8ee0ee90233d854bce0ad4";
const url = new URL(window.location.href); // URLをオブジェクトとして返す
const movieId = url.searchParams.get("id"); // 指定したクエリ引数へアクセスする
const url_detail = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&append_to_response=videos,images`;
const url_recommend = `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${API_KEY}&language=en-US&page=1`;
let url_categories = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`;

console.log(url_detail);

/*----------------------------------
Detail
-----------------------------------*/
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

        const movieBackdrop = document.querySelector("img");
        movieBackdrop.src = `https://image.tmdb.org/t/p/w500${json.backdrop_path}`;
        movieBackdrop.alt = `${json.title} image">`;
        movieBg.insertAdjacentElement("beforeend", movieBackdrop);
        
        // for(const video of json.videos.results) {
        //     console.log(video.id);
        // }

        console.log(`https://www.youtube.com/embed/${json.videos.results[0].key}`);
        const iframe = document.querySelector("iframe");
        iframe.src = `https://www.youtube.com/embed/${json.videos.results[0].key}`;
        iframe.width = "560";
        iframe.height = "315";
        iframe.title = "YouTube video player";
        iframe.frameborder = "0";
        iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        iframe.setAttribute("allowfullscreen");
        movieTrailer.insertAdjacentElement("beforeend", trailer);
        // movieTrailer.src = `https://www.youtube.com/embed/v=${json.videos.results[0].key}`;


    });


/*----------------------------------
Recommend
-----------------------------------*/
function getRecommendedData() {
    return fetch(url_recommend).then(res => {
        return res.json();
    });
}

function getMovieCategories() {
    return fetch(url_categories).then(res => {
        return res.json();
    });
}

Promise.all([
        getRecommendedData(),
        getMovieCategories(),
    ])
    .then(([json1, json2]) => {
        for (const movie of json1.results) {
            const recommendEl = document.createElement("div");
            recommendEl.setAttribute("class", "film-item");
            recommendJS.insertAdjacentElement("beforeend", recommendEl);

            const aEl = document.createElement("a");
            aEl.href = `./movieDetail.html?id=${movie.id}`;
            aEl.target = "_blank";
            aEl.rel = "noopener noreferrer";
            recommendEl.insertAdjacentElement("beforeend", aEl);

            const imgEl = document.createElement("img");
            imgEl.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
            imgEl.alt = movie.title;
            aEl.insertAdjacentElement("beforeend", imgEl);

            const headerEl = document.createElement("h4");
            headerEl.textContent = movie.title;
            aEl.insertAdjacentElement("beforeend", headerEl);
            const pEl = document.createElement("p");
            pEl.textContent += movie.genre_ids.map(id => findGenreName(json2, id)).join(", ");
            aEl.insertAdjacentElement("beforeend", pEl);
        }
    })

function findGenreName(data, id) {
    return data.genres.find(el => el.id === id).name;
}