class TripSerializer < ActiveModel::Serializer
  attributes :id, :city, :rating, :comment
  belongs_to :city
  belongs_to :user
end
