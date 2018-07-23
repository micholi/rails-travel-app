function User(data) {
  this.trips = data
}

// prototype formats html for rendering current user's index on their show page
User.prototype.formatUserIndex = function(currentUserId) {
  let tripsHtml = `<br><br><table><thead><tr><th>City</th><th>Rating</th><th>Must See Attraction</th></tr></thead><tbody id="trips-table">`
  this.trips.forEach(function(trip) {
    let userTripId = trip.id;
    let city = trip.city.name;
    let rating = trip.rating
    let fave = trip.fave_attraction;
    tripsHtml +=`<tr class="border-bottom"><td class="no-underline"><a href="/users/${currentUserId}/trips/${userTripId}">${city}</a></td><td>${rating}</td><td>${fave}</td></tr>`
  })
  tripsHtml += `</tbody></table>`
  return tripsHtml
}

// prototype formats html for rendering trip info on Travelers (aka Users) index page
User.prototype.formatTravelerTrips = function(travelerId) {
  let travelerString = `<ul>`
  this.trips.forEach(function(trip) {
    let city = trip.city.name
    let fave = trip.fave_attraction
    travelerString += `<li><span class="bold-text">${city}</span> - ${fave}</li>`
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
      let travelerHtml = traveler.formatTravelerTrips(travelerId)
      $("#traveler-" + travelerId).append(travelerHtml)
    })
    event.preventDefault()
  })

})
