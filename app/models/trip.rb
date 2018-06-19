class Trip < ApplicationRecord
  belongs_to :user
  belongs_to :city

  def city_name=(name)
    self.city = City.find_or_create_by(name: name)
  end

  def city_name
    self.city.name if self.city
    self.city_id = city.id
  end

  def country_name=(name)
    self.country = Country.find_or_create_by(name: name)
  end

  def country_name
    country.cities << city
  end

end
