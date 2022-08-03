class MountainsController < ApplicationController
  def index
    @tab = params[:tab].to_i
  end

  def show
    @mountain = Mountain.find(params[:id])
    @posts = @mountain.posts.as_json(include: [:photos, :user])
  end

  def search
    @keyword = params[:keyword]
    keywords = @keyword.split(/[[:blank:]]+/).select(&:present?)
    if keywords.empty?
      @mountains = []
    else
      keywords.each_with_index do |keyword, i|
        if i == 0
          @mountains = Mountain.search_mountain(keyword).yomi_asc
        else
          @mountains = @mountains.search_mountain(keyword).yomi_asc
        end
      end
    end
  end

  def show_prefecture
    @prefecture = Prefecture.find(params[:id])
    @region = @prefecture.region
    @mountains = @prefecture.mountains.yomi_asc
  end

  def show_region
    @region = Region.find(params[:id])
    @mountains = @region.prefectures.preload(:mountains).map(&:mountains).flatten.uniq.sort_by {|x| x[:yomi]}
  end

  def show_tag
    @tag = Tag.find(params[:id])
    @mountains = @tag.mountains.yomi_asc
  end

  def show_area
    @area = Area.find(params[:id])
    @mountains = @area.mountains.yomi_asc
  end
end
