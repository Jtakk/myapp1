class PostsController < ApplicationController
  before_action :logged_in_user, only: [:create, :update, :destroy]

  def index
    @user = User.find(params[:id])
    @posts = @user.posts.as_json(include: { mountain: { only: [:name, :yomi] } })
  end

  def create
    @post = current_user.posts.build(post_params)
    if @post.save
      flash[:success] = "投稿しました。"
      redirect_to user_posts_url(current_user)
    else
      render 'mountains/show'
    end
  end

  def update
  end

  def destroy
  end

  private

  def post_params
    params.require(:post).permit(:mountain_id, :message, :latitude, :longitude)
  end

end
