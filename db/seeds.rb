User.create(email: "mich@test.com", name: "micholi", password: "brooklyn")
User.create(email: "timmycat@test.com", name: "Timmy", password: "catnip")
User.create(email: "eric@test.com", name: "Eric", password: "yankees")

City.create(name: "New York", country_id: 1)
City.create(name: "London", country_id: 2)
City.create(name: "Madrid", country_id: 3)
City.create(name: "Tokyo", country_id: 4)

Country.create(name: "USA")
Country.create(name: "England")
Country.create(name: "Spain")
Country.create(name: "Japan")

Trip.create(user_id: 1, city_id: 2, rating: 5, fave_attraction: "London Eye", comment: "One of my favorite cities ever! Hope to visit again someday.")
Trip.create(user_id: 1, city_id: 3, rating: 3, fave_attraction: "Parque del Buen Retiro", comment: "Cool city. Would've rated higher if my wallet wasn't stolen. Watch out for pickpockets!")
Trip.create(user_id: 2, city_id: 1, rating: 4, fave_attraction: "Rockefeller Center", comment: "Fun place to visit! But a little too crowded and noisy for me.")
Trip.create(user_id: 3, city_id: 4, rating: 5, fave_attraction: "The Tokyo Skytree", comment: "Amazing! Highly recommend!")
