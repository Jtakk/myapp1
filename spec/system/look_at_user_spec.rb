require 'rails_helper'

RSpec.describe "LookAtUser", type: :system do
  let(:mountain) { create(:mountain) }
  let(:user) { create(:user) }
  let(:other_user) { create(:user) }
  let(:my_post) { create(:post, user_id: user.id, mountain_id: mountain.id) }
  let!(:my_photo) { create(:photo, post_id: my_post.id) }
  let(:other_post) { create(:post, user_id: other_user.id, mountain_id: mountain.id) }
  let!(:other_photo) { create(:photo, post_id: other_post.id) }

  before do
    user.liked_posts << other_post
    log_in_as(user)
  end

  context "when look at my pages" do
    it "shows a side menu including links", js: true do
      visit user_path(user)
      expect(page).to have_content user.name
      expect(page).to have_content user.email
      expect(page).to have_content user.introduction
      find('#side-menu-btn').click
      within('#side-menu-list') do
        expect(page).to have_link "投稿一覧", href: posts_user_path(user)
        expect(page).to have_link "お気に入り", href: favorites_user_path(user)
        expect(page).to have_link "プロフィール", href: user_path(user)
        expect(page).to have_link "アカウント設定", href: edit_user_path(user)
        expect(page).to have_link "ログアウト", href: logout_path
      end
      click_link "投稿一覧"
      expect(current_path).to eq posts_user_path(user)
      within('#my-posts-0') do
        expect(page).to have_content mountain.yomi
        expect(page).to have_content mountain.name
        expect(page).to have_content my_post.message
        expect(page).to have_selector "img[src$='#{my_photo.image.fixed.url}']"
      end
      expect(page).to have_link nil, href: post_path(my_post)
      find('#side-menu-btn').click
      click_link "お気に入り"
      expect(current_path).to eq favorites_user_path(user)
      within('#favorite-posts-0') do
        expect(page).to have_content mountain.yomi
        expect(page).to have_content mountain.name
        expect(page).to have_content other_user.name
        expect(page).to have_content other_post.message
        expect(page).to have_selector "img[src$='#{other_photo.image.fixed.url}']"
      end
      expect(page).to have_link nil, href: post_path(other_post)
    end
  end

  context "when look at other user's pages" do
    it "shows a restricted side menu including links", js: true do
      visit user_path(other_user)
      expect(page).to have_content other_user.name
      expect(page).not_to have_content other_user.email
      expect(page).to have_content other_user.introduction
      find('#side-menu-btn').click
      within('#side-menu-list') do
        expect(page).to have_link "投稿一覧", href: posts_user_path(other_user)
        expect(page).not_to have_content "お気に入り"
        expect(page).to have_link "プロフィール", href: user_path(other_user)
        expect(page).not_to have_content "アカウント設定"
        expect(page).not_to have_content "ログアウト"
      end
      click_link "投稿一覧"
      expect(current_path).to eq posts_user_path(other_user)
      within('#my-posts-0') do
        expect(page).to have_content mountain.yomi
        expect(page).to have_content mountain.name
        expect(page).to have_content other_post.message
        expect(page).to have_selector "img[src$='#{other_photo.image.fixed.url}']"
      end
      expect(page).to have_link nil, href: post_path(other_post)
    end
  end
end
