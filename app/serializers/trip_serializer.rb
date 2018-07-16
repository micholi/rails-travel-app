class TripSerializer < ActiveModel::Serializer
  attributes :id, :city, :rating, :fave_attraction, :comment
  belongs_to :city
  belongs_to :user
end
