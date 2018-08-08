function Trip(data) {
  this.id = data.id
  this.user = data.user
  this.city = data.city
  this.rating = data.rating
  this.fave_attraction = data.fave_attraction
  this.comment = data.comment
}

Trip.prototype.cityCountry = function() {
  return this.city.name + ", " + this.city.country.name
}

/* ITERATE OVER TRIPS AND FILTER BASED ON FIRST LETTER
function filterFirstLetter(tripsArray, letter) {
  var filteredCities = tripsArray.filter(function(trip) {
    return trip.city.name[0] === letter;
  });
  return filteredCities
}
*/

$(function() {
  var tripsArray = []

  $(".js-next-trip").on("click", function(event) {
    let tripUserId = parseInt($(".js-next-trip").attr("data-user-id"))
    let tripId = parseInt($(".js-next-trip").attr("data-trip-id"))
    let op = "add"
    event.preventDefault()
    getNewTripId(tripUserId, tripId, op)
    })

  $(".js-previous-trip").on("click", function(event) {
    let tripUserId = parseInt($(".js-previous-trip").attr("data-user-id"))
    let tripId = parseInt($(".js-previous-trip").attr("data-trip-id"))
    let op = "sub"
    event.preventDefault()
    getNewTripId(tripUserId, tripId, op)
    })

  // gets index of trip and adds or subtracts 1 based on value passed from next/previous click
  // updated index is used to retrieve trip id, which is then passed to loadTrip function
  function getNewTripId(tripUserId, tripId, op) {
    $.get(`/users/${tripUserId}/trips.json`, function(data) {
      tripsArray = data
      let tripIndex = tripsArray.map(t => t.id).indexOf(tripId)
      if (op === "add") {
        tripIndex += 1
      } else if (op === "sub") {
        tripIndex -= 1
      }
      newTripId = tripsArray[tripIndex]["id"]
      loadTrip(tripUserId, newTripId)
    })
  }

  function nextTripCheck(newTripId) {
    if (newTripId === tripsArray[tripsArray.length -1]["id"]) {
      $(".js-next-trip").hide()
    } else {
      $(".js-next-trip").show()
    }
  }

  function prevTripCheck(newTripId) {
    if (newTripId === tripsArray[0]["id"]) {
      $(".js-previous-trip").hide()
    } else {
      $(".js-previous-trip").show()
    }
  }

  // renders updated info for next or previous trip selected
  function loadTrip(tripUserId, newTripId) {
    nextTripCheck(newTripId)
    prevTripCheck(newTripId)

    $.get(`/users/${tripUserId}/trips/${newTripId}.json`, function(data) {
      const trip = new Trip(data)
      $(".tripCity").text(trip.cityCountry());
      $(".tripRating").text(trip.rating);
      $(".tripMustSee").text(trip.fave_attraction);
      $(".tripReview").text(trip.comment);
      // re-set the id to current on the link
      $(".js-previous-trip").attr("data-trip-id", trip.id);
      $(".js-next-trip").attr("data-trip-id", trip.id);
      // updates edit and delete buttons with new trip id
      $("a#edit-button").attr("href", `/users/${tripUserId}/trips/${newTripId}/edit`);
      $("a#delete-button").attr("href", `/users/${tripUserId}/trips/${newTripId}`);
    })
  }

})
