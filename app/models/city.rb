class City < ApplicationRecord
  belongs_to :country
  has_many :trips
  has_many :users, through: :trips

  validates :name, presence: true, uniqueness: true
  validates :country_id, presence: true

  def city_country
    "#{self.name}, #{country.name}"
  end

  def avg_rating
    self.trips.average(:rating).to_f.round(1)
  end

end
