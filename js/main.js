import {
    getMovieCategories,
    getPopularMovieData
} from "./fetch.js";
import {
    startCarousel
} from "./carousel.js";

const genreButtons = document.querySelector('.genres');

startCarousel();

getMovieCategories()
    .then(data => {
        const categoryName = data.genres.map(i => i.name); // category Name array
        // console.log(categoryName.length);
        const categoryId = data.genres.map(i => i.id); // category ID array
        // console.log(categoryId)

        categoryName.forEach(el => {
            genreButtons.innerHTML += `
                <a href="#">
                    <div class="genre-item">
                        <h3>${el}</h3>
                    </div>
                </a>
            `;
        });
    })
    .catch(error => console.error(error));



getPopularMovieData()