require 'rails_helper'

RSpec.describe "UsersSignup", type: :system do
  let(:valid_user_params) { attributes_for(:user) }
  let(:invalid_user_params) { attributes_for(:user, name: "") }

  before { visit signup_path }

  context "with valid attributes" do
    it "succeeds and redirects to the user's page", js: true do
      expect {
        fill_in "ニックネーム (30文字以内)", with: valid_user_params[:name]
        fill_in "メールアドレス", with: valid_user_params[:email]
        fill_in "パスワード (半角英数6文字以上)", with: valid_user_params[:password]
        fill_in "パスワード再入力", with: valid_user_params[:password_confirmation]
        click_button "アカウントを作成する"
      }.to change(User, :count).by(1)
      user = User.find_by(email: valid_user_params[:email])
      expect(current_path).to eq user_path(user.id)
      expect(page).to have_content "アカウントを作成しました。"
      expect(page).to have_content user.name
      expect(page).to have_content user.email
    end
  end

  context "with invalid attributes" do
    it "fails and stays", js: true do
      expect {
        fill_in "ニックネーム (30文字以内)", with: invalid_user_params[:name]
        fill_in "メールアドレス", with: invalid_user_params[:email]
        fill_in "パスワード (半角英数6文字以上)", with: invalid_user_params[:password]
        fill_in "パスワード再入力", with: invalid_user_params[:password_confirmation]
        click_button "アカウントを作成する"
      }.not_to change(User, :count)
      expect(page).to have_content "Sign Up"
      expect(page).to have_content "入力必須項目"
    end
  end
end
