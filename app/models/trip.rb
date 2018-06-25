class Trip < ApplicationRecord
  belongs_to :user
  belongs_to :city
  validates :rating, presence: true, numericality: {only_integer: true, greater_than_or_equal_to: 1, less_than_or_equal_to: 5}
  validates :city, presence: true
  validates_uniqueness_of :city_id, :scope => :user_id

  def city_attributes=(attributes)
    if attributes[:city] != ""
      city = City.find_or_create_by(name: attributes[:city])
    if attributes[:country] != ""
      country = Country.find_or_create_by(name: attributes[:country])
    else
      country = Country.find_by(id: attributes[:country_id])
    end
    country.cities << city if city != "" && country != ""
    country.save if country != ""
    self.city_id = city.id
    end
  end

  def no_dup
    # note: need method to make sure city hasn't been added to user's trips
  end

end
