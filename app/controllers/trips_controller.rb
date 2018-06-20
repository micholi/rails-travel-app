class TripsController < ApplicationController

  def index
    @user = User.find_by(id: params[:user_id])
    @trips = @user.trips.all
  end

  def show
    @trip = Trip.find(params[:id])
  end

  def new
    @user = User.find_by(id: session[:user_id])
    @trip = @user.trips.build
  end

  def create
    #binding.pry
    @user = User.find_by(id: session[:user_id])
    @trip = Trip.new(trip_params)
    if @trip.save
      redirect_to user_path(@user)
    else
      render :new
    end
  end

  private
  def trip_params
    params.require(:trip).permit(:user_id, :city_id, :rating, :fave_attraction, :comment, city_attributes:[:city, :country, :country_id])
  end

end
