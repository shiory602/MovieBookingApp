const API_KEY = "0872d5dd1f8ee0ee90233d854bce0ad4";

const url = new URL(window.location.href); // URLをオブジェクトとして返す
const movieId = url.searchParams.get("id"); // 指定したクエリ引数へアクセスする
const url_detail = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&append_to_response=videos,images`;

console.log(url_detail);
fetch(url_detail).then((response) => response.json())
    .then((json) => {
        console.log(json);
    });