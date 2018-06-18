class City < ApplicationRecord
  belongs_to :country
  has_many :trips
  has_many :users, through: :trips
end
