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
  //var average = ratings.reduce((p,c,_,a) => p + c/a.length,0);
  let sum = ratings.reduce((a, b) => a + b, 0)
  let average = parseFloat(sum / ratings.length).toFixed(1)
  return average
}

City.prototype.getComments = function() {
  //let comments = []
  let cityTrips = this.trips
  debugger
  //cityTrips.map(trip => comments.push(trip.comment))
  //comments.forEach(comment => $(".city-comments").append(`<p>comment</p>`))

  //cityTrips.forEach(trip => $("#js-city-comments").append(`<p>${trip.user.name} says '${trip.comment}'</p>`))
  cityTrips.forEach(function(trip) {
    let cityTripUser = trip.user.name;
    let cityComment = trip.comment;
    $("#js-city-comments").append(`<p>${cityTripUser} says ${cityComment}</p>`);
  })
}



$(function() {
  let cityId = $(this).attr('data-city-id')
  var currentIndex = 0
  var citiesArray = []

  $(".js-next").on("click", function(event) {
    currentIndex += 1
    let nextCityId = citiesArray[currentIndex]["id"]

    event.preventDefault()
    loadCity(nextCityId)
  })

  $(".js-previous").on("click", function(event) {
    currentIndex -= 1
    let nextCityId = citiesArray[currentIndex]["id"]
    event.preventDefault()
    loadCity(nextCityId)
  })

//    $(".js-more").on("click", function(event) {
//      var testCityId = $(this).data("id");
//      $.get("/cities/" + testCityId + ".json", function(data) {
//        var city = data;
//        var cityText = city["city_info"];
//        event.preventDefault()
//        $("#city-" + id).html(cityText);
//      })
//    })

    $.get("/cities.json", function(data) {

      citiesArray = data
    //  currentIndex = citiesArray.indexOf(cityId)
      currentIndex = citiesArray.indexOf(cityId)
    });

function loadCity(nextCityId) {

  $.get(`/cities/${nextCityId}.json`, function(data) {

    const city = new City(data.id, data.name, data.country, data.trips)

    //debugger

    $(".cityName").text(city.name);
    $(".countryName").text(city.country.name);
    $(".cityTripCount").text(city.tripCount());
    $(".cityAvgRating").text(city.avgRating());

    $(".js-previous-city").attr("data-city-id", this.id);
    $(".js-next-city").attr("data-city-id", this.id);
    $(".js-display-comments").attr("data-city-id", this.id);
  })
}

// testing
$(".js-display-comments").on("click", function(event) {

  let myCityId = parseInt($(".js-display-comments").attr("data-city-id"));
  $.get(`/cities/${myCityId}.json`, function(data) {
    const newCity = new City(data)
    event.preventDefault()
    newCity.getComments()
  })
})



})
