class CitySerializer < ActiveModel::Serializer
  attributes :id, :name, :country, :trips
  belongs_to :country
  has_many :trips

  private
  def trips
    TripSerializer.new(object.trips).attributes
  end
end
