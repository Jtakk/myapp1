require 'rails_helper'

RSpec.describe Post, type: :model do
  let(:user) { create(:user) }
  let(:mountain) { create(:mountain) }
  let(:post) { build(:post, user_id: user.id, mountain_id: mountain.id) }
  let(:blank_user_post) { build(:post, user_id: "", mountain_id: mountain.id) }
  let(:blank_mountain_post) { build(:post, user_id: user.id, mountain_id: "") }

  it "has a valid value" do
    expect(post).to be_valid
  end

  it "must belong to a user" do
    expect(blank_user_post).not_to be_valid
  end

  it "must belong to a mountain" do
    expect(blank_mountain_post).not_to be_valid
  end

  it "is depended on by photos" do
    post.save
    create(:photo, post_id: post.id)
    expect { post.destroy }.to change(Photo, :count).by(-1)
  end

  describe "latitude validation" do
    let(:blank_latitude_post) do
      build(:post, user_id: user.id, mountain_id: mountain.id, latitude: "")
    end

    it "rejects attributes with a blank latitude" do
      expect(blank_latitude_post).not_to be_valid
    end
  end

  describe "longitude validation" do
    let(:blank_longitude_post) do
      build(:post, user_id: user.id, mountain_id: mountain.id, longitude: "")
    end

    it "rejects attributes with a blank longitude" do
      expect(blank_longitude_post).not_to be_valid
    end
  end

  describe "the 'latest' scope" do
    let(:oldest_post) do
      create(:post, user_id: user.id, mountain_id: mountain.id, created_at: Time.current)
    end
    let(:latest_post) do
      create(:post, user_id: user.id, mountain_id: mountain.id, created_at: Time.current + 1.days)
    end

    it "returns posts sorted by created_at from newest to oldest" do
      latest_post
      oldest_post
      expect(Post.latest).to match [latest_post, oldest_post]
    end
  end
end
