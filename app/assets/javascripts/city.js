function City(id, name, country, trips) {
  this.id = id
  this.name = name
  this.country = country
  this.trips = trips
}

// prototype to format comments to display on city show pages
City.prototype.displayComments = function(cityId) {
  let cityString = `<ul>`
  this.trips.forEach(function(trip) {
     let cityTripUser = trip.user.name;
     let cityComment = trip.comment;
     cityString += `<li>${cityComment}<br><span class="italic">-${cityTripUser}</span>`
   })
   cityString += `</ul>`
   return cityString
}

City.prototype.tripCount = function() {
  let count = this.trips.length
  return count
}

City.prototype.avgRating = function() {
  let ratings = []
  let trips = this.trips
  let average = 0
  trips.map(trip => ratings.push(trip.rating))
  let sum = ratings.reduce((a, b) => a + b, 0)
  if (sum > 0) {
    average = parseFloat(sum / ratings.length).toFixed(1)
  } else average = "Cannot calculate average for cities with 0 trips"
  return average
}

$(function() {
  var cityId
  var newCityId
  let cityIndex = 0
  let citiesArray = []

  $(".js-next-city").on("click", function(event) {
    cityId = parseInt($(".js-next-city").attr("data-city-id"))
    op = "add"
    event.preventDefault()
    getNewCityId(cityId, op)
  })

  $(".js-previous-city").on("click", function(event) {
    cityId = parseInt($(".js-previous-city").attr("data-city-id"))
    op = "sub"
    event.preventDefault()
    getNewCityId(cityId, op)
  })

  $(".js-display-comments").on("click", function(event) {
    cityId = parseInt($(".js-display-comments").attr("data-city-id"))
    $.get(`/cities/${cityId}.json`, function(data) {
      const cityTrips = new City(data.id, data.name, data.country, data.trips)
      let cityHtml = cityTrips.displayComments(cityId)
      $("#js-city-comments").append(cityHtml)
    })
  event.preventDefault()
  })

  // gets index of city and adds or subtracts 1 based on value passed from next/previous click
  // updated index is used to retrieve city id, which is then passed to loadCity function
  function getNewCityId(cityId, op) {
    $.get("/cities.json", function(data) {
      citiesArray = data
      cityIndex = citiesArray.map(c => c.id).indexOf(cityId)
      if (op === "add") {
        cityIndex += 1
      } else if (op === "sub") {
        cityIndex -= 1
      }
      newCityId = citiesArray[cityIndex]["id"]
      loadCity(newCityId)
    })
  }

  function nextCityCheck() {
    if (newCityId === citiesArray[citiesArray.length -1]["id"]) {
      $(".js-next-city").hide()
    } else {
      $(".js-next-city").show()
    }
  }

  function prevCityCheck() {
    if (newCityId === citiesArray[0]["id"]) {
      $(".js-previous-city").hide()
    } else {
      $(".js-previous-city").show()
    }
  }

  // renders updated info for next or previous city selected
  function loadCity(newCityId) {
    nextCityCheck()
    prevCityCheck()

    $("#js-city-comments").empty()
    $.get(`/cities/${newCityId}.json`, function(data) {
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
