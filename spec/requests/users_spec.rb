require 'rails_helper'

RSpec.describe "Users", type: :request do
  describe "GET /new" do
    it "returns http success" do
      get signup_path
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /show" do
    let(:user) { create(:user) }

    before { get user_path(user.id) }

    it "returns http success" do
      expect(response).to have_http_status(:success)
    end

    it "assigns the @user" do
      expect(controller.instance_variable_get("@user")).to eq user
    end
  end

  describe "POST /create" do
    let(:valid_user_params) { attributes_for(:user) }
    let(:invalid_user_params) { attributes_for(:user, name: "") }

    context "with valid attributes" do
      it "adds a user" do
        expect {
          post users_path, params: { user: valid_user_params }
        }.to change(User, :count).by(1)
      end
    end

    context "with invalid attributes" do
      it "does not add a user" do
        expect {
          post users_path, params: { user: invalid_user_params }
        }.not_to change(User, :count)
      end
    end
  end
end
