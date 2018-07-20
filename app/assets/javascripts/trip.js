function Trip(id, city, rating, fave_attraction, comment) {
  this.id = id
  this.city = city
  this.rating = rating
  this.fave_attraction = fave_attraction
  this.comment = comment
}

Trip.prototype.cityCountry = function() {
  return this.city.name + ", " + this.city.country.name
}

$(function() {
  var tripId
  var userId
  let tripIndex = 0
  let tripsArray = []

  //  $.get(`/users/${userId}/trips.json`, function(data) {
  //    tripsArray = data

    $(".js-next-trip").on("click", function(event) {

      tripId = parseInt($(".js-next-trip").attr("data-trip-id"))
      userId = parseInt($(".js-next-trip").attr("data-user-id"))

      $.get(`/users/${userId}/trips.json`, function(data) {
        tripsArray = data


      tripIndex = tripsArray.map(t => t.id).indexOf(tripId)
      newTripId = tripsArray[tripIndex + 1]["id"]
      event.preventDefault()
      loadTrip(userId, newTripId)

      })

    })

    $(".js-previous-trip").on("click", function(event) {
      tripId = parseInt($(".js-previous-trip").attr("data-trip-id"))

      userId = parseInt($(".js-previous-trip").attr("data-user-id"))

      $.get(`/users/${userId}/trips.json`, function(data) {
        tripsArray = data


      tripIndex = tripsArray.map(t => t.id).indexOf(tripId)
      newTripId = tripsArray[tripIndex - 1]["id"]
      event.preventDefault()
      loadTrip(userId, newTripId)

        })

    })

      $(".js-more").on("click", function() {
        let moreTripId = $(this).data("id");
        $.get("trips/" + moreTripId + ".json", function(data) {
          let trip = data;
          var reviewText = "<p>" + trip["comment"] + "</p><p>" + "Rating: " + trip["rating"] + "</p><p>" + "Must See Attraction: " + trip["fave_attraction"] + "</p>";
          $("#trip-" + moreTripId).html(reviewText);
          $("#more-" + moreTripId).hide()
        })
      })
//    });



function loadTrip(userId, newTripId) {
  debugger
  $.get(`/users/${userId}/trips/${newTripId}.json`, function(data) {
    //let trip = data;
    const trip = new Trip(data.id, data.city, data.rating, data.fave_attraction, data.comment)
    $(".tripCity").text(trip.cityCountry());
    $(".tripRating").text(trip.rating);
    $(".tripMustSee").text(trip.fave_attraction);
    $(".tripReview").text(trip.comment);
    // re-set the id to current on the link
    //$(".js-next").attr("data-user-id", trip["user"]["id"]);

    $(".js-previous-trip").attr("data-trip-id", trip.id);
    $(".js-next-trip").attr("data-trip-id", trip.id);

  })
}



})
