function City(id, name, country, trips) {
  this.id = id
  this.name = name
  this.country = country
  this.trips = trips
}

City.prototype.tripCount = function() {
  let count = this.trips.length
  return count
}

City.prototype.avgRating = function() {
  let ratings = []
  let trips = this.trips
  trips.map(trip => ratings.push(trip.rating))
  let sum = ratings.reduce((a, b) => a + b, 0)
  let average = parseFloat(sum / ratings.length).toFixed(1)
  return average
}

$(function() {
  //let cityId = $(this).attr('data-city-id')
  var cityId
  var newCityId
  let cityIndex = 0
  let citiesArray = []

  $.get("/cities.json", function(data) {
    citiesArray = data

  $(".js-next-city").on("click", function(event) {
    cityId = parseInt($(".js-next-city").attr("data-city-id"))
    cityIndex = citiesArray.map(c => c.id).indexOf(cityId)
    newCityId = citiesArray[cityIndex + 1]["id"]
    event.preventDefault()
    loadCity(newCityId)
  })

  $(".js-previous-city").on("click", function(event) {
    cityId = parseInt($(".js-previous-city").attr("data-city-id"))
    cityIndex = citiesArray.map(c => c.id).indexOf(cityId)
    newCityId = citiesArray[cityIndex - 1]["id"]
    event.preventDefault()
    loadCity(newCityId)
  })

  $(".js-display-comments").on("click", function(event) {
  //  debugger
    cityId = parseInt($(".js-display-comments").attr("data-city-id"))
    event.preventDefault()
    displayComments(cityId)
  })
})

  function displayComments(cityId) {
    $.get(`/cities/${cityId}.json`, function(data) {
      const cityObj = new City(data)
      let cityTrips = data.trips
      cityTrips.forEach(function(trip) {
         let cityTripUser = trip.user.name;
         let cityComment = trip.comment;
         $("#js-city-comments").append(`<p>${cityTripUser}: ${cityComment}</p>`);
       })
     })
  }

  function loadCity(newCityId) {
    $("#js-city-comments").empty()
    $.get(`/cities/${newCityId}.json`, function(data) {
      $("#js-city-comments").empty()
      const city = new City(data.id, data.name, data.country, data.trips)
      $(".cityName").text(city.name);
      $(".countryName").text(city.country.name);
      $(".cityTripCount").text(city.tripCount());
      $(".cityAvgRating").text(city.avgRating());
      $(".js-previous-city").attr("data-city-id", city.id);
      $(".js-next-city").attr("data-city-id", city.id);
      $(".js-display-comments").attr("data-city-id", city.id);
    })
  }

})
