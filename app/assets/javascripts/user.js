$(function() {
  $(".js-load-trips").on("click", function() {
    let userId = parseInt($(".js-load-trips").attr("data-user-id"))
    $.get(`/users/${userId}/trips.json`, function(data) {

      let trips = data;
      let tripsList = "";
      trips.forEach(function(trip) {
        let tripId = trip.id;
        let city = trip.city.name;

      $("#my-trips").append(`<a href="/users/${userId}/trips/${tripId}">${city}</a><br>`);
    })
    })
  })
})
