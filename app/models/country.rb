class Country < ApplicationRecord
  has_many :cities
  has_many :trips, through: :cities
  validates :name, presence:true, uniqueness: true

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
