$(document).ready(addFormEventHandler)

var movieStuff = new Array

function addFormEventHandler() {
  $('form#movie-form').submit(handleFormSubmit)
}

function handleFormSubmit(event) {
  event.preventDefault()
  clearLists()
  findMovies()
  // setTimeout(addInfoEventHandlers, 8000)
}

function clearLists() {
  let $movieList = $('.js--movie-list')
  $movieList.html('')
  movieStuff = []
}

function findMovies() {
  Materialize.toast('Fetching Movies!', 2000)
  const URL = 'http://www.omdbapi.com/?type=movie&page=1&'
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
      success: storeAndRenderMovieInfo
    })
  }
  data.Search.forEach(findMovieInfo)
}

function storeAndRenderMovieInfo(data) {
  movie = {
    PosterLink: data.Poster,
    Title: data.Title,
    Plot: data.Plot,
    tomatoMeter: data.tomatoMeter
  }
  movieStuff.push(movie)
  renderMovie(movie)
  addInfoEventHandler(movie)
}

function renderMovie(movie) {    //  Called by storeAndRenderMovieInfo
  let $movieList = $('.js--movie-list')

  $movieList.append(`<li class="collection-item">
  <p>${movie.Title}</p>
  </li>`)
}

function addInfoEventHandler(movie) {   //  Called by storeAndRenderMovieInfo, when renderMovie finishes
  $('li:last').click(function(){
    $('#movie-info').html('')
    $('#movie-info').append(`
      <div class="center"><img class="responsive-img" src="${movie.PosterLink}" alt="${movie.Title}" style="padding-top: 48px; max-height: 600px; width: auto;"></img></div>
      <p class="col s12 center">${movie.Plot}</p>
      <div class="preloader-wrapper small active right row">
        <h1 class="spinner-layer">${movie.tomatoMeter}</h1>
      </div>
      <h5 class="center" style="padding-bottom: 48px;">Rotten Tomatoes Score:</h5>
    `)
    Materialize.fadeInImage('.responsive-img')
  })
  doneMessage()
}

function doneMessage() {
  if ($('li:nth-child(10)').length == 1) {
    Materialize.toast('Done!', 2000)
  }
}
