class Country < ApplicationRecord
  has_many :cities
  
  def random_attraction
    attractions = []
    self.trips.each do |trip|
      attractions << trip.fave_attraction
    end
    if attractions.empty?
      random = "No favorite attractions added for #{self.name} yet."
    else
      random = attractions.sample
    end
    random
  end

end
