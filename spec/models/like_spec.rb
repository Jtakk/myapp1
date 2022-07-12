require 'rails_helper'

RSpec.describe Like, type: :model do
  let(:user) { create(:user) }
  let(:other_user) { create(:user) }
  let(:mountain) { create(:mountain) }
  let(:post) { create(:post, user_id: other_user.id, mountain_id: mountain.id) }
  let(:like) { build(:like, user_id: user.id, post_id: post.id) }
  let(:blank_user_like) { build(:like, user_id: "", post_id: post.id) }
  let(:blank_post_like) { build(:like, user_id: user.id, post_id: "") }

  it "has a valid value" do
    expect(like).to be_valid
  end

  it "must belong to a user" do
    expect(blank_user_like).not_to be_valid
  end

  it "must belong to a post" do
    expect(blank_post_like).not_to be_valid
  end
end
