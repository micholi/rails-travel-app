function Trip(id, user, city, rating, fave_attraction, comment) {
  this.id = id
  this.user = user
  this.city = city
  this.rating = rating
  this.fave_attraction = fave_attraction
  this.comment = comment
}

Trip.prototype.cityCountry = function() {
  return this.city.name + ", " + this.city.country.name
}

$(function() {
  let tripUserId
  let tripId
  let op
  let tripIndex = 0
  let tripsArray = []

  $(".js-next-trip").on("click", function(event) {
    tripUserId = parseInt($(".js-next-trip").attr("data-user-id"))
    tripId = parseInt($(".js-next-trip").attr("data-trip-id"))
    op = "add"
    event.preventDefault()
    getNewTripId(tripUserId, tripId, op)
    })

  $(".js-previous-trip").on("click", function(event) {
    tripUserId = parseInt($(".js-previous-trip").attr("data-user-id"))
    tripId = parseInt($(".js-previous-trip").attr("data-trip-id"))
    op = "sub"
    event.preventDefault()
    getNewTripId(tripUserId, tripId, op)
    })

  // gets index of trip and adds or subtracts 1 based on value passed from next/previous click
  // updated index is used to retrieve trip id, which is then passed to loadTrip function
  function getNewTripId(tripUserId, tripId, op) {
    $.get(`/users/${tripUserId}/trips.json`, function(data) {
      tripsArray = data
      tripIndex = tripsArray.map(t => t.id).indexOf(tripId)
      if (op === "add") {
        tripIndex += 1
      } else if (op === "sub") {
        tripIndex -= 1
      }
      newTripId = tripsArray[tripIndex]["id"]
      loadTrip(tripUserId, newTripId)
    })
  }

  function nextTripCheck() {
    if (newTripId === tripsArray[tripsArray.length -1]["id"]) {
      $(".js-next-trip").hide()
    } else {
      $(".js-next-trip").show()
    }
  }

  function prevTripCheck() {
    if (newTripId === tripsArray[0]["id"]) {
      $(".js-previous-trip").hide()
    } else {
      $(".js-previous-trip").show()
    }
  }

  // renders updated info for next or previous trip selected
  function loadTrip(tripUserId, newTripId) {
    nextTripCheck()
    prevTripCheck()

    $.get(`/users/${tripUserId}/trips/${newTripId}.json`, function(data) {
      const trip = new Trip(data.id, data.user, data.city, data.rating, data.fave_attraction, data.comment)
      $(".tripCity").text(trip.cityCountry());
      $(".tripRating").text(trip.rating);
      $(".tripMustSee").text(trip.fave_attraction);
      $(".tripReview").text(trip.comment);
      // re-set the id to current on the link
      $(".js-previous-trip").attr("data-trip-id", trip.id);
      $(".js-next-trip").attr("data-trip-id", trip.id);
    })
  }

})
