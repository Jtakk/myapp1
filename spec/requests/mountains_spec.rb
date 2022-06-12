require 'rails_helper'

RSpec.describe "Mountains", type: :request do
  let(:mountain) { create(:mountain) }

  describe "GET /index" do
    before do
      mountain
      get mountains_path
    end

    it "returns http success" do
      expect(response).to have_http_status(:success)
    end

    it "assigns the @mountains" do
      expect(controller.instance_variable_get("@mountains")).to include mountain
    end
  end

  describe "GET /show" do
    before { get mountain_path(mountain) }

    it "returns http success" do
      expect(response).to have_http_status(:success)
    end

    it "assigns the @mountain" do
      expect(controller.instance_variable_get("@mountain")).to eq mountain
    end
  end
end
