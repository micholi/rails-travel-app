class TripsController < ApplicationController
  before_action :require_login

  def index
    find_user
    @trips = @user.trips.all
    respond_to do |format|
      format.html { render :index }
      format.json { render json: @trips }
    end
  end

  def show
    find_user
    find_trip
    respond_to do |format|
      format.html { render :show }
      format.json { render json: @trip }
    end
  end

  def five_star
    set_user
  end

  def new
  end

  def create
    set_user
    @trip = @user.trips.build(trip_params)
    if @trip.save
      render json: @trip
    else
      render 'users/show'
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
    if @trip.update(trip_params)
      redirect_to user_trips_path(@user), :flash => { :success => "Your trip has been updated!"}
      # had added below code to fix issue with redirect post-update
      # may not actually be needed, but keeping just in case
      # respond_to do |format|
        # format.html { redirect_to user_trips_path(@user) }
        # format.json { render json: @trip }
      # end
    else
      render :edit
    end
  end

  def destroy
    set_user
    find_trip
    @trip.destroy
    redirect_to user_trips_path(@user), :flash => { :success => "Your trip has been deleted."}
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
