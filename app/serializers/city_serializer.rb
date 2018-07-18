class CitySerializer < ActiveModel::Serializer
  attributes :id, :name, :country
  belongs_to :country
  has_many :trips
  # need to create citytrips serializer
end
