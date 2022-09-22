class RootPagesController < ApplicationController
  MAX_POST_COUNT = 3

  def home
    @posts = Post.latest.limit(MAX_POST_COUNT).as_json(
      include: [
        { mountain: { only: [:name, :yomi] } },
        { photos: { only: [:image] } },
        { user: { only: [:id, :name, :avatar] } },
        { liked_users: { only: [:id] } },
      ]
    )
  end
end
