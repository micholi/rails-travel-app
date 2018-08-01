class UsersController < ApplicationController
  before_action :require_login, only: [:index, :show]

  def index
    @users = User.all
    respond_to do |format|
      format.html { render :index }
      format.json { render json: @users }
    end
  end

  def show
  #  set_user
    @user = User.find_by(id: params[:id])
    @trip = @user.trips.build unless @user != current_user
    respond_to do |format|
      format.html { render :show }
      format.json { render json: @user }
    end
  end

  def most_trips
    @user = User.most_trips.first
  end

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      session[:user_id] = @user.id
      redirect_to user_path(@user), :flash => { :success => "Welcome, #{@user.name}! Your account was successfully created."}
    else
      render :new
    end
  end

  private
  def user_params
    params.require(:user).permit(:email, :name, :password)
  end

end
