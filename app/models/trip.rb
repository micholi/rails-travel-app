class Trip < ApplicationRecord
  belongs_to :user
  belongs_to :city

  def city_attributes=(city_attributes)
    if !city_attributes[:name].empty?
      city = City.find_or_create_by(name: city_attributes[:name])
      if !city_attributes[:country].empty?
        country = Country.find_or_create_by(name: city_attributes[:country])
      end
    end
  end
end
