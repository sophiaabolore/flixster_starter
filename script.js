const imageBaseUrl = "https://image.tmdb.org/t/p";
const apiKey = "b6165ada4e1f72e1a57cbb0b1f5a430c";
const limitVal = 20;
const titleElement = document.getElementById("movie-title");
const posterElement = document.getElementById("movie-poster");
const votesElement = document.getElementById("movie-votes");
var page = 1;
let movieGridElement = document.getElementById("movies-grid");
const searchInput = document.getElementById("search-input");
const main = document.querySelector(".results-section");
const form = document.querySelector(".form");
const closeSearchEl = document.querySelector(".close-search-btn");

form.addEventListener("submit", searchMovies);

window.onload = function () {
  // execute your functions here to make sure they run as soon as the page loads
  getMovies();
};

//Section 1: Initial display of the movies

async function getMovies() {
  // Extracts movie title, ratings and image from the API

  // clearPreviousResults();

  // const searchInputValue = searchInput.value;
  const apiUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=${page}`;
  const response = await fetch(apiUrl, { mode: "cors" });
  const data = await response.json();
  const movieData = await data.results;

  for (let movie of movieData) {
    addCard(movie);
  }
}

function addCard(movie) {
  //Adds each movie card to the grid
  const movieCard = `
    <div class="movie-card">      
        <div class="movie-title"><h1>${movie.title}</h1></div>
        <img src="https://image.tmdb.org/t/p/original${movie.poster_path}" class="movie-poster" alt="Poster for ${movie.title}" />
        <div class="movie-votes"><h1>Ratings: ${movie.vote_average}⭐<h1></div>
    </div>
    `;
  movieGridElement.innerHTML = movieGridElement.innerHTML + movieCard;
}

// Potential clear results section
function clearPreviousResults() {
  movieGridElement.innerHTML = "";
}

// function clearPreviousResults() {

//     while (movieGridElement.firstChild) {
//         movieGridElement.removeChild(movieGridElement.firstChild);
//     }
// }

// Section 2: Loading more images onto the page
async function loadMoreMovies(event) {
  //event.preventDefault();
  // Extracts movie title, ratings and image from the API
  page += 1;

  const apiUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=${page}`;
  const response = await fetch(apiUrl, { mode: "cors" });
  const data = await response.json();

  const movieData = await data.results;

  for (let movie of movieData) {
    addCard(movie);
  }
}

// Section 3: Searching for movies in the API
async function searchMovies(event) {
  event.preventDefault();
  clearPreviousResults();
  page = 1;
  const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${searchInput.value}&page=1`;
  const response = await fetch(searchUrl, { mode: "cors" });

  const data = await response.json();
  const movieData = await data.results;
  console.log("movieData: ", movieData);

  if (movieData != null) {
    for (let movie of movieData) {
      addCard(movie);
    }
  } else {
    const movieCard = `
        <div class="movie-card">      
            <h1>Sorry, the movie you are searching for cannot be found</h1>
        </div>
        `;
  }
  searchInput.value = "";
}

// Section 4: Close Search
function closeSearch(event) {
  event.preventDefault();
  console.log("closing: ");
  clearPreviousResults();
  getMovies();
}

document.querySelector(".loader").addEventListener("click", loadMoreMovies);
closeSearchEl.addEventListener("click", closeSearch);
