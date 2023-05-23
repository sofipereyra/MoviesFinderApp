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
                    ${setStars(movie.vote_average)}
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
                    ${setStars(movie.vote_average)}
                </div>
                <div class="movie-description-container">
                <p id="movie-description" class="movie-description">${movie.overview}</p>
                </div>
            </div>
        `
        movieContainer.append(movieEl);
        movieEl.addEventListener("click", () => {
            setModal(movie)
        })
    });

}

function setStars(score) {
    let starImg = `<img class="star" src="./assets/home/star.svg" alt=""></img>`;
    let starAvg = ``;
    if (score < 2) {
        return starAvg.concat(starImg);
    } else if (score < 4) {
        return starAvg.concat(starImg,starImg);
    } else if (score < 6) {
        return starAvg.concat(starImg,starImg,starImg);
    } else if (score < 8) {
        return starAvg.concat(starImg,starImg,starImg,starImg);
    } else {
        return starAvg.concat(starImg,starImg,starImg,starImg,starImg);
    }
}

async function fetchLang() {
    const requestOptions = {
        method: "GET",
        redirect: "follow",
    };
    try {
        const langData = await fetch(
            BASE_URL + "/configuration/languages?" + API_KEY,
            requestOptions
        );
        const langJson = langData.json();
        return langJson;
    } catch (error) {
        console.log(error)
    }
}

async function fetchGenres() {
    const requestOptions = {
        method: "GET",
        redirect: "follow",
    };

    const genreData = await fetch(
        BASE_URL + "/genre/movie/list?" + API_KEY + "&language=en-US",
        requestOptions
    );
    try {
        const gen = await genreData.json();
        return gen;
    } catch (error) {
        console.log(error)
    }
}

async function giveGenres(genrelist) {
    const rawGenres = await fetchGenres();
    genres = await rawGenres.genres;
    let idArr = genres;

    res = [];

    idArr.forEach((element) => {
        genrelist.forEach((genre_id) => {
            if (element.id === genre_id) {
                res.push(element.name);
            }
        });
    });

    let endVar = res.join(", ");

    return endVar;
}

async function getVideos(movie) {
    const requestOptions = {
        method: "GET",
        redirect: "follow",
    };
    
    try {
        let trailer = document.querySelector(".trailer");
        trailer.innerHTML = "";
        let frame = document.createElement("iframe");
        trailer.style.display = "flex"
        const videosData = await fetch(
            `${BASE_URL}/movie/${movie.id}/videos?${API_KEY}&language=en-US`,
            requestOptions
        );
        const videosJson = await videosData.json();

        const videosArr = videosJson.results;
        let videoKey = "";

        for (i = videosArr.length - 1; i >= 0; i--) {
            if (videosJson.results[i].type === "Trailer") {
                videoKey = videosJson.results[i].key;
                break;
            }
        }

        let youtubeURL = "https://www.youtube.com/embed/";
        frame.src = youtubeURL + videoKey;
        frame.allow = "fullscreen"
        frame.frameBorder="0"
        trailer.append(frame);
        trailer.display = "flex"
        trailer.style.transition = " left 1s";

        let onDesktop = (window.innerWidth > 1220)
        if (onDesktop) {
            trailer.style.left = "calc(50vw - 50px)";
        }else{
            trailer.style.left = "0"
        }
    } catch (error) {
        console.log(error);
    }
}

async function getRecommended(id) {
    const requestOptions = {
        method: "GET",
        redirect: "follow",
    };

    const fetched = await fetch(
        `${BASE_URL}/movie/${id}/similar?${API_KEY}&language=en-US&page=1`,
        requestOptions
    );
    const response = await fetched.json();

    return response.results;
}

async function setModal(movie){
    const languages = await fetchLang();
    const modalMain = document.querySelector(".modal");
    const body = document.querySelector("body");
    const background = document.querySelector(".modal-top");
    const modaldesc = document.querySelector(".modal-description");
    const modallanguage = document.querySelector("#modal-language");
    const modalrelease = document.querySelector("#modal-releasedate");
    const modalgenres = document.querySelector("#modal-genres");
    const modalpopularity = document.querySelector("#modal-popularity");
    const ofuscator = document.querySelector(".ofuscator");
    const trailer = document.querySelector(".trailer");
   
    body.style.overflow = "hidden";
    modalMain.style.display = "flex";
    
    background.innerHTML = `
            <div class="gradient">
                <img id="modal-img" src = ${IMG_URL + movie.backdrop_path} alt="Movie background">
                <img
                    id="modal-close"
                    src="./assets/home/cross.svg"
                    alt="Close movie details."
                />
                <div class="modal-buttoncont">
                    <button class = "modal-button_in btn">Play Trailer</button>
                </div>
                <div class="modal-title">${movie.title}</div>
            </div>`;
    
    const close = document.getElementById("modal-close")
    modaldesc.textContent = movie.overview;
    ofuscator.style.display = "flex";

    let img

    if (movie.backdrop_path === null) {
        img = movie.poster_path
    } else {
        img = movie.backdrop_path
    }

    let month = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"]
    let date = movie.release_date.split("-")
    
    let monthNum = (Number(date[1]))-1

    let refinedDate = date[2] + " " + month[monthNum] + " " + date[0]

    modalrelease.textContent = refinedDate;

    let genres = await giveGenres(movie.genre_ids);
    modalgenres.textContent = genres;

    let lang = "";

    languages.forEach(element => {
        if (element.iso_639_1 === movie.original_language) {
            lang = element.english_name
        }
    })

    modallanguage.textContent = lang;

    modalpopularity.textContent = `${(movie.vote_average * 0.5).toFixed(
        2
    )} / 5`;

    ofuscator.addEventListener("click", function () {
        modalMain.style.display = "none";
        ofuscator.style.display = "none";
        body.style.overflow = "auto";
    });

    close.addEventListener("click", function () {
        modalMain.style.display = "none";
        ofuscator.style.display = "none";
        body.style.overflow = "auto";
    });

    const button = document.querySelector(".modal-button_in");
    let trailerBool = false;

    button.addEventListener("click", function () {
        if (trailerBool === false) {
            trailerBool = true;
            button.textContent = "Hide Trailer";
            getVideos(movie);
        } else {
            trailerBool = false;

            button.textContent = "Play Trailer";
            trailer.style.transition = "left 1s";
            trailer.style.left = "143%";
            setTimeout(() => {
                trailer.innerHTML = ''
                trailer.style.display = "none"
            }, 1001);
        }
    });
    trailer.addEventListener("click", function () {
        trailerBool = false;

            buttontext.textContent = "Play Trailer";
            trailer.style.transition = "left 1s";
            trailer.style.left = "143%";
            setTimeout(() => {
                trailer.innerHTML = ''
                trailer.style.display = "none"
            }, 1001);
    });
    
    let recomMovies = await getRecommended(movie.id);
    let modalrecoms = document.querySelector(".modal-similarmovies");
    modalrecoms.innerHTML = ``;
    recomMovies = recomMovies.slice(0, 4);

    for (let i = 0; i < recomMovies.length; i++) {
        if (recomMovies[i].title === movie.title) {
            recomMovies.splice(i, 1);
        }
    }

    let recom1 = document.createElement("div");
    recom1.classList = ("modal-similarmovie", "similar1");
    let recom2 = document.createElement("div");
    recom2.classList = ("modal-similarmovie", "similar2");
    let recom3 = document.createElement("div");
    recom3.classList = ("modal-similarmovie", "similar3");
    modalrecoms.append(recom1, recom2, recom3);

    if (recomMovies != []) {
        
        recom1.style.backgroundImage = `url("${IMG_URL + recomMovies[0].backdrop_path}")`;
        recom2.style.backgroundImage = `url("${IMG_URL + recomMovies[1].backdrop_path}")`;
        recom3.style.backgroundImage = `url("${IMG_URL + recomMovies[2].backdrop_path}")`;

        recom1.removeEventListener("click", setModal);
        recom1.addEventListener("click", function () {
            let trailer = document.querySelector(".trailer");
            trailer.innerHTML = "";
            button.innerHTML = "";
            trailer.style.left = "543%";
            setModal(recomMovies[0]);
        });
        recom2.addEventListener("click", function () {
            let trailer = document.querySelector(".trailer");
            button.innerHTML = "";
            trailer.innerHTML = "";
            trailer.style.left = "543%";
            setModal(recomMovies[1]);
        });
        recom3.addEventListener("click", function () {
            let trailer = document.querySelector(".trailer");
            button.innerHTML = "";
            trailer.innerHTML = "";
            trailer.style.left = "543%";
            setModal(recomMovies[2]);
        });
    }

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

