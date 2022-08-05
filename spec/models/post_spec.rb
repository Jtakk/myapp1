require 'rails_helper'

RSpec.describe Post, type: :model do
  let(:user) { create(:user) }
  let(:other_user) { create(:user) }
  let(:mountain) { create(:mountain) }
  let(:my_post) { build(:post, user_id: user.id, mountain_id: mountain.id) }
  let(:other_post) { create(:post, :second, user_id: other_user.id, mountain_id: mountain.id) }
  let(:blank_user_post) { build(:post, user_id: "", mountain_id: mountain.id) }
  let(:blank_mountain_post) { build(:post, user_id: user.id, mountain_id: "") }
  let(:like) { create(:like, user_id: user.id, post_id: other_post.id) }

  it "has a valid value" do
    expect(my_post).to be_valid
  end

  it "must belong to a user" do
    expect(blank_user_post).not_to be_valid
  end

  it "must belong to a mountain" do
    expect(blank_mountain_post).not_to be_valid
  end

  it "is depended on by photos" do
    my_post.save
    create(:photo, post_id: my_post.id)
    expect { my_post.destroy }.to change(Photo, :count).by(-1)
  end

  it "is depended on by likes" do
    like
    expect { other_post.destroy }.to change(Like, :count).by(-1)
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
      create(:post, id: 1, user_id: user.id, mountain_id: mountain.id, created_at: Time.current)
    end
    let(:latest_post) do
      create(:post, id: 2, user_id: user.id, mountain_id: mountain.id, created_at: Time.current + 1.days)
    end

    it "returns posts in ascending order of ID" do
      expect(Post.all).to match [oldest_post, latest_post]
    end

    it "returns posts sorted by created_at from newest to oldest" do
      expect(Post.all.latest).to match [latest_post, oldest_post]
    end
  end
end
