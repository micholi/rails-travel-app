class City < ApplicationRecord
  belongs_to :country
  has_many :trips
  has_many :users, through: :trips
  validates :name, presence: true, uniqueness: true
  validates :country_id, presence: true

  # TESTING
  scope :highest_rated, -> { joins(:trips).group('trips.city_id').order("AVG(trips.rating) desc").limit(1) }

  scope :test_method, -> { joins(:trips).group('trips.city_id').order("AVG(trips.rating) desc") }
  # where avgsal=(select  max(avgsal)
          #    from (select worker_id, avg(salary) as avgsal
          #          from workers group by worker_id))

 scope :most_trips, -> { joins(:trips).group('trips.city_id').order("count(trips.city_id) desc").limit(1)}

  def city_country
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
