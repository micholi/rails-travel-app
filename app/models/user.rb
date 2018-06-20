class User < ApplicationRecord
  has_many :trips
  has_many :cities, through: :trips
  has_secure_password
  validates :email, presence: true, uniqueness: true

  def most_recent
    self.trips.last
  end
end
