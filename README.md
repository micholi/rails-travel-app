# README - Rails Travel App with jQuery Front End
## Portfolio Project for Flatiron School

## Description
This is a CRUD app that allows a user, aka a traveler, to create new cities and trip reviews. For each trip review submitted, the user can assign a rating of 1-5, add a Must See Attraction, and include additional comments to share with other travelers. Travel sites like TripAdvisor were my inspiration, but as this is a school project, my app is a much simpler version! To use the app, a user must create a new account either through Facebook or by providing a unique email address.

The original iteration of this project was created using Rails. In this updated version, some of the front end has been rebuilt with JS, jQuery, AJAX, and JSON APIs to make the app more dynamic. New features include the ability to render additional content without a page refresh, create a new resource and append the response to the current page without refresh, and scroll though content using Next and Previous links.

## Travel App Instructions

* Clone this repo
* cd into rails-travel-app directory
* Run bundle install to install gems
* Run rake db:migrate
* Run rake db:seed
* To start the server, run rails s OR thin start --ssl
* In your browser, go to https://localserver:3000

## Built Using
* Ruby on Rails
* JavaScript
* jQuery
* AJAX
* JSON APIs
* Facebook Omniauth

## Contributing
Bug reports and pull requests are welcome on GitHub at: https://github.com/micholi/rails-travel-app/tree/rails_jquery. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](contributor-covenant.org) code of conduct.

## License
Available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).

## Author
Michelle Olivieri<br/>
[Github](https://github.com/micholi)<br/>
[LinkedIn](https://www.linkedin.com/in/michelleolivieri/)
