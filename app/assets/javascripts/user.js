function User(data) {
  this.trips = data
}

User.prototype.formatUserTripsIndex = function(userId) {
  let userTrips = this.trips
  let tripsHtml = `<br><br><table>
  <thead>
    <tr>
      <th>City</th>
      <th>Must See Attraction</th>
    </tr>
  </thead>
  <tbody>`
  userTrips.forEach(function(trip) {
    let userTripId = trip.id;
    let city = trip.city.name;
    let fave = trip.fave_attraction;
    btn = document.getElementById("btn");

    tripsHtml +=`<tr class="border-bottom">
      <td class="no-underline"><a href="/users/${userId}/trips/${userTripId}">${city}</a></td>
      <td>${fave}</td></tr>`
  })
  tripsHtml += `</tbody></table>`
  btn.innerHTML = "Hide Trips"
  return tripsHtml
}

User.prototype.fetchTravelerTrips = function(travelerId) {
  $("#link-trav-" + travelerId).hide()
  let travelerTrips = this.trips
  let travelerString = `<p>Cities Visited + Recommended Attractions:</p><ul>`
  travelerTrips.forEach(function(trip) {
    let city = trip.city.name
    let fave = trip.fave_attraction
    travelerString += `<li><span class="bold-text">${city}</span> - ${fave}</li>`
  })
  travelerString += `</ul>`
  return travelerString
}

$(function() {
  btn = document.getElementById("btn");

  $(".js-load-trips").on("click", function(event) {
    event.preventDefault()
      if (btn.innerHTML === "See My Trips") {
        renderUserTripsIndex()
      } else if (btn.innerHTML === "Hide Trips"){
        $("div#my-trips").hide();
        btn.innerHTML = "Show Trips"
      } else if (btn.innerHTML === "Show Trips"){
        $("div#my-trips").show()
        btn.innerHTML = "Hide Trips"
      }
  })

  function renderUserTripsIndex() {
    let userId = parseInt($(".js-load-trips").attr("data-user-id"))
    $.get(`/users/${userId}/trips.json`, function(data) {
      const user = new User(data);
      let userTripsHtml = user.formatUserTripsIndex(userId)
      $("#my-trips").append(userTripsHtml);
    });
  }

  function displayTripCities(travelerId) {
    $.get(`/users/${travelerId}/trips.json`, function(data) {
      const traveler = new User(data);
      let travelerHtml = traveler.fetchTravelerTrips(travelerId)
      $("#traveler-" + travelerId).append(travelerHtml)
    });
  }

  $(".js-display-traveler-trips").on("click", function(event) {
    let travelerId = $(this).data("traveler-id");
    event.preventDefault()
    displayTripCities(travelerId)
  })

})
