$(document).ready(addFormEventHandler)

var movieStuff = new Array

function addFormEventHandler() {
  $('form#movie-form').submit(handleFormSubmit)
}

function handleFormSubmit(event) {
  event.preventDefault()
  clearList()
  findMovies()
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
      success: renderMovies
    })

  }

  data.Search.forEach(findMovieInfo)

}

function renderMovies(data) {
  let $movieList = $('.js--movie-list')

  let moviePosterLink = data.Poster
  let movieTitle = data.Title
  let moviePlot = data.Plot
  let movieTomato = data.tomatoMeter
  $movieList.append(`<li class="collection-item" onclick="showMovieInfo()" data-plot='${moviePlot}'>
  <img src="${moviePosterLink}" alt="${movieTitle}"></img>
  <h2>${movieTitle}</h2>
  </li>`)

  // $('.collection-item').on("click", showMovieInfo)

}

function showMovieInfo(title,plot) {
  
  $('#movie-info').append(`<h1>${title}</h1><h2>${plot}</h2>`)
}
