class LikesController < ApplicationController
  before_action :ajax_logged_in_user, only: [:show, :create, :destroy]

  def show
    @post = Post.find(params[:id])
    @like = current_user.like?(@post)
    @count = @post.liked_users.count
    render json: { like: @like, count: @count }
  end

  def create
    @post = Post.find_by(post_params)
    if current_user.own?(@post)
      @like = nil
      render json: @like, status: 403
    else
      @like = current_user.like(@post)
      render json: @like
    end
  end

  def destroy
    @like = current_user.likes.find_by(post_id: params[:id])
    @like.destroy
    render json: @like
  end

  private

  def post_params
    params.require(:post).permit(:id)
  end
end
