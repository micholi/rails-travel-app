class CitiesController < ApplicationController
  before_action :require_login

  def index
    @cities = City.all
    respond_to do |format|
      format.html { render :index }
      format.json { render json: @cities }
    end
  end

  def show
    @city = City.find(params[:id])
    respond_to do |format|
      format.html { render :show }
      format.json { render json: @city }
    end
  end

  def most_visited
    @city = City.most_visited.first
  end

  def highly_rated
    @cities = City.highly_rated
  end

  def trips
    @city = City.find(params[:id])
    @city_trips = @city.trips

      #render json: @city_trips, serializer: CitySerializer, status: 200
      render json: @city_trips
  end

  def new
    @city = City.new
  end

  def create
    @city = City.create(city_params)
    if @city.save
      redirect_to cities_path, :flash => { :success => "You've successfully added this city!"}
    else
      render :new
    end
  end

  private
  def city_params
    params.require(:city).permit(:name, :country_id, country_name:[:country])
  end

end
