function UserTrip(data) {
  this.trips = data
}

/* prototype formats html to display trips index on current user show page */
UserTrip.prototype.formatUserIndex = function(userId) {
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
UserTrip.prototype.formatTravelerTrips = function() {
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
    let userId = $(this).data("user-id");
    $.get(`/users/${userId}/trips.json`, function(data) {
      const userTrips = new UserTrip(data);
      let userShowHtml = userTrips.formatUserIndex(userId)
      $("#view-trips").html(userShowHtml);
    })
      event.preventDefault()
  })

  // From Assessment:
  // View trips sorted alphabetically by city
  $(".js-sort-trips").on("click", function(event) {
    let userId = $(this).data("user-id");
    $.get(`/users/${userId}/trips.json`, function(data) {
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

      const userTrips = new UserTrip(data);
      let sortedHtml = userTrips.formatUserIndex()
      $("#view-trips").html(sortedHtml)
    })
    event.preventDefault()
  })

  // invokes formatTravelerTrips prototype and appends html for that traveler(aka user) on Travelers index page
  $(".js-display-traveler-trips").one("click", function(event) {
    let travelerId = $(this).data("traveler-id");
    $.get(`/users/${travelerId}/trips.json`, function(data) {
      const travelerTrips = new UserTrip(data);
      let travelerTripsHtml = travelerTrips.formatTravelerTrips()
      $("#traveler-" + travelerId).append(travelerTripsHtml)
    })
    event.preventDefault()
  })

})
