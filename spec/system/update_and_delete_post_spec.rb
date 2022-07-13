require 'rails_helper'

RSpec.describe "UpdateAndDeletePost", type: :system do
  let(:user) { create(:user) }
  let(:other_user) { create(:user) }
  let(:mountain) { create(:mountain) }
  let(:my_post) { create(:post, user_id: user.id, mountain_id: mountain.id) }
  let(:other_post) { create(:post, user_id: other_user.id, mountain_id: mountain.id) }

  context "when logged in as an owner of the post" do
    it "succeeds in updating and deleting the post", js: true do
      log_in_as(user)
      visit post_path(my_post)
      expect(page).to have_content my_post.message
      click_button "メッセージを編集"
      fill_in "メッセージ", with: "revised message"
      click_button "キャンセル"
      expect(page).not_to have_content "revised message"
      click_button "メッセージを編集"
      fill_in "メッセージ", with: "revised message"
      click_button "変更を保存する"
      expect(page).to have_content "メッセージを更新しました。"
      expect(page).to have_content "revised message"
      click_button "投稿を削除"
      click_button "キャンセル"
      expect(page).to have_content "revised message"
      click_button "投稿を削除"
      click_button "削除する"
      expect(page).to have_content "投稿を削除しました。"
      expect(current_path).to eq user_posts_path(user)
      expect(page).not_to have_content "revised message"
    end
  end

  context "when not logged in or logged in not as an owner of the post" do
    it "is not able to update and delete the post", js: true do
      visit post_path(my_post)
      expect(page).to have_content my_post.message
      expect(page).not_to have_selector 'button', text: "メッセージを編集"
      expect(page).not_to have_selector 'button', text: "投稿を削除"
      log_in_as(user)
      visit post_path(other_post)
      expect(page).to have_content other_post.message
      expect(page).not_to have_selector 'button', text: "メッセージを編集"
      expect(page).not_to have_selector 'button', text: "投稿を削除"
    end
  end
end
