import {
    getMovieCategories,
    getPopularMovieData
} from "./fetch.js";
import {
    startCarousel
} from "./carousel.js";

const genreButtons = document.querySelector('.genres');
const genreJS = document.querySelector('.genreJS');

startCarousel();

getMovieCategories()
    .then(data => {
        const categoryName = data.genres.map(i => i.name); // category Name array
        // console.log(categoryName.length);
        const categoryId = data.genres.map(i => i.id); // category ID array
        // console.log(categoryId)

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

        /*----------------------
        Genre Section
        ----------------------*/
        categoryName.forEach(el => {
            genreJS.innerHTML += `
                <h2 id="${el}">${el}</h2>
                <div class="films">
                    <div class="film-item">
                        <a href="./movieDetail.html" target="_blank" rel="noopener noreferrer">
                            <img src="./img/ladyandthetramp.png" alt="">
                            <h4>title</h4>
                            <p>category</p>
                        </a>
                    </div>
                </div>
            `;
        })
        // genreJS.appendChild();

    })
    .catch(error => console.error(error));



getPopularMovieData()