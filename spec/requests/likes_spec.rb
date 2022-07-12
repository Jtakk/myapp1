require 'rails_helper'

RSpec.describe "Likes", type: :request do
  let(:user) { create(:user) }
  let(:other_user) { create(:user) }
  let(:mountain) { create(:mountain) }
  let(:my_post) { create(:post, user_id: user.id, mountain_id: mountain.id) }
  let(:other_post) { create(:post, user_id: other_user.id, mountain_id: mountain.id) }

  describe "GET /show" do
    let!(:like) { create(:like, user_id: user.id, post_id: other_post.id) }

    context "when not logged in" do
      before { get like_path(other_post.id) }

      it "returns http status 302" do
        expect(response).to have_http_status(302)
      end

      it "inserts a flash message" do
        expect(flash[:warning]).to be_present
      end
    end

    context "when logged in" do
      before do
        log_in_request_as(user)
        get like_path(other_post.id)
      end

      it "returns http status 200" do
        expect(response).to have_http_status(200)
      end

      it "assigns true to @like ( the user has liked the post )" do
        expect(controller.instance_variable_get("@like")).to eq true
      end

      it "assigns 1 to @count ( the post has been liked by one user )" do
        expect(controller.instance_variable_get("@count")).to eq 1
      end
    end
  end

  describe "POST /create" do
    let(:post_create) { post likes_path, params: { post: post_attributes } }

    context "when not logged in" do
      let(:post_attributes) { { id: other_post.id } }

      it "returns http status 302" do
        post_create
        expect(response).to have_http_status(302)
      end

      it "inserts a flash message" do
        post_create
        expect(flash[:warning]).to be_present
      end

      it "doesn't add a relation" do
        expect { post_create }.not_to change(Like, :count)
      end
    end

    context "when logged in, to like a post owned by the other user" do
      let(:post_attributes) { { id: other_post.id } }

      before { log_in_request_as(user) }

      it "returns http status 200" do
        post_create
        expect(response).to have_http_status(200)
      end

      it "adds a relation" do
        expect { post_create }.to change(Like, :count).by(1)
      end
    end

    context "when logged in, to like my post" do
      let(:post_attributes) { { id: my_post.id } }

      before { log_in_request_as(user) }

      it "returns http status 200" do
        post_create
        expect(response).to have_http_status(403)
      end

      it "doesn't add a relation" do
        expect { post_create }.not_to change(Like, :count)
      end
    end
  end

  describe "DELETE /destroy" do
    let(:delete_destroy) { delete like_path(other_post.id) }
    let!(:like) { create(:like, user_id: user.id, post_id: other_post.id) }

    context "when not logged in" do
      it "returns http status 302" do
        delete_destroy
        expect(response).to have_http_status(302)
      end

      it "inserts a flash message" do
        delete_destroy
        expect(flash[:warning]).to be_present
      end

      it "doesn't delete a relation" do
        expect { delete_destroy }.not_to change(Like, :count)
      end
    end

    context "when logged in" do
      before { log_in_request_as(user) }

      it "returns http status 200" do
        delete_destroy
        expect(response).to have_http_status(200)
      end

      it "deletes a relation" do
        expect { delete_destroy }.to change(Like, :count).by(-1)
      end
    end
  end
end
