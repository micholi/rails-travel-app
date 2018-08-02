function Country(id, name, cities) {
  this.id = id
  this.name = name
  this.cities = cities
}

// prototype to format comments to display on city show pages
Country.prototype.displayCities = function(countryId) {
  let countryString = `<ul class="no-underline">`
  this.cities.forEach(function(city) {
     countryString += `<li><a href="/cities/${city.id}" target="_blank"><span class="bold-text">${city.name}</span></a><p>Total Trips: ${city.trips.length}`
   })
   countryString += `</ul>`
   return countryString
}

Country.prototype.cityCount = function() {
  let cityCount = this.cities.length
  return cityCount
}

$(function() {
  var countriesArray = []

  $(".js-next-country").on("click", function(event) {
    countryId = parseInt($(".js-next-country").attr("data-country-id"))
    let op = "add"
    event.preventDefault()
    getNewCountryId(countryId, op)
  })

  $(".js-previous-country").on("click", function(event) {
    countryId = parseInt($(".js-previous-country").attr("data-country-id"))
    let op = "sub"
    event.preventDefault()
    getNewCountryId(countryId, op)
  })

  $(".js-display-cities").on("click", function(event) {
    countryId = parseInt($(".js-display-cities").attr("data-country-id"))
    $.get(`/countries/${countryId}.json`, function(data) {
      const countryObj = new Country(data.id, data.name, data.cities)
      let countryHtml = countryObj.displayCities(countryId)
      $("#js-country-cities").append(countryHtml)
    })
  event.preventDefault()
  })

  // gets index of countr and adds or subtracts 1 based on value passed from next/previous click
  // updated index is used to retrieve country id, which is then passed to loadCountry function
  function getNewCountryId(countryId, op) {
    $.get("/countries.json", function(data) {

      countriesArray = data
      let countryIndex = countriesArray.map(c => c.id).indexOf(countryId)
      if (op === "add") {
        countryIndex += 1
      } else if (op === "sub") {
        countryIndex -= 1
      }
      newCountryId = countriesArray[countryIndex]["id"]
      loadCountry(newCountryId)
    })
  }

  function nextCountryCheck(newCountryId) {
    if (newCountryId === countriesArray[countriesArray.length -1]["id"]) {
      $(".js-next-country").hide()
    } else {
      $(".js-next-country").show()
    }
  }

  function prevCountryCheck(newCountryId) {
    if (newCountryId === countriesArray[0]["id"]) {
      $(".js-previous-country").hide()
    } else {
      $(".js-previous-country").show()
    }
  }

  // renders updated info for next or previous country selected
  function loadCountry(newCountryId) {
    nextCountryCheck(newCountryId)
    prevCountryCheck(newCountryId)

    $("#js-country-cities").empty()
    $.get(`/countries/${newCountryId}.json`, function(data) {
      const country = new Country(data.id, data.name, data.cities)
      $(".countryName").text(country.name);
      $(".countryCityCount").text(country.cityCount());
      $(".js-previous-country").attr("data-country-id", country.id);
      $(".js-next-country").attr("data-country-id", country.id);
      $(".js-display-cities").attr("data-country-id", country.id);
    })
  }

})
