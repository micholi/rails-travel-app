function Trip(id, city, rating, fave_attraction, comment) {
  this.id = id
  this.city = city
  this.rating = rating
  this.fave_attraction = fave_attraction
  this.comment = comment
}

Trip.prototype.formatShowMore = function() {
  let moreTripString = `<p>${this.comment}</p><p><span class="bold-text">Rating: </span>${this.rating}</p><p><span class="bold-text">Must See Attraction: </span>${this.fave_attraction}</p>`;
  return moreTripString
}

Trip.prototype.cityCountry = function() {
  return this.city.name + ", " + this.city.country.name
}

$(function() {
  var tripId
  var tripUserId
  let tripIndex = 0
  let tripsArray = []

  //  $.get(`/users/${userId}/trips.json`, function(data) {
  //    tripsArray = data

    $(".js-next-trip").on("click", function(event) {

      tripId = parseInt($(".js-next-trip").attr("data-trip-id"))
      tripUserId = parseInt($(".js-next-trip").attr("data-user-id"))

      $.get(`/users/${tripUserId}/trips.json`, function(data) {
        tripsArray = data

      tripIndex = tripsArray.map(t => t.id).indexOf(tripId)
      newTripId = tripsArray[tripIndex + 1]["id"]
      event.preventDefault()
      loadTrip(tripUserId, newTripId)
      })

    })

    $(".js-previous-trip").on("click", function(event) {
      tripId = parseInt($(".js-previous-trip").attr("data-trip-id"))

      tripUserId = parseInt($(".js-previous-trip").attr("data-user-id"))

      $.get(`/users/${tripUserId}/trips.json`, function(data) {
        tripsArray = data

      tripIndex = tripsArray.map(t => t.id).indexOf(tripId)
      newTripId = tripsArray[tripIndex - 1]["id"]
      event.preventDefault()
      loadTrip(tripUserId, newTripId)

        })

    })

    $(".js-more").on("click", function(event) {
      let moreTripId = $(this).data("more-trip-id")
      showMoreTrip(moreTripId)
      event.preventDefault()
    })


  function showMoreTrip(moreTripId) {
  //  let moreTripId = $(this).data("more-trip-id");
    // trip is nested resource; /users/userId/ prepends url
    $.get(`trips/${moreTripId}.json`, function(data) {
      const moreTrip = new Trip(data.id, data.city, data.rating, data.fave_attraction, data.comment)
      let moreTripHtml = moreTrip.formatShowMore()
      $("#trip-" + moreTripId).html(moreTripHtml);
      $("#more-" + moreTripId).hide()
    })
  }

  function loadTrip(tripUserId, newTripId) {
    $.get(`/users/${tripUserId}/trips/${newTripId}.json`, function(data) {
      debugger
      let trip = data;
      const trip = new Trip(data.id, data.city, data.rating, data.fave_attraction, data.comment)
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
