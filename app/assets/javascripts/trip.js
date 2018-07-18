function Trip(city, user, rating, faveAttraction, review) {
  this.city = city
  this.user = user
  this.rating = rating
  this.faveAttraction = faveAttraction
  this.review = review
}

Trip.prototype.cityCountry = function() {
  return this.city.name + ", " + this.city.country.name
}

$(function() {

  let userId = $(this).attr('data-user-id')
  let tripId = $(this).attr('data-trip-id')
  //var userId = parseInt($(".js-next").attr("data-user-id"));
  //var tripId = parseInt($(".js-next").attr("data-trip-id"));
  var currentIndex = 0
  //let index = 0;
  //function getTripId() {
  var tripsArray = []

    $.get(`/users/${userId}/trips.json`, function(data) {

      tripsArray = data
    //  data.forEach(trip => tripIdsArray.push(trip.id))
      currentIndex = tripIdsArray.indexOf(tripId)


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
    $(".js-next").attr("data-trip-id", this.id);

  })
}

$(".js-next").on("click", function(event) {


//  let nextTripId = tripIdsArray[index + 1]
debugger
//  let newIndex = tripIdsArray[index + 1]
  currentIndex += 1
  let nextTripId = tripsArray[currentIndex]["id"]

  event.preventDefault()
  loadTrip(userId, nextTripId)

 // data[2]["city"]["name"]

})

})
