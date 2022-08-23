class UsersController < ApplicationController
  MAX_ITEM_COUNT = 10
  before_action :logged_in_user, only: [:edit, :update, :destroy, :favorites]
  before_action :correct_user, only: [:edit, :update, :destroy, :favorites]

  def show
    @user = User.find(params[:id])
  end

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      log_in(@user)
      flash[:success] = "アカウントを作成しました。"
      redirect_to @user
    else
      render :new
    end
  end

  def edit
  end

  def update
    if @user.update(user_params)
      flash[:success] = "アカウント設定を更新しました。"
      redirect_to @user
    else
      render :edit
    end
  end

  def destroy
    @user.destroy
    flash[:success] = "アカウントを削除しました。"
    redirect_to root_url
  end

  def posts
    @user = User.find(params[:id])
    @posts = @user.posts.latest.as_json(include: { mountain: { only: [:name, :yomi] } })
    @max_item_count = MAX_ITEM_COUNT
  end

  def favorites
    @posts = @user.liked_posts.latest.as_json(
      include: [
        { mountain: { only: [:name, :yomi] } },
        { user: { only: [:id, :name, :avatar] } },
      ]
    )
    @max_item_count = MAX_ITEM_COUNT
  end

  private

  def user_params
    params.require(:user).
      permit(:name, :email, :password, :password_confirmation, :introduction, :avatar)
  end

  def correct_user
    @user = User.find(params[:id])
    unless current_user?(@user)
      flash[:warning] = "保護されたページです"
      redirect_to root_url
    end
  end
end
