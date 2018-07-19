class TripSerializer < ActiveModel::Serializer
  attributes :id, :user, :city, :rating, :fave_attraction, :comment
  belongs_to :city
  belongs_to :user
end
