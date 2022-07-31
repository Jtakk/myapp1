class MountainsController < ApplicationController
  def index
    @tab = params[:tab].to_i
  end

  def show
    @mountain = Mountain.find(params[:id])
    @posts = @mountain.posts.as_json(include: [:photos, :user])
  end

  def show_prefecture
    @prefecture = Prefecture.find(params[:id])
    @region = @prefecture.region
    @mountains = @prefecture.mountains
  end

  def show_region
    @region = Region.find(params[:id])
    @mountains = @region.prefectures.map(&:mountains).flatten
  end

  def show_tag
    @tag = Tag.find(params[:id])
    @mountains = @tag.mountains
  end

  def show_area
    @area = Area.find(params[:id])
    @mountains = @area.mountains
  end
end
