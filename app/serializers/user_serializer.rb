class UserSerializer < ActiveModel::Serializer
  attributes :id, :name
  has_many :trips

  def trips
    TripSerializer.new(object.trips).attributes
  end
end
