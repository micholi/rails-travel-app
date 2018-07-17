function City(data) {
  this.cities = data;
}

City.prototype.findNextCityId = function(cityId) {

  const data = this.cities;
  cityIds = []
  data.forEach(city => cityIds.push(city.id))
  let index = cityIds.indexOf(cityId)
  return cityIds[index + 1]
}

function getNextCity() {
  let cityId = parseInt($(".next-city").attr("data-city-id"))
  $.get("/cities/", function(data) {

    let city = new City(data);
    let nextCityId = city.findNextCityId(cityId);
    return nextCityId;
  })
}

City.prototype.displayNextCity = function() {
  let nextCityId = getNextCity();

  $.get(`/cities/${nextCityId}.json`, function(data) {
    $(".cityName").text(this.name);
    $(".cityTripCount").text(`Total Trips: ${this.trip_count}`);
    $(".cityAvgRating").text(`Average Rating: ${this.avg_rating}`);

    $("js-next-city").attr("city-id", this.id);
  });
}
