$(function() {
  txt = document.getElementById("my-trips");
  btn = document.getElementById("btn");

  function appendToDiv() {
    let userId = parseInt($(".js-load-trips").attr("data-user-id"))
    $.get(`/users/${userId}/trips.json`, function(data) {
      let trips = data;
      let tripsList = "";
      trips.forEach(function(trip) {
        let tripId = trip.id;
        let city = trip.city.name;

      $("#my-trips").append(`<a href="/users/${userId}/trips/${tripId}">${city}</a><br>`);
      btn.innerHTML = "Hide Trips"
    });
  });
  }

  $(".js-load-trips").on("click", function() {
      if (btn.innerHTML === "See my trips") {
        appendToDiv()
      } else if (btn.innerHTML === "Hide Trips"){
        $("div#my-trips").hide();
        btn.innerHTML = "Show Trips"
      } else if (btn.innerHTML === "Show Trips"){
        $("div#my-trips").show()
        btn.innerHTML = "Hide Trips"
      }
  })


})
