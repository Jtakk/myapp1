require 'rails_helper'

RSpec.describe "Posts", type: :request do
  let(:user) { create(:user) }
  let(:other_user) { create(:user) }
  let(:mountain) { create(:mountain) }

  describe "GET /show" do
    let(:post) { create(:post, user_id: user.id, mountain_id: mountain.id) }
    let!(:photo) { create(:photo, post_id: post.id) }

    before { get post_path(post) }

    it "returns http success" do
      expect(response).to have_http_status(:success)
    end

    it "assigns the post to @post" do
      expect(controller.instance_variable_get("@post")).to eq post
    end

    it "assigns the mountain to @mountain" do
      expect(controller.instance_variable_get("@mountain")).
        to eq mountain.as_json(include: [:prefectures, :areas, :tags])
    end

    it "assigns the user to @user" do
      expect(controller.instance_variable_get("@user")).to eq user
    end

    it "assigns the photos to @photos" do
      expect(controller.instance_variable_get("@photos")).to match_array [photo]
    end
  end

  describe "POST /create" do
    let(:post_create) do
      post posts_path, params: { post: post_attributes, photo: { image: image_array } }
    end
    let(:post_create_without_photos) { post posts_path, params: { post: post_attributes } }

    context "when not logged in" do
      let(:post_attributes) { attributes_for(:post, mountain_id: mountain.id) }
      let(:image_array) do
        Array.new(10) do
          Rack::Test::UploadedFile.new("#{Rails.root}/spec/fixtures/images/test_photo_1.png")
        end
      end

      it "returns http status 302" do
        post_create
        expect(response).to have_http_status(302)
      end

      it "inserts a flash message" do
        post_create
        expect(flash[:warning]).to be_present
      end

      it "doesn't add a post" do
        expect { post_create }.not_to change(Post, :count)
      end

      it "doesn't add photos" do
        expect { post_create }.not_to change(Photo, :count)
      end
    end

    context "when logged in, with valid attributes" do
      let(:post_attributes) { attributes_for(:post, mountain_id: mountain.id) }
      let(:image_array) do
        Array.new(10) do
          Rack::Test::UploadedFile.new("#{Rails.root}/spec/fixtures/images/test_photo_1.png")
        end
      end

      before { log_in_request_as(user) }

      it "returns http status 200" do
        post_create
        expect(response).to have_http_status(200)
      end

      it "adds a post" do
        expect { post_create }.to change(Post, :count).by(1)
      end

      it "adds photos" do
        expect { post_create }.to change(Photo, :count).by(10)
      end

      it "assigns the post to @data" do
        post_create
        post = {
          post: Post.last.as_json(
            include: [
              { photos: { only: [:image] } },
              { user: { only: [:id, :name, :avatar] } },
              { liked_users: { only: [:id] } },
            ]
          ),
        }
        expect(controller.instance_variable_get("@data")).to include(post)
      end

      it "assigns a flash message to @data" do
        post_create
        flash = { flash: { message_type: "success", message: "投稿しました。" } }
        expect(controller.instance_variable_get("@data")).to include(flash)
      end
    end

    context "when logged in, with invalid post attributes" do
      let(:post_attributes) { attributes_for(:post, mountain_id: "") }
      let(:image_array) do
        Array.new(10) do
          Rack::Test::UploadedFile.new("#{Rails.root}/spec/fixtures/images/test_photo_1.png")
        end
      end

      before { log_in_request_as(user) }

      it "returns http status 200" do
        post_create
        expect(response).to have_http_status(200)
      end

      it "doesn't add a post" do
        expect { post_create }.not_to change(Post, :count)
      end

      it "doesn't add photos" do
        expect { post_create }.not_to change(Photo, :count)
      end

      it "doesn't assign the post to @data" do
        post_create
        expect(controller.instance_variable_get("@data")).to include(post: nil)
      end

      it "assigns a flash message to @data" do
        post_create
        flash = { flash: { message_type: "warning", message: "投稿に失敗しました。" } }
        expect(controller.instance_variable_get("@data")).to include(flash)
      end
    end

    context "when logged in, without photos" do
      let(:post_attributes) { attributes_for(:post, mountain_id: mountain.id) }

      before { log_in_request_as(user) }

      it "returns http status 200" do
        post_create_without_photos
        expect(response).to have_http_status(200)
      end

      it "doesn't add a post" do
        expect { post_create_without_photos }.not_to change(Post, :count)
      end

      it "doesn't add photos" do
        expect { post_create_without_photos }.not_to change(Photo, :count)
      end

      it "doesn't assign the post to @data" do
        post_create_without_photos
        expect(controller.instance_variable_get("@data")).to include(post: nil)
      end

      it "assigns a flash message to @data" do
        post_create_without_photos
        flash = { flash: { message_type: "warning", message: "投稿に失敗しました。" } }
        expect(controller.instance_variable_get("@data")).to include(flash)
      end
    end

    context "when logged in, with photos more than 10" do
      let(:post_attributes) { attributes_for(:post, mountain_id: mountain.id) }
      let(:image_array) do
        Array.new(11) do
          Rack::Test::UploadedFile.new("#{Rails.root}/spec/fixtures/images/test_photo_1.png")
        end
      end

      before { log_in_request_as(user) }

      it "returns http status 200" do
        post_create
        expect(response).to have_http_status(200)
      end

      it "doesn't add a post" do
        expect { post_create }.not_to change(Post, :count)
      end

      it "doesn't add photos" do
        expect { post_create }.not_to change(Photo, :count)
      end

      it "doesn't assign the post to @data" do
        post_create
        expect(controller.instance_variable_get("@data")).to include(post: nil)
      end

      it "assigns a flash message to @data" do
        post_create
        flash = { flash: { message_type: "warning", message: "投稿に失敗しました。" } }
        expect(controller.instance_variable_get("@data")).to include(flash)
      end
    end
  end

  describe "PATCH /update" do
    let!(:my_post) { create(:post, user_id: user.id, mountain_id: mountain.id) }
    let(:patch_update) { patch post_path(my_post), params: new_post_attributes }

    context "when not logged in" do
      let(:new_post_attributes) { { post: { message: "new message" } } }

      it "fails in editing a message of the post" do
        expect { patch_update }.not_to change { my_post.reload.message }
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

    context "when logged in" do
      let(:new_post_attributes) { { post: { message: "new message" } } }

      before { log_in_request_as(user) }

      it "succeeds in editing a message of the post" do
        expect { patch_update }.to change { my_post.reload.message }
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

    context "when logged in, with an attribute not permitted" do
      let(:new_post_attributes) do
        { post: { message: "new message", latitude: my_post.latitude + 1.to_d } }
      end

      before { log_in_request_as(user) }

      it "fails in editing an attribute not permitted of the post" do
        expect { patch_update }.not_to change { my_post.reload.latitude }
      end

      it "succeeds in editing a message of the post" do
        expect { patch_update }.to change { my_post.reload.message }
      end
    end

    context "when logged in as wrong user" do
      let(:new_post_attributes) { { post: { message: "new message" } } }

      before { log_in_request_as(other_user) }

      it "fails in editing a message of the post" do
        expect { patch_update }.not_to change { my_post.reload.message }
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
    let!(:my_post) { create(:post, user_id: user.id, mountain_id: mountain.id) }
    let(:delete_destroy) { delete post_path(my_post) }

    context "when not logged in" do
      it "doesn't delete a post" do
        expect { delete_destroy }.not_to change(Post, :count)
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

      it "deletes a post" do
        expect { delete_destroy }.to change(Post, :count).by(-1)
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

      it "doesn't delete a post" do
        expect { delete_destroy }.not_to change(Post, :count)
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
end
