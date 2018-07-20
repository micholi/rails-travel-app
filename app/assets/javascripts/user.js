function User(data) {
  this.trips = data
}

User.prototype.formatTrips = function(userId) {
  let userTrips = this.trips
  var tripsHtml = ""
  userTrips.forEach(function(trip) {
    let userTripId = trip.id;
    let city = trip.city.name;
    //$("#my-trips").append(`<a href="/users/${userId}/trips/${userTripId}">${city}</a><br>`);
    tripsHtml += `<a href="/users/${userId}/trips/${userTripId}">${city}</a><br>`

  })
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
