class User < ApplicationRecord
  has_many :trips
  has_many :cities, through: :trips
  has_secure_password

  validates :email, uniqueness: true

  def most_recent
    self.trips.last
  end
end
