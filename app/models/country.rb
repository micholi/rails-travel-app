class Country < ApplicationRecord
  has_many :cities
  has_many :trips, through: :cities
end
