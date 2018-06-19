class UsersController < ApplicationController

  def show
    @user = User.find_by(id: session[:user_id])
  end

end
