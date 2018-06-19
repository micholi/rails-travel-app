class Trip < ApplicationRecord
  belongs_to :user
  belongs_to :city

  def city_attributes=(attributes)
    if !attributes[:name].blank?
    city = City.find_or_create_by(name: attributes[:name])
    if !attributes[:country].blank?
    country = Country.find_or_create_by(country: attributes[:country])
    #self.city_id = city.id
    #@country = Country.find_or_create_by(attributes: name)
  end
  end
  end

  def city_name
    self.city.name if self.city
  end
#  def city_name=(name)
#    self.city = City.find_or_create_by(name: name)
#  end

#  def city_name
#    self.city.name if self.city
  #  self.city_id = city.id
#  end

  def country_name=(name)
    @country = Country.find_or_create_by(name: name)
    #country.cities << @city
  end

  def country_name
    @country.name
  end

end
