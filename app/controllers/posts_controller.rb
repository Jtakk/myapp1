class PostsController < ApplicationController

  def index
    @user = User.find(params[:id])
    @posts = @user.posts.as_json(include: { mountain: { only: [:name, :yomi] } })
  end

  def create
    @post = Post.new(post_params)
    if @post.save
      flash[:success] = ""
    else

    end
  end

  def update
  end

  def destroy
  end

  private

  def post_params
    params.require(:post).permit(:message, :latitude, :longitude)
  end

end
