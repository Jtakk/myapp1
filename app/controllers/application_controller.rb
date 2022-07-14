class ApplicationController < ActionController::Base
  include SessionsHelper

  private

  def logged_in_user
    unless logged_in?
      store_location
      flash[:warning] = "ログインしてください"
      redirect_to login_url
    end
  end

  def ajax_logged_in_user
    unless logged_in?
      flash[:warning] = "ログインしてください"
      render json: { redirect_url: login_path }, status: 302
    end
  end
end
