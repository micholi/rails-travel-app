class CountriesController < ApplicationController
  before_action :require_login

  def index
    @countries = Country.all.order(:name)
    respond_to do |format|
      format.html { render :index }
      format.json { render json: @countries }
    end
  end

  def show
    @country = Country.find(params[:id])
    respond_to do |format|
      format.html { render :show }
      format.json { render json: @country }
    end
  end

end
