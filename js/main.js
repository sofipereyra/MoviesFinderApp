const API_KEY = 'api_key=c96b3b3f768a4c33002d63b40ac7b568';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const SEARCH_URL = 'https://api.themoviedb.org/3/search/movie?' + API_KEY + '&query=';

getMovies(API_URL)

function getMovies(url){
    fetch(url)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        showMovies(data.results);
    }).catch(error => error);
}

function showMovies(data){
    const movieContainer = document.getElementById('movie-container');
    data.forEach(movie => {
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
                <p id="movie-description" class="movie-description">${movie.overview}</p>
            </div>
        `
        movieContainer.append(movieEl);
    });
}

const searchForm = document.getElementById("search-form");
const search = document.getElementById("search");

searchForm.addEventListener('submit', (e) => {
    e.preventDefault;
    const searchValue = search.value;
    if(searchValue && searchValue !== ''){
        getMovies(SEARCH_URL+searchValue);
        searchValue = '';
    }else{
        window.location.reload();
    }
})

