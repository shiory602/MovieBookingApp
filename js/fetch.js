// https://shiory602.github.io/MovieBookingApp/
// https://developers.themoviedb.org/3/getting-started/introduction

const API_KEY = "0872d5dd1f8ee0ee90233d854bce0ad4";
let url_categories = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`;
let url_popular = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;
let url_now_playing = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`;
let url_upcoming = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`;
let url_topRated = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`;

let searchText; // titleに含まれるワード
let url_search = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${searchText}&page=1&include_adult=false`;

// console.log(url_topRated);


/*-------------------------------
Search
-------------------------------*/
// const searchData = document.querySelector("#search");
// const text = document.querySelector("#text");

// searchData.addEventListener("submit", e => {
//     e.preventDefault();
//     searchText = text.value;
// });

// export function searchMovies() {
//     return fetch(url_search).then(res => {
//         checkError(res);
//         return res.json();
//     })
// }


/*-------------------------------
Checking Error function
-------------------------------*/
let checkError = res => {
    if (res.status !== 200) {
        alert("We have an error ${res.status}");
    }
}


/*-------------------------------
Movie Categories
-------------------------------*/
export function getMovieCategories() {
    return fetch(url_categories).then(res => {
        checkError(res);
        return res.json();
    });
}

/*-------------------------------
Popular
-------------------------------*/
export function getPopularMovieData() {
    return fetch(url_popular).then(res => {
        checkError(res);
        return res.json();
    });
}

/*-------------------------------
Now Playing
-------------------------------*/
export function getNowPlayingMovieData() {
    return fetch(url_now_playing).then(res => {
        checkError(res);
        
        // id = identifier(識別できる番号/記号)
        // id ≒ unique(重複がない)
        // movieDetail.html?id=460465
        const json = res.json().then((json) => {
            console.log(json);

            return json;
        })
        return json;
    });
}

/*-------------------------------
Upcoming
-------------------------------*/
export function getUpcomingMovieData() {
    return fetch(url_upcoming).then(res => {
        checkError(res);

        // id = identifier(識別できる番号/記号)
        // id ≒ unique(重複がない)
        // movieDetail.html?id=460465
        const json = res.json().then((json) => {
            console.log(json);

            return json;
        })
        return json;
    });
}

/*-----------------------------------
Top Rated for Showing Genre section
------------------------------------*/
export function getTopRatedData() {
    return fetch(url_topRated).then(res => {
        checkError(res);
        return res.json();
    });
}


