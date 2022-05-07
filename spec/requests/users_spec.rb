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
    subject { post users_path, params: { user: user_attributes } }

    context "with valid attributes" do
      let(:user_attributes) { attributes_for(:user) }

      it "adds a user" do
        expect { subject }.to change(User, :count).by(1)
      end

      it "inserts a flash message" do
        subject
        expect(flash[:success]).to be_present
      end
    end

    context "with invalid attributes" do
      let(:user_attributes) { attributes_for(:user, name: "") }

      it "does not add a user" do
        expect { subject }.not_to change(User, :count)
      end
    end
  end
end
