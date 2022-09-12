class RootPagesController < ApplicationController
  def home
    @posts = Post.latest.limit(3).as_json(
      include: [
        { mountain: { only: [:name, :yomi] } },
        { photos: { only: [:image] } },
        { user: { only: [:id, :name, :avatar] } },
        { liked_users: { only: [:id] } },
      ]
    )
  end
end
