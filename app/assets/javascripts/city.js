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

// prototype formats html for new city to be appended to cities index page
City.prototype.getNewCity = function() {
  let newCityString
  if (this.name === undefined) {
    newCityString = "error"
  } else {
   newCityString = `<div id="index-city-${this.id}" class="underlined-list"><p class="no-underline bold-text"><a href="/cities/${this.id}">${this.name}</a></p><span>Total Trips: 0</span></div>`
}
  return newCityString
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
  let cityId
  let newCityId
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

  // ajax request to create new trip and append to index on user show page
  $('form#new-city-form').on("submit", function(event) {
    event.preventDefault();
    var $form = $(this)
    var action = $form.attr("action")
    var params = $form.serialize()
    $.ajax({
      url: action,
      data: params,
      datatype: "json",
      method: "POST"
    }).success(function(json) {
      const newCity = new City(json.id, json.name, json.country, json.trips);
      let newCityHtml = newCity.getNewCity()
      if (newCityHtml === "error") {
        location.reload()
      }
      $("#cities-index").append(newCityHtml)
      // reset form post-submit
      $("#new-city-form")[0].reset();
      // re-enable button auto-disabled by Rails
      var selectors = [Rails.linkDisableSelector, Rails.formEnableSelector].join(', ');
      $(selectors).each(function() {
        Rails.enableElement(this);
      })
    })
  })

})
