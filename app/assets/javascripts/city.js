function City(id, name, country) {
  this.id = id
  this.name = name
  this.country = country
}

//City.prototype.fetchTrips = function() {
  //var cityTrips = []
    //$.get(`/cities/${this.id}/trips.json`, function(data) {
      //cityTrips = data
      //return cityTrips
    //});
//}

City.prototype.tripCount = function(currentIndex) {
  //let testIndex = 0
  var cityTrips = []
//  $.get(`/cities/${this.id}/trips.json`, function(data) {
  $.get(`/cities.json`, function(data) {
  //trips = this.fetchTrips()
  cityTrips = data
  return cityTrips[currentIndex].trips.length
//return count
  //return cityTrips.size

})
}



//City.prototype.avgRating = function() {
//  return this.avg_rating
//}

$(function() {
  let cityId = $(this).attr('data-city-id')
  var currentIndex = 0
  var citiesArray = []


    $.get("/cities.json", function(data) {

      citiesArray = data
    //  currentIndex = citiesArray.indexOf(cityId)
      currentIndex = citiesArray.indexOf(cityId)
    });

function loadCity(nextCityId) {
  //debugger

  $.get(`/cities/${nextCityId}.json`, function(data) {

    const city = new City(data.id, data.name, data.country)

    //debugger

    $(".cityName").text(city.name);
    $(".countryName").text(city.country.name);

    $(".cityTripCount").text(city.tripCount(currentIndex));
    //$(".cityAvgRating").text(city.avgRating());
    // country

    $(".js-previous-city").attr("data-city-id", this.id);
    $(".js-next-city").attr("data-city-id", this.id);

  })
}

$(".js-next-city").on("click", function(event) {

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
