function City(id, name, country, trips) {
  this.id = id
  this.name = name
  this.country = country
  this.trips = trips
}

City.prototype.tripCount = function() {
  debugger
  var cityTrips = this.trips
  //var cityTrips = []
  //cityTrips = this.length
  return cityTrips.length
//})
}



//City.prototype.avgRating = function() {
//  return this.avg_rating
//}

$(function() {
  let cityId = $(this).attr('data-city-id')
  var currentIndex = 0
  var citiesArray = []

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


    $(".js-more").on("click", function(event) {
      var testCityId = $(this).data("id");
      $.get("/cities/" + testCityId + ".json", function(data) {
        var city = data;
        var cityText = city["city_info"];
        event.preventDefault()
        $("#city-" + id).html(cityText);
      })
    })





    $.get("/cities.json", function(data) {

      citiesArray = data
    //  currentIndex = citiesArray.indexOf(cityId)
      currentIndex = citiesArray.indexOf(cityId)
    });

function loadCity(nextCityId) {
  //debugger

  $.get(`/cities/${nextCityId}.json`, function(data) {

    const city = new City(data.id, data.name, data.country, data.trips)

    //debugger

    $(".cityName").text(city.name);
    $(".countryName").text(city.country.name);

    $(".cityTripCount").text(city.trips.length);
    //$(".cityAvgRating").text(city.avgRating());
    // country

    $(".js-previous-city").attr("data-city-id", this.id);
    $(".js-next-city").attr("data-city-id", this.id);

  })
}



})
