$(document).ready(addFormEventHandler)

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
  $movieList.append(`<li class="collection-item">
  <img src="${moviePosterLink}" alt="${movieTitle}"></img>
  <h2>${movieTitle}</h2>
  </li>`)

}

// function renderMovies(data) {
//   let $movieList = $('.js--movie-list')
//   $movieList.html('')    // Clear HTML content of list
//
//   function renderMovie(movie) {
//     let posterLink = movie.Poster
//     let movieTitle = movie.Title
//     $movieList.append(`<li class="collection-item"><img src="${posterLink}" alt="${movieTitle}"></img></li>`)
//   }
//
//   data.Search.forEach(renderMovie)
//
// }
