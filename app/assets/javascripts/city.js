function City(name, country) {
  this.name = name
  this.country = country
}

City.prototype.tripCount = function() {
  return this.trips.count
}

City.prototype.avgRating = function() {
  return this.avg_rating
}

$(function() {
  let cityId = $(this).attr('data-city-id')
  var currentIndex = 0
  var citiesArray = []

    $.get("/cities.json", function(data) {

      citiesArray = data
      currentIndex = citiesArray.indexOf(cityId)
    });

function loadCity(nextCityId) {
  //debugger

  $.get(`/cities/${nextCityId}.json`, function(data) {

    const city = new City(data.name, data.country)

    $(".cityName").text(city.name);
    $(".countryName").text(city.country.name);
    $(".cityTripCount").text(city.tripCount());
    $(".cityAvgRating").text(city.avgRating());
    // country

    $(".js-previous-city").attr("data-city-id", this.id);
    $(".js-next-city").attr("data-city-id", this.id);

  })
}

$(".js-next-city").on("click", function(event) {
//debugger
  currentIndex += 1
  let nextCityId = citiesArray[currentIndex]["id"]

  event.preventDefault()
  loadCity(nextCityId)

})

$(".js-previous-city").on("click", function(event) {

  currentIndex -= 1
  let nextCityId = citiesArray[currentIndex]["id"]

  event.preventDefault()
  loadCity(nextCityId)


})

})
