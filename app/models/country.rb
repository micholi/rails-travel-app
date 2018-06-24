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
      random = "Be the first to add a favorite attraction for #{self.name}!"
    else
      random = attractions.sample
    end
    random
  end


end
