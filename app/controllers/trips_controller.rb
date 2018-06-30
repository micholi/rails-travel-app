class TripsController < ApplicationController
  before_action :require_login

  def index
    find_user
    @trips = @user.trips.all
  end

  def show
    find_user
    find_trip
  end

  def five_star
  end

  def new
    set_user
    find_city
    @trip = Trip.new
  end

  def create
    set_user
    find_city
    @trip = @user.trips.build(trip_params)
    if @trip.save
      redirect_to user_trips_path(@user), :flash => { :success => "You've successfully added this trip!"}
    else
      render :new
    end
  end

  def edit
    set_user
    find_trip
    if @trip.user != current_user
      redirect_to user_trips_path(@user), :flash => { :error => "You may not edit another traveler's trip."}
    end
  end

  def update
    set_user
    find_trip
    @trip.update(trip_params)
    if @trip.save
      redirect_to user_trips_path(@user), :flash => { :success => "Your trip has been updated!"}
    else
      render :edit
    end
  end

  def destroy
    set_user
    find_trip
    if @trip.user == current_user
      @trip.destroy
      redirect_to user_trips_path(@user), :flash => { :success => "Your trip has been deleted."}
    else
      redirect_to user_trips_path(@user), :flash => { :error => "You may not delete another traveler's trip."}
    end
  end

  private
  def find_user
    @user = User.find_by(id: params[:user_id])
  end

  def find_trip
    @trip = Trip.find(params[:id])
  end

  def find_city
    @city = City.find_by(id: params[:city_id])
  end

  def trip_params
    params.require(:trip).permit(:user_id, :city_id, :rating, :fave_attraction, :comment, city_attributes:[:city, :country, :country_id])
  end

end
