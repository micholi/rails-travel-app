class CitySerializer < ActiveModel::Serializer
  attributes :id, :name, :country, :city_info, :trip_count, :avg_rating
  # need to create citytrips serializer
end
