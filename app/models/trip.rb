class Trip < ApplicationRecord
  belongs_to :user
  belongs_to :city
  validates :city, presence: true
  validates_uniqueness_of :city_id, :scope => :user_id, message: "already added to your trips!"
  validates :rating, presence: true
  validates_numericality_of :rating, :only_integer => true, message: "must be a whole number"
  validates_inclusion_of :rating, :in => 1..5, message: "must be between 1 and 5"
  scope :fivestar, -> { where(rating: 5) }

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

end
