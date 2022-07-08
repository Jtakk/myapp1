require 'rails_helper'

RSpec.describe "Posts", type: :request do
  let(:user) { create(:user) }
  let(:mountain) { create(:mountain) }

  describe "GET /index" do
    let!(:oldest_post) do
      create(:post, user_id: user.id, mountain_id: mountain.id, created_at: Time.current)
    end
    let!(:latest_post) do
      create(:post, user_id: user.id, mountain_id: mountain.id, created_at: Time.current + 1.days)
    end

    before { get user_posts_path(user) }

    it "returns http success" do
      expect(response).to have_http_status(:success)
    end

    it "assigns the user to @user" do
      expect(controller.instance_variable_get("@user")).to eq user
    end

    it "assigns user's posts to @posts in descending order of created_at" do
      arr = [latest_post, oldest_post].
        map { |e| e.as_json(include: { mountain: { only: [:name, :yomi] } }) }
      expect(controller.instance_variable_get("@posts")).to match arr
    end
  end

  describe "GET /show" do
    let(:post) { create(:post, user_id: user.id, mountain_id: mountain.id) }

    before { get post_path(post) }

    it "returns http success" do
      expect(response).to have_http_status(:success)
    end

    it "assigns the post to @post" do
      expect(controller.instance_variable_get("@post")).to eq post
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
        post = { post: Post.last.as_json(include: [:photos, :user]) }
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
      let(:other_user) { create(:user) }

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
