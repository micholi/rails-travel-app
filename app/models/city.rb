class City < ApplicationRecord
  belongs_to :country
  has_many :trips
  has_many :users, through: :trips
  validates :name, presence: true, uniqueness: true
  validates :country_id, presence: true
  scope :most_visited, -> { joins(:trips).group('trips.city_id').order("count(trips.city_id) desc").limit(1)}


  def city_plus_country
    "#{self.name}, #{country.name}"
  end

  def avg_rating
    if self.trips.count == 0
      "This city hasn't been rated yet."
    else
      self.trips.average(:rating).to_f.round(1)
    end
  end

  def country_attributes=(country_attributes)
    if country_attributes[:country] != ""
      country = Country.find_or_create_by(name: country_attributes[:country])
    else
      country = Country.find_by(id: country_attributes[:country_id])
    end
    self.country_id = country.id if country.name != ""
  end

end
