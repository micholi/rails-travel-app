class CountrySerializer < ActiveModel::Serializer
  attributes :id, :name
  has_many :cities

#  private
#  def cities
#    CitySerializer.new(object.cities).attributes
#  end
end
