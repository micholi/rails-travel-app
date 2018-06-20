class Trip < ApplicationRecord
  belongs_to :user
  belongs_to :city

  validates :rating, presence: true

  def city_attributes=(attributes)
    if !attributes[:name].empty?
      city = City.find_or_create_by(name: attributes[:name])
    # city = City.find_or_create_by(name: attributes[:name]) unless attributes[:name].empty?

    if !attributes[:country].empty?
      country = Country.find_or_create_by(name: attributes[:country])
    else
      country = Country.find_by(id: attributes[:country_id])
    #self.city_id = city.id
    #@country = Country.find_or_create_by(attributes: name)
    end

    country.cities << city if !city.nil? && !country.nil?
    country.save if !country.nil?
    self.city_id = city.id
    end
  end


end
