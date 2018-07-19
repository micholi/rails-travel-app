class CitySerializer < ActiveModel::Serializer
  attributes :id, :name, :country, :trips, :city_info
  belongs_to :country
  has_many :trips
  # need to create citytrips serializer

  private
  def trips
    TripSerializer.new(object.trips).attributes
  end
end
