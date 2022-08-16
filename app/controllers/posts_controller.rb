class PostsController < ApplicationController
  MAX_IMAGE_COUNT = 10
  MAX_ITEM_COUNT = 10
  before_action :ajax_logged_in_user, only: [:create]
  before_action :logged_in_user, only: [:update, :destroy]
  before_action :correct_user, only: [:update, :destroy]

  def index
    @user = User.find(params[:id])
    @posts = @user.posts.latest.as_json(include: { mountain: { only: [:name, :yomi] } })
    @max_item_count = MAX_ITEM_COUNT
  end

  def show
    @post = Post.find(params[:id])
    @user = @post.user
    @photos = @post.photos
  end

  def create
    @post = current_user.posts.build(post_params)
    if params[:photo] && (photo_params[:image].length <= MAX_IMAGE_COUNT) && @post.save
      photo_params[:image].each do |image|
        @post.photos.create!(image: image)
      end
      @data = {
        post: @post.as_json(include: [{ photos: { only: [:image] } }, { user: { only: [:id, :name, :avatar] } }, { liked_users: { only: [:id] } }]),
        flash: { message_type: "success", message: "投稿しました。" },
      }
    else
      @data = { post: nil, flash: { message_type: "warning", message: "投稿に失敗しました。" } }
    end
    render json: @data
  end

  def update
    @post = Post.find(params[:id])
    if @post.update(update_post_params)
      flash[:success] = "メッセージを更新しました。"
      redirect_to @post
    else
      render :show
    end
  end

  def destroy
    Post.find(params[:id]).destroy
    flash[:success] = "投稿を削除しました。"
    redirect_to user_posts_path(current_user)
  end

  private

  def post_params
    params.require(:post).permit(:mountain_id, :message, :latitude, :longitude)
  end

  def update_post_params
    params.require(:post).permit(:message)
  end

  def photo_params
    params.require(:photo).permit(image: [])
  end

  def correct_user
    @user = Post.find(params[:id]).user
    unless current_user?(@user)
      flash[:warning] = "保護されたページです"
      redirect_to root_url
    end
  end
end
