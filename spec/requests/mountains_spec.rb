require 'rails_helper'

RSpec.describe "Mountains", type: :request do
  let(:mountain) { create(:mountain) }

  describe "GET /index" do
    let(:path) { mountains_path }
    let(:path_with_query) { "/mountains" + query_parameter }

    context "without the query parameter" do
      before { get path }

      it "returns http success and assigns zero to @tab" do
        expect(response).to have_http_status(:success)
        expect(controller.instance_variable_get("@tab")).to eq 0
      end
    end

    context "when the query parameter is 0" do
      let(:query_parameter) { "?tab=0" }

      before { get path_with_query }

      it "returns http success and assigns the query parameter to @tab" do
        expect(response).to have_http_status(:success)
        expect(controller.instance_variable_get("@tab")).to eq 0
      end
    end

    context "when the query parameter is 1" do
      let(:query_parameter) { "?tab=1" }

      before { get path_with_query }

      it "returns http success and assigns the query parameter to @tab" do
        expect(response).to have_http_status(:success)
        expect(controller.instance_variable_get("@tab")).to eq 1
      end
    end

    context "when the query parameter is 2" do
      let(:query_parameter) { "?tab=2" }

      before { get path_with_query }

      it "returns http success and assigns the query parameter to @tab" do
        expect(response).to have_http_status(:success)
        expect(controller.instance_variable_get("@tab")).to eq 2
      end
    end

    context "when the query parameter is 3" do
      let(:query_parameter) { "?tab=3" }

      before { get path_with_query }

      it "returns http success and assigns the query parameter to @tab" do
        expect(response).to have_http_status(:success)
        expect(controller.instance_variable_get("@tab")).to eq 3
      end
    end
  end

  describe "GET /show" do
    let(:user) { create(:user) }
    let!(:post_1) { create(:post, user_id: user.id, mountain_id: mountain.id) }
    let!(:post_2) { create(:post, :second, user_id: user.id, mountain_id: mountain.id) }

    before { get mountain_path(mountain) }

    it "returns http success" do
      expect(response).to have_http_status(:success)
    end

    it "assigns the mountain to @mountain" do
      expect(controller.instance_variable_get("@mountain")).to eq mountain
    end

    it "assigns the posts @posts" do
      expect(controller.instance_variable_get("@posts")).
        to match_array [post_1, post_2].as_json(include: [:photos, :user])
    end
  end

  describe "GET /search" do
    let!(:mountain_1) { create(:mountain, name: "富士山", yomi: "ふじさん") }
    let!(:mountain_2) { create(:mountain, name: "伊吹山", yomi: "いぶきやま") }

    before { get ("/mountains/search" + query_parameter) }

    context "when the query parameter is empty" do
      let(:query_parameter) { "?keyword=" }

      it "returns http success" do
        expect(response).to have_http_status(:success)
      end

      it "assigns the empty array to @mountains" do
        expect(controller.instance_variable_get("@mountains")).to be_empty
      end
    end

    context "when the query parameter is 2 words" do
      let(:query_parameter) { "?keyword=#{CGI::escape("富　山")}" }

      it "returns http success" do
        expect(response).to have_http_status(:success)
      end

      it "assigns the mountain to @mountains" do
        expect(controller.instance_variable_get("@mountains")).to match_array [mountain_1]
      end
    end
  end

  describe "GET /show_prefecture" do
    let(:region) { create(:region) }
    let(:prefecture) { create(:prefecture, region_id: region.id) }

    before do
      mountain.prefectures << prefecture
      get mountain_prefecture_path(prefecture)
    end

    it "returns http success" do
      expect(response).to have_http_status(:success)
    end

    it "assigns the prefecture to @prefecture" do
      expect(controller.instance_variable_get("@prefecture")).to eq prefecture
    end

    it "assigns the region to @region" do
      expect(controller.instance_variable_get("@region")).to eq region
    end

    it "assigns the mountain to @mountains" do
      expect(controller.instance_variable_get("@mountains")).to include mountain
    end
  end

  describe "GET /show_region" do
    let(:region) { create(:region) }
    let(:prefecture_1) { create(:prefecture, region_id: region.id) }
    let(:mountain_1) { create(:mountain, id: 1, yomi: "い") }
    let(:prefecture_2) { create(:prefecture, region_id: region.id) }
    let(:mountain_2) { create(:mountain, id: 2, yomi: "あ") }

    before do
      mountain_1.prefectures << prefecture_1
      mountain_2.prefectures << prefecture_2
      get mountain_region_path(region)
    end

    it "returns http success" do
      expect(response).to have_http_status(:success)
    end

    it "assigns the region to @region" do
      expect(controller.instance_variable_get("@region")).to eq region
    end

    it "assigns the mountains to @mountains in ascending order of yomi" do
      expect(controller.instance_variable_get("@mountains")).to match [mountain_2, mountain_1]
    end
  end

  describe "GET /show_tag" do
    let(:tag) { create(:tag) }

    before do
      mountain.tags << tag
      get mountain_tag_path(tag)
    end

    it "returns http success" do
      expect(response).to have_http_status(:success)
    end

    it "assigns the tag to @tag" do
      expect(controller.instance_variable_get("@tag")).to eq tag
    end

    it "assigns the mountain to @mountains" do
      expect(controller.instance_variable_get("@mountains")).to include mountain
    end
  end

  describe "GET /show_area" do
    let(:area) { create(:area) }

    before do
      mountain.areas << area
      get mountain_area_path(area)
    end

    it "returns http success" do
      expect(response).to have_http_status(:success)
    end

    it "assigns the area to @area" do
      expect(controller.instance_variable_get("@area")).to eq area
    end

    it "assigns the mountain to @mountains" do
      expect(controller.instance_variable_get("@mountains")).to include mountain
    end
  end
end
