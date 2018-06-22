class Country < ApplicationRecord
  has_many :cities
  has_many :trips, through: :cities

  validates :name, presence:true, uniqueness: true

  def random_attraction
    attractions = []
    self.trips.each do |trip|
      attractions << trip.fave_attraction
    end
    attractions.sample
  end
end
