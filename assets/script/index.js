'use strict';
 
import movies from '../data/movies.js';
import  *  as utils from './utils.js';

// Selecting DOM elements
const searchMovie = utils.select('.input'); // Input field for searching movies
const moviesAvailable = utils.select('.result'); // Container for displaying search results
const button = utils.select('.button'); // Button for initiating search
const displayMovies = utils.select('.movieDisplay'); // Container for displaying movie details

// Selecting genre elements
const genreElements = document.querySelectorAll('.movie-genre .genre');

/* Input validation function */
function isValidInput(query) {
    return query.length >= 3;
}

/* Handle input change */
function onInputChange() {
    const query = searchMovie.value.toLowerCase();
    if (isValidInput(query)) {
        renderMovieList(query);  
    } else {
        moviesAvailable.innerHTML = '';
    }
}

/* Search movies based on query */
function filterMovies(query) {
    return movies.filter(movie => movie.title.toLowerCase().includes(query));
}

/* Display movie list */
function displayMovieList(matches) {
    moviesAvailable.innerHTML = '';
    if (matches.length > 0) {
        const ul = utils.create('ul');
        for (let i = 0; i < Math.min(matches.length, 5); i++) {
            const movie = matches[i];
            const li = utils.create('li');
            li.textContent = movie.title;
            li.dataset.title = movie.title; // Store movie title in dataset for later use
            ul.appendChild(li);
        }
        // Event listener for movie selection
        utils.listen('click', ul, function(event) {
            const clickedElement = event.target;
            if (clickedElement.tagName === 'LI') {
                const movieTitle = clickedElement.dataset.title;
                searchMovie.value = movieTitle;
                renderMovieList(movieTitle);
                moviesAvailable.innerHTML = '';
            }
        });
        moviesAvailable.appendChild(ul);
    } else {
        moviesAvailable.innerHTML = '<li class="not-found">Movie not found</li>';
    }
}

/* Display details of the first matching movie */
function showFirstMatch() {
    const searchTerm = searchMovie.value.toLowerCase();
    const matches = filterMovies(searchTerm);
    if (matches.length > 0) {
        const movie = matches[0];
        const movieHTML = generateMovieHTML(movie);
        displayMovies.innerHTML = movieHTML;
    } else {
        displayMovies.innerHTML = '';
    }
}

/* Render movie list based on search term */
function renderMovieList(searchTerm) {
    const matches = filterMovies(searchTerm.toLowerCase());
    displayMovieList(matches);
}

/* Generate HTML for a movie */
function generateMovieHTML(movieFound) {
    const genres = movieFound.genre.map(singleGenre => `<span class="genre" style="background-color: #24252D;">${singleGenre}</span>`).join('');
    const yearDurationHTML = `<div class="duration"><div class="green-dot"></div><p class="movieYear">${movieFound.year}</p><p class="movieDuration">${movieFound.runningTime}</p></div>`;
    
    return `<div class="movie"><img src="${movieFound.poster}" alt="${movieFound.title}" class="movie-poster"><div class="movieDetails"><h2 class="movie-title">${movieFound.title}</h2>${yearDurationHTML}<p class="movie-description">${movieFound.description}</p><div class="movie-genre">${genres}</div></div></div>`;
}

// Apply margin-left style to genre elements except the first one
for (let i = 1; i < genreElements.length; i++) {
    genreElements[i].style.marginLeft = '10px';
}

// Event listeners
utils.listen('input', searchMovie, onInputChange); // Input change listener
utils.listen('click', button, showFirstMatch); // Button click listener
utils.listen('click', button, () => {
    handleInput();
    moviesAvailable.innerHTML = '';
});
