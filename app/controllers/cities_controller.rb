class CitiesController < ApplicationController
  before_action :require_login

  def index
    @cities = City.all.order(:name)
    @top_city = City.most_trips.first
  end

  def show
    @city = City.find(params[:id])
  end

  def most_visited

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
    params.require(:city).permit(:name, country_attributes:[:country, :country_id])
  end

end
