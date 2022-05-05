require 'rails_helper'

RSpec.describe "Sessions", type: :request do
  let(:user) { create(:user) }

  describe "GET /new" do
    it "returns http success" do
      get login_path
      expect(response).to have_http_status(:success)
    end
  end

  describe "POST /create" do
    it "succeeds in login with valid attributes" do
      post login_path, params: { session: { email: user.email, password: user.password } }
      expect(session[:user_id]).to eq user.id
    end
    it "fails to login with an unregistered email" do
      post login_path, params: { session: { email: "wrong@example.com", password: user.password } }
      expect(session[:user_id]).to eq nil
    end
    it "fails to login with an invalid password" do
      post login_path, params: { session: { email: user.email, password: "wrong_password" } }
      expect(session[:user_id]).to eq nil
    end
  end

  describe "DELETE /destroy" do
    before do
      post login_path, params: { session: { email: user.email, password: user.password } }
      delete logout_path
    end

    it "succeeds in logout" do
      expect(session[:user_id]).to eq nil
    end

    it "doesn't raise an error if logout in another window" do
      delete logout_path
      expect(session[:user_id]).to eq nil
    end
  end
end
