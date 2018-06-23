class City < ApplicationRecord
  belongs_to :country
  has_many :trips
  has_many :users, through: :trips

  validates :name, presence: true, uniqueness: true
  validates :country_id, presence: true

  # TESTING
  scope :highest_rated, -> { joins(:trips).group('trips.rating').order('AVG(trips.rating) desc').limit(1)}
  scope :lowest_rated, -> { joins(:trips).group('trips.rating').order('AVG(trips.rating) asc').limit(1)}

#  scope :most_trips, -> { joins(:trips).group('trips.user_id').order("count(trips.user_id) desc").limit(1)}

  def city_country
    "#{self.name}, #{country.name}"
  end

  def avg_rating
    self.trips.average(:rating).to_f.round(1)
  end

end
