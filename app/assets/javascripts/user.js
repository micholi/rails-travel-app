function User(data) {
  this.trips = data
}

User.prototype.formatTrips = function(userId) {
  let userTrips = this.trips
  var tripsHtml = `<table>
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

    //tripsHtml += `<a href="/users/${userId}/trips/${userTripId}">${city}</a><br>`

    tripsHtml +=`<tr class="border-bottom">
      <td class="no-underline"><a href="/users/${userId}/trips/${userTripId}">${city}</a></td>
      <td>${fave}</td></tr>`

  })
  tripsHtml += `</tbody></table>`
return tripsHtml

  //  btn.innerHTML = "Hide Trips"
//  })
}

$(function() {
//  txt = document.getElementById("my-trips");
  btn = document.getElementById("btn");

  $(".js-load-trips").on("click", function(event) {
    event.preventDefault()
      if (btn.innerHTML === "See my trips") {
        loadUserTrips()
      } else if (btn.innerHTML === "Hide Trips"){
        $("div#my-trips").hide();
        btn.innerHTML = "Show Trips"
      } else if (btn.innerHTML === "Show Trips"){
        $("div#my-trips").show()
        btn.innerHTML = "Hide Trips"
      }
  })

  function loadUserTrips() {
  //  debugger
    let userId = parseInt($(".js-load-trips").attr("data-user-id"))
    $.get(`/users/${userId}/trips.json`, function(data) {

      const user = new User(data);
    let userTrips = user.formatTrips(userId)

      $("#my-trips").append(userTrips);
      //let tripsList = "";
    //  let something = data
  //    userTrips.forEach(function(trip) {
  //      let userTripId = trip.id;
  //      let city = trip.city.name;
      //  $("#my-trips").append(content);
    //  $("#my-trips").append(`<a href="/users/${userId}/trips/${userTripId}">${city}</a><br>`);
  //    btn.innerHTML = "Hide Trips"
    //});
  });
  }




})
