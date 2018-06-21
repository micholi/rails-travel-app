class CitiesController < ApplicationController
  before_action :require_login

  def index
    @cities = City.all.order(:name)
  end

  def show
    @city = City.find(params[:id])
  end
end
