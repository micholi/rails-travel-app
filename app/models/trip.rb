class Trip < ApplicationRecord
  belongs_to :user
  belongs_to :city

  validates :rating, presence: true, numericality: {only_integer: true, greater_than_or_equal_to: 1, less_than_or_equal_to: 5}
  validates :city, presence: true, uniqueness: true

  def city_attributes=(attributes)
    if !attributes[:city].empty?
      city = City.find_or_create_by(name: attributes[:city])

    if !attributes[:country].empty?
      country = Country.find_or_create_by(name: attributes[:country])
    else
      country = Country.find_by(id: attributes[:country_id])
    end

    country.cities << city if !city.nil? && !country.nil?
    country.save if !country.nil?
    self.city_id = city.id
    end
  end

end
