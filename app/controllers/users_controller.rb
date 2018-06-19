class UsersController < ApplicationController

  def index
    @users = User.all
  end

  def show
    # update with helper method
    @user = User.find_by(id: session[:user_id])
  end

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      session[:user_id] = @user.id
      redirect_to user_path(@user)
    else
      redirect_to signup_path
    end
  end

  private
  def user_params
    # need to add Omniauth
    params.require(:user).permit(:email, :name, :password)
  end

end
