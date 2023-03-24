require 'rails_helper'

RSpec.describe "Users", type: :request do
  let!(:user) { create(:user) }
  let(:other_user) { create(:user) }

  describe "GET /new" do
    it "returns http success" do
      get signup_path
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /show" do
    before { get user_path(user) }

    it "returns http success" do
      expect(response).to have_http_status(:success)
    end

    it "assigns the user to @user" do
      expect(controller.instance_variable_get("@user")).to eq user
    end
  end

  describe "POST /create" do
    let(:post_create) { post users_path, params: { user: user_attributes } }

    context "with valid attributes" do
      let(:user_attributes) { attributes_for(:user) }

      it "adds a user" do
        expect { post_create }.to change(User, :count).by(1)
      end

      it "succeeds in login" do
        post_create
        user = User.find_by(email: user_attributes[:email])
        expect(session[:user_id]).to eq user.id
      end

      it "inserts a flash message" do
        post_create
        expect(flash[:success]).to be_present
      end

      it "returns http status 302" do
        post_create
        expect(response).to have_http_status(302)
      end
    end

    context "with invalid attributes" do
      let(:user_attributes) { attributes_for(:user, name: "") }

      it "doesn't add a user" do
        expect { post_create }.not_to change(User, :count)
      end
    end
  end

  describe "GET /edit" do
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

      it "assigns the user to @user" do
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
    let(:patch_update) { patch user_path(user), params: { user: new_user_attributes } }

    context "when not logged in" do
      let(:new_user_attributes) { attributes_for(:user, password: "", password_confirmation: "") }

      it "fails in editing a name of the user" do
        expect { patch_update }.not_to change { user.reload.name }
      end

      it "returns http status 302" do
        patch_update
        expect(response).to have_http_status(302)
      end

      it "inserts a flash message" do
        patch_update
        expect(flash[:warning]).to be_present
      end

      it "doesn't save the forwarding_url in the session for PATCH method" do
        patch_update
        expect(session[:forwarding_url]).to eq nil
      end
    end

    context "when logged in, with valid attributes (including an avatar)" do
      let(:new_user_attributes) do
        attributes_for(:user, password: "",
                              password_confirmation: "",
                              avatar: avatar)
      end
      let(:avatar) do
        Rack::Test::UploadedFile.new("#{Rails.root}/spec/fixtures/images/test_cat.png")
      end

      before { log_in_request_as(user) }

      it "succeeds in editing a name of the user (allow nil passwords)" do
        expect { patch_update }.to change { user.reload.name }
      end

      it "succeeds in editing an avatar of the user (allow nil passwords)" do
        expect { patch_update }.to change { user.reload.avatar }
      end

      it "returns http status 302" do
        patch_update
        expect(response).to have_http_status(302)
      end

      it "inserts a flash message" do
        patch_update
        expect(flash[:success]).to be_present
      end
    end

    context "when logged in, with invalid attributes" do
      let(:new_user_attributes) { attributes_for(:user, email: "wrong@example") }

      before { log_in_request_as(user) }

      it "fails in editing a name of the user" do
        expect { patch_update }.not_to change { user.reload.name }
      end
    end

    context "when logged in as wrong user" do
      let(:new_user_attributes) { attributes_for(:user, password: "", password_confirmation: "") }

      before { log_in_request_as(other_user) }

      it "fails in editing a name of the user" do
        expect { patch_update }.not_to change { user.reload.name }
      end

      it "returns http status 302" do
        patch_update
        expect(response).to have_http_status(302)
      end

      it "inserts a flash message" do
        patch_update
        expect(flash[:warning]).to be_present
      end
    end
  end

  describe "DELETE /destroy" do
    let(:delete_destroy) { delete user_path(user) }

    context "when not logged in" do
      it "doesn't delete a user" do
        expect { delete_destroy }.not_to change(User, :count)
      end

      it "returns http status 302" do
        delete_destroy
        expect(response).to have_http_status(302)
      end

      it "inserts a flash message" do
        delete_destroy
        expect(flash[:warning]).to be_present
      end

      it "doesn't save the forwarding_url in the session for DELETE method" do
        delete_destroy
        expect(session[:forwarding_url]).to eq nil
      end
    end

    context "when logged in" do
      before { log_in_request_as(user) }

      it "deletes a user" do
        expect { delete_destroy }.to change(User, :count).by(-1)
      end

      it "returns http status 302" do
        delete_destroy
        expect(response).to have_http_status(302)
      end

      it "inserts a flash message" do
        delete_destroy
        expect(flash[:success]).to be_present
      end
    end

    context "when logged in as wrong user" do
      before { log_in_request_as(other_user) }

      it "doesn't delete a user" do
        expect { delete_destroy }.not_to change(User, :count)
      end

      it "returns http status 302" do
        delete_destroy
        expect(response).to have_http_status(302)
      end

      it "inserts a flash message" do
        delete_destroy
        expect(flash[:warning]).to be_present
      end
    end
  end

  describe "GET /posts" do
    let(:mountain) { create(:mountain) }
    let!(:oldest_post) do
      create(:post, user_id: user.id, mountain_id: mountain.id, created_at: Time.current)
    end
    let!(:latest_post) do
      create(:post, user_id: user.id, mountain_id: mountain.id, created_at: Time.current + 1.days)
    end

    before { get posts_user_path(user) }

    it "returns http success" do
      expect(response).to have_http_status(:success)
    end

    it "assigns the user to @user" do
      expect(controller.instance_variable_get("@user")).to eq user
    end

    it "assigns user's posts to @posts in descending order of created_at" do
      arr = [latest_post, oldest_post].as_json(
        include: [
          { mountain: { only: [:name, :yomi] } },
          { photos: { only: [:image] } },
        ]
      )
      expect(controller.instance_variable_get("@posts")).to match arr
    end
  end

  describe "GET /favorites" do
    let(:mountain) { create(:mountain) }
    let(:oldest_post) do
      create(:post, user_id: other_user.id,
                    mountain_id: mountain.id,
                    created_at: Time.current)
    end
    let(:latest_post) do
      create(:post, user_id: other_user.id,
                    mountain_id: mountain.id,
                    created_at: Time.current + 1.days)
    end

    before do
      user.like(latest_post)
      user.like(oldest_post)
    end

    context "when not logged in" do
      before { get favorites_user_path(user) }

      it "returns http status 302" do
        expect(response).to have_http_status(302)
      end

      it "inserts a flash message" do
        expect(flash[:warning]).to be_present
      end

      it "saves the forwarding_url in the session" do
        expect(session[:forwarding_url]).to eq favorites_user_url(user)
      end
    end

    context "when logged in" do
      before do
        log_in_request_as(user)
        get favorites_user_path(user)
      end

      it "returns http success" do
        expect(response).to have_http_status(:success)
      end

      it "assigns the user to @user" do
        expect(controller.instance_variable_get("@user")).to eq user
      end

      it "assigns posts liked by the user to @posts in descending order of created_at" do
        arr = [latest_post, oldest_post].as_json(
          include: [
            { mountain: { only: [:name, :yomi] } },
            { photos: { only: [:image] } },
            { user: { only: [:id, :name, :avatar] } },
          ]
        )
        expect(controller.instance_variable_get("@posts")).to match arr
      end
    end

    context "when logged in as wrong user" do
      before do
        log_in_request_as(other_user)
        get favorites_user_path(user)
      end

      it "returns http status 302" do
        expect(response).to have_http_status(302)
      end

      it "inserts a flash message" do
        expect(flash[:warning]).to be_present
      end
    end
  end
end
