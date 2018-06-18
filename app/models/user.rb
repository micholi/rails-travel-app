class User < ApplicationRecord
  has_many :trips
  has_many :cities, through: :trips
  has_secure_password
end
