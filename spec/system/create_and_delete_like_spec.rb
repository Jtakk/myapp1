require 'rails_helper'

RSpec.describe "CreateAndDeleteLike", type: :system do
  let(:mountain) { create(:mountain) }
  let(:user) { create(:user) }
  let(:other_user) { create(:user) }
  let!(:my_post) { create(:post, user_id: user.id, mountain_id: mountain.id) }
  let!(:other_post) { create(:post, :second, user_id: other_user.id, mountain_id: mountain.id) }

  context "when logged in, to like my post" do
    it "is not able to create and delete a relation", js: true do
      log_in_as(user)
      visit post_path(my_post)
      expect(page).to have_content "いいね! 0"
      expect(find('.btn-like').style('pointer-events')['pointer-events']).to eq "none"
    end
  end

  context "when logged in, to like a post owned by the other user" do
    it "succeeds in creating and deleting a relation", js: true do
      log_in_as(user)
      visit post_path(other_post)
      expect(page).to have_content "いいね! 0"
      find('.btn-like').click
      expect(page).to have_content "いいね済み 1"
      find('.btn-like').click
      expect(page).to have_content "いいね! 0"
    end
  end

  context "when not logged in" do
    it "is not able to create and delete a relation", js: true do
      visit post_path(other_post)
      expect(page).to have_content "いいね! 0"
      expect(find('.btn-like').style('pointer-events')['pointer-events']).to eq "none"
    end
  end
end
