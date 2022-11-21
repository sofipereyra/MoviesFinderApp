const threeColBtn = document.getElementById("switch-three");
const oneColBtn = document.getElementById("switch-one");

const moviesSection = document.getElementsByClassName("movies-section");
const movieContainer = document.getElementsByClassName("movies-container");
const movie = document.getElementsByClassName("movie");
const movieTitle = document.getElementsByClassName("movie-title");
const starContainer = document.getElementsByClassName("star-container");
const movieDescription = document.getElementsByClassName("movie-description");



oneColBtn.addEventListener('click', function(){
    for (let i = 0; i <  moviesSection.length; i++) {
        const e = moviesSection[i];
        e.classList.add('switch-section');
    }
    for (let i = 0; i <  movieContainer.length; i++) {
        const e = movieContainer[i];
        e.classList.add('switch');
    }
    for (let i = 0; i <  movie.length; i++) {
        const e = movie[i];
        e.classList.add('switch-movie');
    }
    for (let i = 0; i <  movieTitle.length; i++) {
        const e = movieTitle[i];
        e.classList.add('switch-description');
    }
    for (let i = 0; i <  starContainer.length; i++) {
        const e = starContainer[i];
        e.classList.add('switch-description');
    }
    for (let i = 0; i <  movieDescription.length; i++) {
        const e = movieDescription[i];
        e.classList.add('switch-description');
    }
});

threeColBtn.addEventListener('click', function(){
    for (let i = 0; i <  moviesSection.length; i++) {
        const e = moviesSection[i];
        e.classList.remove('switch-section');
    }
    for (let i = 0; i <  movieContainer.length; i++) {
        const e = movieContainer[i];
        e.classList.remove('switch');
    }
    for (let i = 0; i <  movie.length; i++) {
        const e = movie[i];
        e.classList.remove('switch-movie');
    }
    for (let i = 0; i <  movieTitle.length; i++) {
        const e = movieTitle[i];
        e.classList.remove('switch-description');
    }
    for (let i = 0; i <  starContainer.length; i++) {
        const e = starContainer[i];
        e.classList.remove('switch-description');
    }
    for (let i = 0; i <  movieDescription.length; i++) {
        const e = movieDescription[i];
        e.classList.remove('switch-description');
    }
});