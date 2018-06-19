class CountriesController < ApplicationController

  def index
    @countries = Country.all.order(:name)
  end

  def show
    @country = Country.find(id: params[:id])
  end

end
