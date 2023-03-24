require 'rails_helper'

RSpec.describe "UsersLogin", type: :system do
  let(:user) { create(:user) }

  before { visit login_path }

  context "with valid attributes" do
    it "succeeds and redirects to the user's page, and then is able to logout", js: true do
      fill_in "メールアドレス", with: user.email
      fill_in "パスワード (半角英数6文字以上)", with: user.password
      checkbox = find_by_id("remember-me-checkbox", visible: false)
      expect(checkbox).not_to be_checked
      within('#login-box') do
        expect(page).to have_link "新規登録", href: signup_path
      end
      click_button "ログインする"
      expect(current_path).to eq user_path(user)
      expect(page).not_to have_link "ログイン", href: login_path
      find('#menu-toggle-button').click
      within('#account-menu-list') do
        expect(page).to have_link "投稿一覧", href: posts_user_path(user)
        expect(page).to have_link "お気に入り", href: favorites_user_path(user)
        expect(page).to have_link "プロフィール", href: user_path(user)
        expect(page).to have_link "アカウント設定", href: edit_user_path(user)
        expect(page).to have_link "ログアウト", href: logout_path
        click_link "ログアウト"
      end
      expect(current_path).to eq root_path
      within('#app-header') do
        expect(page).to have_link "ログイン", href: login_path
      end
    end
  end

  context "with invalid attributes" do
    it "fails and stays", js: true do
      fill_in "メールアドレス", with: user.email
      fill_in "パスワード (半角英数6文字以上)", with: "wrong_password"
      click_button "ログインする"
      expect(current_path).to eq login_path
      expect(page).to have_content "メールアドレスまたはパスワードが正しくありません"
      expect(page).to have_content "ログイン"
      within('#app-header') do
        expect(page).to have_link "ログイン", href: login_path
      end
    end
  end
end
