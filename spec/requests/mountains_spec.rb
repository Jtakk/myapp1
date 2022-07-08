require 'rails_helper'

RSpec.describe "Mountains", type: :request do
  let!(:mountain) { create(:mountain) }

  describe "GET /index" do
    before { get mountains_path }

    it "returns http success" do
      expect(response).to have_http_status(:success)
    end

    it "assigns the @mountains" do
      expect(controller.instance_variable_get("@mountains")).to include mountain
    end
  end

  describe "GET /show" do
    let(:user) { create(:user) }
    let!(:posts) { create_list(:post, 3, user_id: user.id, mountain_id: mountain.id) }

    before { get mountain_path(mountain) }

    it "returns http success" do
      expect(response).to have_http_status(:success)
    end

    it "assigns the @mountain" do
      expect(controller.instance_variable_get("@mountain")).to eq mountain
    end

    it "assigns the @posts" do
      expect(controller.instance_variable_get("@posts")).
        to match_array posts.as_json(include: [:photos, :user])
    end
  end
end
