$(document).ready(addFormEventHandler)

var movieStuff = new Array

function addFormEventHandler() {
  $('form#movie-form').submit(handleFormSubmit)
}

function handleFormSubmit(event) {
  event.preventDefault()
  clearLists()
  findMovies()
  setTimeout(addInfoEventHandlers,2000)
}

function clearLists() {
  let $movieList = $('.js--movie-list')
  $movieList.html('')
  movieStuff = []
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
  renderMovies(movie)
}

function renderMovies(movie) {
  let $movieList = $('.js--movie-list')

  $movieList.append(`<li class="collection-item">
  <p>${movie.Title}</p>
  </li>`)
}

function addInfoEventHandlers() {
  $('.collection-item').each(function(i, el) {
    $(this).click(function(){
      let movie = movieStuff[i]
      $('#movie-info').html('')
      $('#movie-info').append(`<div class="center"><img class="circle responsive-img" src="${movie.PosterLink}" alt="${movie.Title}"></img></div>`)
      $('#movie-info').append(`<p class="col s12 center">${movie.Plot}</p><h4 class="center">Rotten Tomatoes Score:</h4>
      <div class="preloader-wrapper small active">
    <div class="spinner-layer spinner-blue-only">
    <h1 class="center">${movie.tomatoMeter}</h1>
      <div class="circle-clipper left">
        <div class="circle"></div>
      </div><div class="gap-patch">
        <div class="circle"></div>
      </div><div class="circle-clipper right">
        <div class="circle"></div>
      </div>
    </div>
  </div>`)
    })
  })

}

function showMovieInfo(event) {
  $('#movie-info').append('<div>Hi!</div>')
}
