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

    before { get user_path(user) }

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

      it "returns http status 302" do
        subject
        expect(response).to have_http_status(302)
      end
    end

    context "with invalid attributes" do
      let(:user_attributes) { attributes_for(:user, name: "") }

      it "doesn't add a user" do
        expect { subject }.not_to change(User, :count)
      end
    end
  end

  describe "GET /edit" do
    let(:user) { create(:user) }
    let(:other_user) { create(:user) }

    context "when not logged in" do
      before { get edit_user_path(user) }

      it "returns http status 302" do
        expect(response).to have_http_status(302)
      end

      it "inserts a flash message" do
        expect(flash[:warning]).to be_present
      end

      it "saves the forwarding_url in the session" do
        expect(session[:forwarding_url]).to eq edit_user_url(user)
      end
    end

    context "when logged in" do
      before do
        log_in_request_as(user)
        get edit_user_path(user)
      end

      it "returns http success" do
        expect(response).to have_http_status(:success)
      end

      it "assigns the @user" do
        expect(controller.instance_variable_get("@user")).to eq user
      end
    end

    context "when logged in as wrong user" do
      before do
        log_in_request_as(other_user)
        get edit_user_path(user)
      end

      it "returns http status 302" do
        expect(response).to have_http_status(302)
      end

      it "inserts a flash message" do
        expect(flash[:warning]).to be_present
      end
    end
  end

  describe "PATCH /update" do
    subject { patch user_path(user), params: { user: new_user_attributes } }

    let(:user) { create(:user) }
    let(:other_user) { create(:user) }

    context "when not logged in" do
      let(:new_user_attributes) { attributes_for(:user, password: "", password_confirmation: "") }

      before { subject }

      it "returns http status 302" do
        expect(response).to have_http_status(302)
      end

      it "inserts a flash message" do
        expect(flash[:warning]).to be_present
      end

      it "doesn't save the forwarding_url in the session for PATCH method" do
        expect(session[:forwarding_url]).to eq nil
      end
    end

    context "when logged in, with valid attributes" do
      let(:new_user_attributes) { attributes_for(:user, password: "", password_confirmation: "") }

      before { log_in_request_as(user) }

      it "succeeds in editing the user (allow nil passwords)" do
        expect { subject }.to change { user.reload.name }
      end

      it "returns http status 302" do
        subject
        expect(response).to have_http_status(302)
      end

      it "inserts a flash message" do
        subject
        expect(flash[:success]).to be_present
      end
    end

    context "when logged in, with invalid attributes" do
      let(:new_user_attributes) { attributes_for(:user, email: "wrong@example") }

      before { log_in_request_as(user) }

      it "fails in editing the user" do
        expect { subject }.not_to change { user.reload.name }
      end
    end

    context "when logged in as wrong user" do
      let(:new_user_attributes) { attributes_for(:user, password: "", password_confirmation: "") }

      before do
        log_in_request_as(other_user)
        subject
      end

      it "returns http status 302" do
        expect(response).to have_http_status(302)
      end

      it "inserts a flash message" do
        expect(flash[:warning]).to be_present
      end
    end
  end

  describe "DELETE /destroy" do
    subject { delete user_path(user) }

    let!(:user) { create(:user) }
    let!(:other_user) { create(:user) }

    context "when not logged in" do
      it "doesn't delete a user" do
        expect { subject }.not_to change(User, :count)
      end

      it "returns http status 302" do
        subject
        expect(response).to have_http_status(302)
      end

      it "inserts a flash message" do
        subject
        expect(flash[:warning]).to be_present
      end

      it "doesn't save the forwarding_url in the session for DELETE method" do
        subject
        expect(session[:forwarding_url]).to eq nil
      end
    end

    context "when logged in" do
      before { log_in_request_as(user) }

      it "deletes a user" do
        expect { subject }.to change(User, :count).by(-1)
      end

      it "returns http status 302" do
        subject
        expect(response).to have_http_status(302)
      end

      it "inserts a flash message" do
        subject
        expect(flash[:success]).to be_present
      end
    end

    context "when logged in as wrong user" do
      before { log_in_request_as(other_user) }

      it "doesn't delete a user" do
        expect { subject }.not_to change(User, :count)
      end

      it "returns http status 302" do
        subject
        expect(response).to have_http_status(302)
      end

      it "inserts a flash message" do
        subject
        expect(flash[:warning]).to be_present
      end
    end
  end
end
