import { getNowPlayingMovieData, getPopularMovieData } from "./fetch.js";
import { startCarousel } from "./carousel.js";

startCarousel();

getNowPlayingMovieData()
    .then(data => {
        console.log(data);
    })
    .catch(error => console.error(error));


    
getPopularMovieData();