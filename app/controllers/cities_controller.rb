class CitiesController < ApplicationController

  def index
    @cities = City.all.order(:name)
  end

  def show
    @city = City.find(params[:id])
  end
end
