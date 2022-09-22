require 'rails_helper'

RSpec.describe "RootPages", type: :request do
  number = RootPagesController::MAX_POST_COUNT

  describe "GET /home" do
    let(:user) { create(:user) }
    let(:mountain) { create(:mountain) }
    let!(:post_list) { create_list(:post, number + 1, user_id: user.id, mountain_id: mountain.id) }

    before { get root_path }

    it "returns http success" do
      expect(response).to have_http_status(:success)
    end

    it "assigns the limited number of posts to @posts" do
      expect(controller.instance_variable_get("@posts")).to match_array post_list.drop(1).as_json(
        include: [
          { mountain: { only: [:name, :yomi] } },
          { photos: { only: [:image] } },
          { user: { only: [:id, :name, :avatar] } },
          { liked_users: { only: [:id] } },
        ]
      )
    end

    it "doesn't assign the post to @posts" do
      expect(controller.instance_variable_get("@posts")).not_to include post_list.first.as_json(
        include: [
          { mountain: { only: [:name, :yomi] } },
          { photos: { only: [:image] } },
          { user: { only: [:id, :name, :avatar] } },
          { liked_users: { only: [:id] } },
        ]
      )
    end
  end
end
