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

      it "assigns the user to @user" do
        expect(controller.instance_variable_get("@user")).to eq user
      end

      it "succeeds in login" do
        expect(session[:user_id]).to eq user.id
      end

      it "saves cookies[:user_id] for long-term login" do
        expect(cookies[:user_id]).to be_present
      end

      it "saves cookies[:remember_token] for long-term login" do
        expect(cookies[:remember_token]).
          to eq controller.instance_variable_get("@user").remember_token
      end

      it "saves a remember_digest for long-term login" do
        expect(user.reload.remember_digest).to be_present
      end

      it "returns http status 302" do
        expect(response).to have_http_status(302)
      end
    end

    context "with valid attributes" do
      before { log_in_request_as(user, remember_me: '') }

      it "assigns the user to @user" do
        expect(controller.instance_variable_get("@user")).to eq user
      end

      it "succeeds in login" do
        expect(session[:user_id]).to eq user.id
      end

      it "doesn't save cookies[:user_id] for long-term login" do
        expect(cookies[:user_id]).to eq nil
      end

      it "doesn't save cookies[:remember_token] for long-term login" do
        expect(cookies[:remember_token]).to eq nil
      end

      it "doesn't save a remember_digest for long-term login" do
        expect(user.reload.remember_digest).to eq nil
      end

      it "returns http status 302" do
        expect(response).to have_http_status(302)
      end
    end

    context "with an unregistered email and remember_me" do
      before { log_in_request_as(user, email: "wrong@example.com", remember_me: 'on') }

      it "doesn't assign anything to @user" do
        expect(controller.instance_variable_get("@user")).to eq nil
      end

      it "fails in login" do
        expect(session[:user_id]).to eq nil
      end

      it "inserts a flash message" do
        expect(flash.now[:error]).to be_present
      end

      it "doesn't save cookies[:user_id] for long-term login" do
        expect(cookies[:user_id]).to eq nil
      end

      it "doesn't save cookies[:remember_token] for long-term login" do
        expect(cookies[:remember_token]).to eq nil
      end

      it "doesn't save a remember_digest for long-term login" do
        expect(user.reload.remember_digest).to eq nil
      end
    end

    context "with an invalid password and remember_me" do
      before { log_in_request_as(user, password: "wrong_password", remember_me: 'on') }

      it "assigns the user to @user" do
        expect(controller.instance_variable_get("@user")).to eq user
      end

      it "fails in login" do
        expect(session[:user_id]).to eq nil
      end

      it "inserts a flash message" do
        expect(flash.now[:error]).to be_present
      end

      it "doesn't save cookies[:user_id] for long-term login" do
        expect(cookies[:user_id]).to eq nil
      end

      it "doesn't save cookies[:remember_token] for long-term login" do
        expect(cookies[:remember_token]).to eq nil
      end

      it "doesn't save a remember_digest for long-term login" do
        expect(user.reload.remember_digest).to eq nil
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
    end

    it "deletes cookies[:user_id] for long-term logout" do
      expect(cookies[:user_id]).to be_empty
    end

    it "deletes cookies[:remember_token] for long-term logout" do
      expect(cookies[:remember_token]).to be_empty
    end

    it "deletes a remember_digest for long-term logout" do
      expect(user.reload.remember_digest).to eq nil
    end

    it "doesn't raise an error if logout in another window" do
      delete logout_path
      expect(session[:user_id]).to eq nil
    end

    it "returns http status 302" do
      expect(response).to have_http_status(302)
    end
  end
end
