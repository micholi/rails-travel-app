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

User.prototype.fetchUserTrips = function(userId) {
  // rename variables
  let uT = this.trips
  let html = `<ul>`
  uT.forEach(function(t) {
    let c = t.city.name
    html += `<li>${c}</li>`
  })
    html += `</ul>`
    return html
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

  function displayUserTrips(userId) {
    //userId = parseInt($(".js-display-trips").attr("data-user-id"))
    $.get(`/users/${userId}/trips.json`, function(data) {
      const userObj = new User(data);
      let x = userObj.fetchUserTrips(userId)
      $("#js-user-trips").append(x)
      // works for current user, only.. need to debug
      //  "js-display-trips"
      //  "js-user-trips"
    });
  }


$(".js-display-trips").on("click", function(event) {
//  debugger
  userId = parseInt($(".js-display-trips").attr("data-user-id"))
  event.preventDefault()
  displayUserTrips(userId)
})




})
