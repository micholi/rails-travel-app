class CitySerializer < ActiveModel::Serializer
  attributes :id, :name, :country, :city_info
end
