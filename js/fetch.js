// https://shiory602.github.io/MovieBookingApp/
// https://www.themoviedb.org/settings/api

const API_KEY = '0872d5dd1f8ee0ee90233d854bce0ad4';
let title = 'あんぱんまん'
let url = `https://api.themoviedb.org/3/movie/157336?api_key=${API_KEY}&append_to_response=videos,images`;
let url_now_playing = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&append_to_response=videos,images`;
let url_popular = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;

console.log(url_now_playing);



export function getNowPlayingMovieData() {
    return fetch(url_now_playing)
        .then(res => {
            return res.json();
        });
}

export function getPopularMovieData() {

    return fetch(url_popular)

        .then(res => {
            return res.json();
        }) // .thenが後ろにあったらreturnつける

        .then(data => { // data = res.json()

            console.log(data);

        })

        .catch(error => console.error(error));
}