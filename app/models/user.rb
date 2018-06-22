class User < ApplicationRecord
  has_many :trips
  has_many :cities, through: :trips
  has_secure_password
  validates :email, presence: true, uniqueness: true

  def last_trip
    # check this - what happens when you update trip?
    self.trips.last
  end

  def trip_count
    self.trips.count
  end

  def self.sort_by_trip_count
    User.joins(:trips).group('trips.user_id').order("count(trips.user_id) desc")
  end



  # @users.joins(:trips).group('trips.user_id').order("count(trips.user_id) desc")
  # @users.joins(:trips).group('trips.user_id').order("count(trips.user_id) desc").limit(1)
end
