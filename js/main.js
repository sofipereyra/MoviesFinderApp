const API_KEY = 'api_key=c96b3b3f768a4c33002d63b40ac7b568';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const SEARCH_URL = 'https://api.themoviedb.org/3/search/movie?' + API_KEY + '&query=';

getMovies(API_URL)

function ErrorException(sms) {
    this.sms = sms;
  }

function getMovies(url){
    fetch(url)
    .then(res => res.json())
    .then(data => {
        showMovies(data.results);
    }).catch(error => error);
}

function showMovies(data){
    const movieContainer = document.getElementById('movie-container');

    const firstMovieSection = document.getElementById('first-movie-section');
    
    let firstMovie = {};
    firstMovie = data.slice(0,1);
    const firstMovieEl = document.createElement('div');
    firstMovieSection.innerHTML = '';
    firstMovieEl.classList.add("first-movie-container");
    firstMovieEl.innerHTML = `
        <img src="${IMG_URL}${firstMovie[0].backdrop_path}" id="bg-img" alt="">
        <p class="genre">Science Fiction</p>
                <div class="star-container">
                    <img class="star" src="./assets/home/star.svg" alt="">
                    <img class="star" src="./assets/home/star.svg" alt="">
                    <img class="star" src="./assets/home/star.svg" alt="">
                    <img class="star" src="./assets/home/star.svg" alt="">
                    <img class="star" src="./assets/home/star.svg" alt="">
                </div>
                <h3>${firstMovie[0].title}</h3>
                <div class="first-m-description-container">
                <p class="first-movie-description">${firstMovie[0].overview}</p>
                </div>
                <button class="watch-btn" aria-label="watch now button">Watch Now</button>
    `
    firstMovieSection.append(firstMovieEl);

    let movies = data.slice(1);
    movieContainer.innerHTML='';
    movies.forEach(movie => {
        const {} = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
            <img id="movie-bg" src="${IMG_URL}${movie.backdrop_path}" alt="">
            <div class="movie-info">
                <p class="movie-title">${movie.title}</p>
                <div class="star-container">
                    <img class="star" src="./assets/home/star.svg" alt="">
                    <img class="star" src="./assets/home/star.svg" alt="">
                    <img class="star" src="./assets/home/star.svg" alt="">
                    <img class="star" src="./assets/home/star.svg" alt="">
                    <img class="star" src="./assets/home/star.svg" alt="">
                </div>
                <div class="movie-description-container">
                <p id="movie-description" class="movie-description">${movie.overview}</p>
                </div>
            </div>
        `
        movieContainer.append(movieEl);
    });
}

const searchForm = document.getElementById("search-form");
const search = document.getElementById("search");
const searchError = document.getElementById("search-error");

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    searchError.innerHTML = '';
    try{
        let searchValue = search.value;
        if(searchValue === ''){
            throw new ErrorException("It can't be empty!");
        }else{
            getMovies(SEARCH_URL+searchValue);
            searchValue = '';
        }
    }catch(ErrorException){
        searchError.innerHTML = ErrorException.sms;
    }
})

const logout = document.querySelector("#logout");
    logout.addEventListener("click", function () {
        sessionStorage.removeItem("token");
        localStorage.removeItem("token");
        window.location.href = "../index.html";
    });

