require 'rails_helper'

RSpec.describe "PasswordResets", type: :request do
  describe "GET /new" do
    it "returns http success" do
      get new_password_reset_path
      expect(response).to have_http_status(:success)
    end
  end

  describe "POST /create" do
    let!(:user) { create(:user) }

    before { post password_resets_path, params: { password_reset: { email: email_attribute } } }

    context "with an unregistered email" do
      let(:email_attribute) { "wrong@example.com" }

      it "doesn't assign anything to @user" do
        expect(controller.instance_variable_get("@user")).to eq nil
      end

      it "doesn't save a reset_digest" do
        expect(user.reload.reset_digest).to eq nil
      end

      it "doesn't save a reset_sent_at" do
        expect(user.reload.reset_sent_at).to eq nil
      end

      it "doesn't deliver email" do
        expect(ActionMailer::Base.deliveries.size).to eq 0
      end

      it "inserts a flash message" do
        expect(flash.now[:warning]).to be_present
      end
    end

    context "with the correct email" do
      let(:email_attribute) { user.email }

      it "assigns the user to @user" do
        expect(controller.instance_variable_get("@user")).to eq user
      end

      it "saves a reset_digest" do
        expect(user.reload.reset_digest).to be_present
      end

      it "saves a reset_sent_at" do
        expect(user.reload.reset_sent_at).to be_present
      end

      it "delivers one email" do
        expect(ActionMailer::Base.deliveries.size).to eq 1
      end

      it "inserts a flash message" do
        expect(flash[:info]).to be_present
      end

      it "returns http status 302" do
        expect(response).to have_http_status(302)
      end
    end
  end

  describe "GET /edit" do
    let(:user) { create(:user) }
    let(:get_edit) { get edit_password_reset_path(reset_token, email: email_attribute) }

    before { user.create_reset_digest }

    context "with a wrong email" do
      let(:email_attribute) { "wrong@example.com" }
      let(:reset_token) { user.reset_token }

      before { get_edit }

      it "doesn't assign anything to @user" do
        expect(controller.instance_variable_get("@user")).to eq nil
      end

      it "returns http status 302" do
        expect(response).to have_http_status(302)
      end
    end

    context "with the correct email and a wrong reset_token" do
      let(:email_attribute) { user.email }
      let(:reset_token) { "wrong_reset_token" }

      before { get_edit }

      it "assigns the user to @user" do
        expect(controller.instance_variable_get("@user")).to eq user
      end

      it "returns http status 302" do
        expect(response).to have_http_status(302)
      end
    end

    context "with the correct email and the correct reset_token" do
      let(:email_attribute) { user.email }
      let(:reset_token) { user.reset_token }

      before { get_edit }

      it "assigns the user to @user" do
        expect(controller.instance_variable_get("@user")).to eq user
      end

      it "returns http success" do
        expect(response).to have_http_status(:success)
      end
    end

    context "with an expired access (more than 2 hours after creating reset_digest)" do
      let(:email_attribute) { user.email }
      let(:reset_token) { user.reset_token }

      before do
        travel_to 3.hours.after
        get_edit
      end

      it "inserts a flash message" do
        expect(flash[:warning]).to be_present
      end

      it "returns http status 302" do
        expect(response).to have_http_status(302)
      end
    end
  end

  describe "PATCH /update" do
    let(:user) { create(:user) }
    let(:patch_update) do
      patch password_reset_path(user.reset_token),
                                params: {
                                  email: user.email,
                                  user: {
                                    password: password,
                                    password_confirmation: password_confirmation,
                                  },
                                }
    end

    before { user.create_reset_digest }

    context "with an empty password" do
      let(:password) { "" }
      let(:password_confirmation) { "" }

      it "fails in editing the user password (does't allow nil passwords)" do
        expect { patch_update }.not_to change { user.reload.password_digest }
      end

      it "adds an error of blank" do
        patch_update
        expect(controller.instance_variable_get("@user").errors.messages[:password]).
          to include("を入力してください")
      end
    end

    context "with invalid attributes" do
      let(:password) { "a" * 5 }
      let(:password_confirmation) { "a" * 5 }

      it "fails in editing the user password" do
        expect { patch_update }.not_to change { user.reload.password_digest }
      end

      it "adds an error" do
        patch_update
        expect(controller.instance_variable_get("@user").errors.messages[:password]).
          to include("は6文字以上で入力してください")
      end
    end

    context "with valid attributes" do
      let(:password) { "revised_password" }
      let(:password_confirmation) { "revised_password" }

      it "succeeds in editing the user password" do
        expect { patch_update }.to change { user.reload.password_digest }
      end

      it "succeeds in login" do
        patch_update
        expect(session[:user_id]).to eq user.id
      end

      it "deletes the reset_digest" do
        patch_update
        expect(user.reload.reset_digest).to eq nil
      end

      it "inserts a flash message" do
        patch_update
        expect(flash[:success]).to be_present
      end

      it "returns http status 302" do
        patch_update
        expect(response).to have_http_status(302)
      end
    end
  end
end
