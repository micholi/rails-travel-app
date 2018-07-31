function User(data) {
  this.trips = data
}

/* prototype formats html to display trips index on current user show page */
User.prototype.formatUserIndex = function(currentUserId) {
  let tripsHtml = `<div id="my-trips-index"><p class="blue-bold">Trip List</p>`
  this.trips.forEach(function(trip) {
    let userTripId = trip.id;
    let city = trip.city.name;
    let country = trip.city.country.name
    let comment = trip.comment
    tripsHtml +=`<div id="index-trip-${userTripId}" class="bottom-border"><p class="no-underline bold-text"> <a href="/users/${currentUserId}/trips/${userTripId}">${city}</a></p><p>${comment}</p></div>`
  })
  tripsHtml += '</div>'
  return tripsHtml
}

// prototype formats html for rendering trip info on travelers (aka users) index page
User.prototype.formatTravelerTrips = function() {
  let travelerString = `<ul>`
  this.trips.forEach(function(trip) {
    travelerString += `<li>${trip.city.name}</li>`
  })
  travelerString += `</ul>`
  return travelerString
}

// on first click, invokes formatUserIndex prototype and appends index of all user's trips on show page
$(function() {
  $(".js-load-trips").one("click", function(event) {
    let currentUserId = $(this).data("user-id");
    $.get(`/users/${currentUserId}/trips.json`, function(data) {
      const currentUser = new User(data);
      let userIndexHtml = currentUser.formatUserIndex(currentUserId)
      $("#my-trips").append(userIndexHtml);
    })
      event.preventDefault()
  })

  // invokes formatTravelerTrips prototype and appends html for that traveler(aka user) on Travelers index page
  $(".js-display-traveler-trips").one("click", function(event) {
    let travelerId = $(this).data("traveler-id");
    $.get(`/users/${travelerId}/trips.json`, function(data) {
      const traveler = new User(data);
      let travelerHtml = traveler.formatTravelerTrips()
      $("#traveler-" + travelerId).append(travelerHtml)
    })
    event.preventDefault()
  })

})
