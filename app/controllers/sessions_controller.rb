class SessionsController < ApplicationController


  def new
  end

  def create
    @user = User.find_by(email: params[:email])
    if @user.try(:authenticate, params[:password])
      session[:user_id] = @user.id
      redirect_to user_path(@user)
    else
      redirect_to login_path
    end
  end

  def destroy
    if logged_in?
      session.destroy
      redirect_to root_path
    end
  end

end
