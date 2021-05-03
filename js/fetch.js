// https://shiory602.github.io/MovieBookingApp/
// https://www.themoviedb.org/settings/api

const API_KEY = '0872d5dd1f8ee0ee90233d854bce0ad4';
let url_categories = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`;
let url_popular = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;
let url_now_playing = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`;

let url_upcoming = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`;
// let url_detail = `https://api.themoviedb.org/3/movie/${MOVIE_ID}?api_key=${API_KEY}&append_to_response=videos,images`;


// console.log(url_detail);




/*-------------------------------
Checking Error function
-------------------------------*/
let checkError = res => {
    if (res.status !== 200) {
        alert('We have an error ${res.status}');
    }
}


/*-------------------------------
Movie Categories
-------------------------------*/
export function getMovieCategories() {
    return fetch(url_categories)
    .then(res => {
        checkError(res);
        return res.json();
    });
}

/*-------------------------------
Popular
-------------------------------*/
export function getPopularMovieData() {
    return fetch(url_popular)
    .then(res => {
        checkError(res);
        return res.json();
    });
}

/*-------------------------------
Now Playing
-------------------------------*/
export function getNowPlayingMovieData() {
    return fetch(url_now_playing)
    .then(res => {
        checkError(res);
        return res.json();
    });
}



/*--------------------------------------------------------------*/

/*-------------------------------
Movie Title
-------------------------------*/
// export function getMovieDetail() {
//     return fetch(url_detail)
//     .then(res => {
//         checkError(res);
//         return res.json();
//     })
//     .then(data => {
//         console.log(data);
//     })
//     .catch(error => console.error(error));
// }

/*-------------------------------
Movie Picture
-------------------------------*/