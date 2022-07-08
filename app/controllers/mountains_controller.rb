class MountainsController < ApplicationController
  def index
    @mountains = Mountain.all
  end

  def show
    @mountain = Mountain.find(params[:id])
    @posts = @mountain.posts.as_json(include: [:photos, :user])
  end
end
