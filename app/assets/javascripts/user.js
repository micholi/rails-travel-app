function User(data) {
  this.trips = data
}

/* prototype formats html to display trips index on current user show page */
User.prototype.formatUserIndex = function(userId) {
  let tripsHtml = `<div id="my-trips-index"><p class="blue-bold underlined-list">Trip List</p>`
  this.trips.forEach(function(trip) {
    let userTripId = trip.id;
    let city = trip.city.name;
    let comment = trip.comment
    tripsHtml +=`<div id="index-trip-${userTripId}" class="bottom-border"><p class="no-underline bold-text"> <a href="/users/${userId}/trips/${userTripId}">${city}</a></p><p>${comment}</p></div>`
  })
  tripsHtml += '</div>'
  return tripsHtml
}

// prototype formats html for rendering trip info on travelers (aka users) index page
User.prototype.formatTravelerTrips = function() {
  let travelerString = `<ul>`
  if (this.trips.length === 0) {
    travelerString += `<li>This user hasn't added any trips yet.</li></ul>`
  } else {
  this.trips.forEach(function(trip) {
    travelerString += `<li><span class="bold-text">${trip.city.name} - </span>${trip.fave_attraction}</li>`
  })
  travelerString += `</ul>`
}
  return travelerString
}

// on first click, invokes formatUserIndex prototype and appends index of all user's trips on show page
$(function() {
  $(".js-load-trips").on("click", function(event) {
    $("#view-trips").empty();
    let userId = $(this).data("user-id");
    $.get(`/users/${userId}/trips.json`, function(data) {
      const user = new User(data);
      let userIndexHtml = user.formatUserIndex(userId)
      $("#view-trips").append(userIndexHtml);
    })
      event.preventDefault()
  })

  // From Assessment:
  // View trips sorted alphabetically by city
  $(".js-sort-trips").on("click", function(event) {
    $("#view-trips").empty()
    let userId = $(this).data("user-id");
    $.get(`/users/${userId}/trips.json`, function(data) {
      // sort json data alphabetically by city
      data.sort(function(a, b) {
        var nameA = a.city.name.toUpperCase();
        var nameB = b.city.name.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });

      const newUser = new User(data);
      let sortedTripsHtml = newUser.formatUserIndex()
      $("#view-trips").append(sortedTripsHtml)
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
