function Trip(id, city, rating, fave_attraction, comment) {
  this.id = id
  this.city = city
  this.rating = rating
  this.fave_attraction = fave_attraction
  this.comment = comment
}

/*
Trip.renderNewTrip = function() {
  let newTripString = `<td class="no-underline"><a href="/users/${currentUserId}/trips/${id}">${city}</a></td><td>${rating}</td><td>${fave_attraction}</td>`>
  return newTripString
}
*/

Trip.renderNewTrip = function() {
  //debugger
  let newTripString = `<p class="no-underline bold-text" id="${this.id}"> <a href="/users/${this.user.id}/trips/${this.id}">${this.city}</a></p>`

  return newTripString
}




Trip.prototype.showMore = function() {
  let moreTripString = `<p>${this.comment}</p><p><span class="bold-text">Rating: </span>${this.rating}</p><p><span class="bold-text">Must See Attraction: </span>${this.fave_attraction}</p>`;
  return moreTripString
}

Trip.prototype.cityCountry = function() {
  return this.city.name + ", " + this.city.country.name
}

$(function() {
  var tripUserId
  var tripId
  var op
  let tripIndex = 0
  let tripsArray = []

  $(".js-next-trip").on("click", function(event) {
    tripUserId = parseInt($(".js-next-trip").attr("data-user-id"))
    tripId = parseInt($(".js-next-trip").attr("data-trip-id"))
    op = "add"
    event.preventDefault()
    getNewTripId(tripUserId, tripId, op)
    })

  $(".js-previous-trip").on("click", function(event) {
    tripUserId = parseInt($(".js-previous-trip").attr("data-user-id"))
    tripId = parseInt($(".js-previous-trip").attr("data-trip-id"))
    op = "sub"
    event.preventDefault()
    getNewTripId(tripUserId, tripId, op)
    })

  $(".js-more").on("click", function(event) {
    let moreTripId = $(this).data("more-trip-id")
    $.get(`trips/${moreTripId}.json`, function(data) {
      const moreTrip = new Trip(data.id, data.city, data.rating, data.fave_attraction, data.comment)
      let moreTripHtml = moreTrip.showMore()
      $("#trip-" + moreTripId).html(moreTripHtml);
      $("#more-" + moreTripId).hide()
    })
    event.preventDefault()
  })


  /* Testing form submission */
    $('form').submit(function(event) {
          //prevent form from submitting the default way
          event.preventDefault();
          //debugger
          var $form = $(this)
          var action = $form.attr("action")
          var params = $form.serialize()
          $.ajax({
            url: action,
            data: params,
            datatype: "json",
            method: "POST"
          }).success(function(json) {
            let newTrip = new Trip(json);
            let newTripHtml = newTrip.renderNewTrip()
            $(".my-trips.underlined-list").append(newTripHtml)
          })
        })





  // gets index of trip and adds or subtracts 1 based on value passed from next/previous click
  // updated index is used to retrieve trip id, which is then passed to loadTrip function
  function getNewTripId(tripUserId, tripId, op) {
    $.get(`/users/${tripUserId}/trips.json`, function(data) {
      tripsArray = data
      tripIndex = tripsArray.map(t => t.id).indexOf(tripId)
      if (op === "add") {
        tripIndex += 1
      } else if (op === "sub") {
        tripIndex -= 1
      }
      newTripId = tripsArray[tripIndex]["id"]
      loadTrip(tripUserId, newTripId)
    })
  }

  function loadTrip(tripUserId, newTripId) {
    $.get(`/users/${tripUserId}/trips/${newTripId}.json`, function(data) {
      const trip = new Trip(data.id, data.city, data.rating, data.fave_attraction, data.comment)
      $(".tripCity").text(trip.cityCountry());
      $(".tripRating").text(trip.rating);
      $(".tripMustSee").text(trip.fave_attraction);
      $(".tripReview").text(trip.comment);
      // re-set the id to current on the link
      $(".js-previous-trip").attr("data-trip-id", trip.id);
      $(".js-next-trip").attr("data-trip-id", trip.id);
    })
  }

})
