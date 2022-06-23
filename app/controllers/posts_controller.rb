class PostsController < ApplicationController
  before_action :logged_in_user, only: [:create, :update, :destroy]

  def index
    @user = User.find(params[:id])
    @posts = @user.posts.as_json(include: { mountain: { only: [:name, :yomi] } })
  end

  def create
    @post = current_user.posts.build(post_params)
    if params[:photo] && @post.save
      photo_params[:image].each do |image|
        @post.photos.create!(image: image)
      end
      flash.now[:success] = "投稿しました。"
      render 'mountains/show'
    else
      flash.now[:warning] = "投稿に失敗しました。"
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

  def photo_params
    params.require(:photo).permit(image: [])
  end
end
