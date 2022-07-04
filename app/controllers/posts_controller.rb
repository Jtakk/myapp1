class PostsController < ApplicationController
  before_action :ajax_logged_in_user, only: [:create, :update, :destroy]

  def index
    @user = User.find(params[:id])
    @posts = @user.posts.latest.as_json(include: { mountain: { only: [:name, :yomi] } })
  end

  def create
    @post = current_user.posts.build(post_params)
    if params[:photo] && @post.save
      photo_params[:image].each do |image|
        @post.photos.create!(image: image)
      end
      @data = {
        post: @post.as_json(include: [:photos, :user]),
        flash: { message_type: "success", message: "投稿しました。" },
      }
    else
      @data = { post: nil, flash: { message_type: "warning", message: "投稿に失敗しました。" } }
    end
    respond_to do |format|
      format.json { render json: @data }
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

  def ajax_logged_in_user
    unless logged_in?
      flash[:warning] = "ログインしてください"
      render json: { redirect_url: login_path }, status: 302
    end
  end
end
