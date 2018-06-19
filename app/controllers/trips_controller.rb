class TripsController < ApplicationController

  def index
    @trips = Trip.all
  end

  def show
    @trip = Trip.find(params[:id])
  end

  def new
  end

  def create
    @trip = Trip.new(trip_params)
    if @trip.save
      redirect_to user_trips_path(@user)
    else
      redirect_to new_trip_url
    end
  end

  private
  def trip_params
    params.require(:trip).permit(:user_id, :city_id, :rating, :fave_attraction, :comment, :city_attributes[:name, :country, :country_id])
  end

end
