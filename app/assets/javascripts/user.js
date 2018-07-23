function User(data) {
  this.trips = data
}

// prototype formats html for rendering current user's index on their show page
User.prototype.formatUserTripsIndex = function(currentUserId) {
  btn = document.getElementById("btn");
  let tripsHtml = `<br><br><table><thead><tr><th>City</th><th>Must See Attraction</th></tr></thead><tbody>`
  this.trips.forEach(function(trip) {
    let userTripId = trip.id;
    let city = trip.city.name;
    let fave = trip.fave_attraction;
    tripsHtml +=`<tr class="border-bottom"><td class="no-underline"><a href="/users/${currentUserId}/trips/${userTripId}">${city}</a></td><td>${fave}</td></tr>`
  })
  tripsHtml += `</tbody></table>`
  btn.innerHTML = "Hide Trips"
  return tripsHtml
}

// prototype formats html for rendering trip info on Travelers (aka Users) index page
User.prototype.getTravelerTrips = function(travelerId) {
  $("#link-trav-" + travelerId).hide()
  let travelerString = `<p>Cities Visited + Recommended Attractions:</p><ul>`
  this.trips.forEach(function(trip) {
    let city = trip.city.name
    let fave = trip.fave_attraction
    travelerString += `<li><span class="bold-text">${city}</span> - ${fave}</li>`
  })
  travelerString += `</ul>`
  return travelerString
}

$(function() {
  $(".js-load-trips").on("click", function(event) {
    let currentUserId = $(this).data("user-id");
    event.preventDefault()
      if (btn.innerHTML === "See My Trips") {
        renderUserTripsIndex(currentUserId)
      } else if (btn.innerHTML === "Hide Trips"){
        $("div#my-trips").hide();
        btn.innerHTML = "Show Trips"
      } else if (btn.innerHTML === "Show Trips"){
        $("div#my-trips").show()
        btn.innerHTML = "Hide Trips"
      }
  })

  $(".js-display-traveler-trips").on("click", function(event) {
    let travelerId = $(this).data("traveler-id");
    event.preventDefault()
    displayTravelerTrips(travelerId)
  })


  // appends html from prototype to render index on current user's main show page
  function renderUserTripsIndex(currentUserId) {
    $.get(`/users/${currentUserId}/trips.json`, function(data) {
      const currentUser = new User(data);
      let userIndexHtml = currentUser.formatUserTripsIndex(currentUserId)
      $("#my-trips").append(userIndexHtml);
    });
  }

  // appends html from prototype for each traveler on Travelers index page
  function displayTravelerTrips(travelerId) {
    $.get(`/users/${travelerId}/trips.json`, function(data) {
      const traveler = new User(data);
      let travelerHtml = traveler.getTravelerTrips(travelerId)
      $("#traveler-" + travelerId).append(travelerHtml)
    });
  }

})
