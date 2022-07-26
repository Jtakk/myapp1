class MountainsController < ApplicationController
  def index
    @mountains = Mountain.all
  end

  def show
    @mountain = Mountain.find(params[:id])
    @posts = @mountain.posts.as_json(include: [:photos, :user])
  end

  def show_prefecture
  end

  def show_region
  end

  def show_tag
  end

  def show_area
  end
end
