class User < ApplicationRecord
  has_many :trips
  has_many :cities, through: :trips
  validates :email, presence: true, uniqueness: true
  validates :name, presence: true
  scope :most_trips, -> { joins(:trips).group('trips.user_id').order("count(trips.user_id) desc").limit(1)}
  has_secure_password

  def last_trip
    self.trips.last
  end

  def trip_count
    self.trips.count
  end

  def sort_by_rating
    self.trips.all.order("rating DESC")
  end

end
