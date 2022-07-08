require 'rails_helper'

RSpec.describe Photo, type: :model do
  let(:user) { create(:user) }
  let(:mountain) { create(:mountain) }
  let(:post) { create(:post, user_id: user.id, mountain_id: mountain.id) }
  let(:photo) { build(:photo, post_id: post.id) }
  let(:blank_post_photo) { build(:photo, post_id: "") }

  it "has a valid value" do
    expect(photo).to be_valid
  end

  it "must belong to a post" do
    expect(blank_post_photo).not_to be_valid
  end

  describe "image validation" do
    let(:blank_image_photo) { build(:photo, post_id: post.id, image: "") }

    it "rejects attributes with a blank image" do
      expect(blank_image_photo).not_to be_valid
    end
  end
end
