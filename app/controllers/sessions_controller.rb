class SessionsController < ApplicationController

  def new
  end

  def create
    @user = User.find_by(email: params[:user][:email])
    if !@user
      redirect_to login_path, :flash => { :error => "Sorry, we don't recognize that email."}
    elsif @user && @user.try(:authenticate, params[:user][:password])
      session[:user_id] = @user.id
      redirect_to user_path(@user)
    else
      redirect_to login_path, :flash => { :error => "Incorrect password. Please try again."}
    end
  end

  def destroy
    if logged_in?
      session.destroy
      redirect_to root_path
    end
  end

end
