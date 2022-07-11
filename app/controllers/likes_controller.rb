class LikesController < ApplicationController
  before_action :ajax_logged_in_user, only: [:show, :create, :destroy]

  def show
    like = current_user.likes.exists?(post_id: params[:id])
    count = Post.find(params[:id]).liked_users.count
    render json: { like: like, count: count }
  end

  def create
    @like = current_user.likes.create!(like_params)
    render json: @like
  end

  def destroy
    @like = current_user.likes.find_by(post_id: params[:id])
    @like.destroy
    render json: @like
  end

  private

  def like_params
    params.require(:like).permit(:post_id)
  end
end
