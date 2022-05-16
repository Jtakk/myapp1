require 'rails_helper'

RSpec.describe "UsersEdit", type: :system do
  include LogInRequestSupport
  let(:user) { create(:user) }

  context "when logged in" do
    let(:revised_user_params) do
      attributes_for(:user, name: "revised_name",
                            email: "revised_email@example.com",
                            introduction: "Revised!")
    end
    let(:invalid_user_params) do
      attributes_for(:user, password: "wrong", password_confirmation: "wrong")
    end

    before do
      log_in_as(user)
      visit edit_user_path(user)
    end

    it "succeeds and redirects to the user's page with valid attributes", js: true do
      fill_in "ニックネーム (30文字以内)", with: revised_user_params[:name]
      fill_in "メールアドレス", with: revised_user_params[:email]
      fill_in "紹介文", with: revised_user_params[:introduction]
      click_button "変更を保存する"
      expect(current_path).to eq user_path(user)
      expect(page).to have_content "アカウント設定を更新しました。"
      expect(page).to have_content revised_user_params[:name]
      expect(page).to have_content revised_user_params[:email]
      expect(page).to have_content revised_user_params[:introduction]
    end

    it "fails and stay with invalid attributes", js: true do
      fill_in "ニックネーム (30文字以内)", with: invalid_user_params[:name]
      fill_in "メールアドレス", with: invalid_user_params[:email]
      fill_in "パスワード (半角英数6文字以上)", with: invalid_user_params[:password]
      fill_in "パスワード再入力", with: invalid_user_params[:password_confirmation]
      click_button "変更を保存する"
      expect(page).to have_content "パスワードは6文字以上で入力してください"
    end
  end

  context "when not logged in" do
    before { visit edit_user_path(user) }

    it "fails and redirects to the login page", js: true do
      expect(current_path).to eq login_path
      expect(page).to have_content "ログインしてください"
    end
  end
end
