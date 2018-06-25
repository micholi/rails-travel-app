class SessionsController < ApplicationController

  def new
  end

  def create
    @user = User.find_by(email: params[:user][:email])
    if params[:user][:email] == "" || params[:user][:password] == ""
      redirect_to login_path, :flash => { :error => "Please enter all fields."}
    elsif !@user
      redirect_to login_path, :flash => { :error => "Sorry, we don't recognize that email."}
    elsif @user && @user.try(:authenticate, params[:user][:password])
      session[:user_id] = @user.id
      redirect_to user_path(@user)
    else
      redirect_to login_path, :flash => { :error => "Incorrect password. Please try again."}
    end
  end

  def destroy
    session.destroy
    redirect_to root_path
  end

end
