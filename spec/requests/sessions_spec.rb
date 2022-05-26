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
    context "with valid attributes and remember_me" do
      before { log_in_request_as(user, remember_me: 'on') }

      it "succeeds in login" do
        expect(session[:user_id]).to eq user.id
      end

      it "succeeds in long-term login" do
        expect(cookies[:remember_token]).
          to eq controller.instance_variable_get("@user").remember_token
      end
    end

    context "with valid attributes" do
      before { log_in_request_as(user, remember_me: '') }

      it "succeeds in login" do
        expect(session[:user_id]).to eq user.id
      end

      it "fails in long-term login" do
        expect(cookies[:remember_token]).to eq nil
      end
    end

    context "with an unregistered email" do
      before { log_in_request_as(user, email: "wrong@example.com") }

      it "fails in login" do
        expect(session[:user_id]).to eq nil
      end

      it "inserts a flash message" do
        expect(flash.now[:error]).to be_present
      end
    end

    context "with an invalid password" do
      before { log_in_request_as(user, password: "wrong_password") }

      it "fails in login" do
        expect(session[:user_id]).to eq nil
      end

      it "inserts a flash message" do
        expect(flash.now[:error]).to be_present
      end
    end
  end

  describe "DELETE /destroy" do
    before do
      log_in_request_as(user, remember_me: 'on')
      delete logout_path
    end

    it "succeeds in logout" do
      expect(session[:user_id]).to eq nil
      expect(cookies[:remember_token]).to be_empty
    end

    it "doesn't raise an error if logout in another window" do
      delete logout_path
      expect(session[:user_id]).to eq nil
    end
  end
end
