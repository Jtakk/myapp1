require 'rails_helper'

RSpec.describe "UsersLogin", type: :system do
  let(:user) { create(:user) }

  before { visit login_path }

  it "has a link to SignUp page", js: true do
    click_link "新規登録"
    expect(current_path).to eq signup_path
  end

  context "with valid attributes" do
    it "succeeds and redirects to the user's page, and then is able to logout", js: true do
      fill_in "メールアドレス", with: user.email
      fill_in "パスワード (半角英数6文字以上)", with: user.password
      click_button "ログインする"
      expect(current_path).to eq user_path(user.id)
      expect(page).not_to have_link "ログイン", href: login_path
      find('#menu-toggle-button').click
      expect(page).to have_link "プロフィール", href: user_path(user.id)
      # expect(page).to have_link "プロフィール編集", href:
      expect(page).to have_link "ログアウト", href: logout_path
      click_link "ログアウト"
      expect(current_path).to eq root_path
      expect(page).to have_link "ログイン", href: login_path
    end
  end

  context "with invalid attributes" do
    it "fails and stays", js: true do
      fill_in "メールアドレス", with: user.email
      fill_in "パスワード (半角英数6文字以上)", with: "wrong_password"
      click_button "ログインする"
      expect(page).to have_content "メールアドレスまたはパスワードが正しくありません"
      expect(page).to have_content "Log In"
      expect(page).to have_link "ログイン", href: login_path
    end
  end
end
