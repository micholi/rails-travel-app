class CitySerializer < ActiveModel::Serializer
  attributes :id, :name, :country, :city_info, :trip_count, :avg_rating
end
