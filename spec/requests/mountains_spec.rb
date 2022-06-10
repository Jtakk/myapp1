require 'rails_helper'

RSpec.describe "Mountains", type: :request do
  describe "GET /index" do
    it "returns http success" do
      get "/mountains/index"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /show" do
    it "returns http success" do
      get "/mountains/show"
      expect(response).to have_http_status(:success)
    end
  end

end
