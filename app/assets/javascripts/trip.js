function Trip(city, rating, faveAttraction, review) {
  this.city = city
  this.rating = rating
  this.faveAttraction = faveAttraction
  this.review = review
}

$(function() {

  var userId = parseInt($(".js-next").attr("data-user-id"));
  var tripId = parseInt($(".js-next").attr("data-trip-id"));
  var index
  //let index = 0;
  //function getTripId() {
    var tripIdsArray = []


    $.get(`/users/${userId}/trips.json`, function(data) {

      tripIdsArray = data
    //  data.forEach(trip => tripIdsArray.push(trip.id))
      index = tripIdsArray.indexOf(tripId)


    });
//  }



function loadTrip(userId, nextTripId) {
  //debugger
  $.get(`/users/${userId}/trips/${nextTripId}.json`, function(data) {
    let trip = data;

    $(".tripCity").text(trip["city"]["name"]);
    $(".tripRating").text(`Rating: ${trip.rating}`);
    $(".tripMustSee").text(`Must See Attraction: ${trip.fave_attraction}`);
    $(".tripReview").text(`Review: ${trip.comment}`);
    // re-set the id to current on the link
    //$(".js-next").attr("data-user-id", trip["user"]["id"]);
    debugger
    $(".js-next").attr("data-trip-id", trip["id"]);

  })
}

$(".js-next").on("click", function(event) {


//  let nextTripId = tripIdsArray[index + 1]
debugger
//  let newIndex = tripIdsArray[index + 1]
  index += 1
  let nextTripId = tripIdsArray[index]

  event.preventDefault()
  loadTrip(userId, nextTripId)

 // data[2]["city"]["name"]

})

})
