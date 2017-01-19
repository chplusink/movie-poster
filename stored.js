$(document).ready(addFormEventHandler)

var movieStuff = new Array

function addFormEventHandler() {
  $('form#movie-form').submit(handleFormSubmit)
}

function handleFormSubmit(event) {
  event.preventDefault()
  clearList()
  findMovies()
  debugger
}

function clearList() {
  let $movieList = $('.js--movie-list')
  $movieList.html('')
}

function findMovies() {
  const URL = 'http://www.omdbapi.com/?type=movie&'
  let moviesUrl = URL + 's=' + $('#query').val().trim().split(' ').join('+')
  $.ajax({
    url: moviesUrl,
    success: findMoviesInfo
  })
}

function findMoviesInfo(data) {
  const baseUrl = 'http://www.omdbapi.com/?tomatoes=true&'
  function findMovieInfo(movie) {
    let movieQueryUrl = baseUrl + 'i=' + movie.imdbID
    $.ajax({
      url: movieQueryUrl,
      success: storeMovieInfo
    })
  }
  data.Search.forEach(findMovieInfo)
  movieStuff.forEach(renderMovies)

}

function storeMovieInfo(data) {
  movieStuff.push({
    moviePosterLink: data.Poster,
    movieTitle: data.Title,
    moviePlot: data.Plot,
    movieTomato: data.tomatoMeter
  })

  // renderMovies here
  // create event handle either or outside ()
}

function renderMovies(movie) {
  let $movieList = $('.js--movie-list')

  $movieList.append(`<li class="collection-item">
  <img src="${movie.moviePosterLink}" alt="${movie.movieTitle}"></img>
  <h2>${movie.movieTitle}</h2>
  </li>`)
}

function showMovieInfo(event) {
  $('#movie-info').append('<div>Hi!</div>')
}
