class UsersController < ApplicationController

  def index
  #  @users = User.all
  #@users = User.joins(:trips).group('trips.user_id').order("count(trips.user_id) desc")
    @users = User.sort_by_trip_count
  end

  def show
    @user = User.find_by(id: params[:id])
    # set_user
  end

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
    #if @user.save
      session[:user_id] = @user.id
      redirect_to user_path(@user)
    else
      render :new
    end
  end

  def edit
    set_user
    # code here
  end

  def update
    set_user
    # code here
  end

  private
  def set_user
    @user = User.find_by(id: session[:user_id])
  end


  def user_params
    # need to add Omniauth
    params.require(:user).permit(:email, :name, :password)
  end

end
