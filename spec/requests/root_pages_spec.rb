require 'rails_helper'

RSpec.describe "RootPages", type: :request do
  number = RootPagesController::MAX_POST_COUNT

  describe "GET /home" do
    let(:user) { create(:user) }
    let(:mountain) { create(:mountain) }
    let!(:oldest_post) do
      create(:post, user_id: user.id, mountain_id: mountain.id, created_at: Time.current - 1.days)
    end
    let!(:latest_post_list) do
      create_list(:post, number, user_id: user.id,
                                 mountain_id: mountain.id,
                                 created_at: Time.current)
    end

    before { get root_path }

    it "returns http success" do
      expect(response).to have_http_status(:success)
    end

    it "assigns the limited number of posts to @posts" do
      expect(controller.instance_variable_get("@posts")).to match_array latest_post_list.as_json(
        include: [
          { mountain: { only: [:name, :yomi] } },
          { photos: { only: [:image] } },
        ]
      )
    end

    it "doesn't assign an older post to @posts" do
      expect(controller.instance_variable_get("@posts")).not_to include oldest_post.as_json(
        include: [
          { mountain: { only: [:name, :yomi] } },
          { photos: { only: [:image] } },
        ]
      )
    end
  end
end
