function Trip(city, rating, fave_attraction, comment) {
  this.city = city
  this.rating = rating
  this.fave_attraction = fave_attraction
  this.comment = comment
}

Trip.prototype.cityCountry = function() {
  return this.city.name + ", " + this.city.country.name
}

$(function() {
  let userId = $(this).attr('data-user-id')
  let tripId = $(this).attr('data-trip-id')
  let currentIndex = 0
  let tripsArray = []


    $.get(`/users/${userId}/trips.json`, function(data) {

      tripsArray = data
      currentIndex = tripsArray.indexOf(tripId)

    });


    $(".js-next").on("click", function(event) {

      //debugger
      currentIndex += 1
      let nextTripId = tripsArray[currentIndex]["id"]


      event.preventDefault()
      loadTrip(userId, nextTripId)

     // data[2]["city"]["name"]
    })

    $(".js-previous").on("click", function(event) {

      currentIndex -= 1
      let nextTripId = tripsArray[currentIndex]["id"]

      event.preventDefault()
      loadTrip(userId, nextTripId)

     // data[2]["city"]["name"]
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




function loadTrip(userId, nextTripId) {
  //debugger
  $.get(`/users/${userId}/trips/${nextTripId}.json`, function(data) {
    //let trip = data;
    const trip = new Trip(data.city, data.rating, data.fave_attraction, data.comment)
    //$(".tripCity").text(trip["city"]["name"]);
    $(".tripCity").text(trip.cityCountry());
    $(".tripRating").text(`Rating: ${trip.rating}`);
    $(".tripMustSee").text(`Must See Attraction: ${trip.fave_attraction}`);
    $(".tripReview").text(`Review: ${trip.comment}`);
    // re-set the id to current on the link
    //$(".js-next").attr("data-user-id", trip["user"]["id"]);
    
    $(".js-previous").attr("data-trip-id", this.id);
    $(".js-next").attr("data-trip-id", this.id);

  })
}



})
