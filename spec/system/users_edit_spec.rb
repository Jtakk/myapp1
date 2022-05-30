require 'rails_helper'

RSpec.describe "UsersEdit", type: :system do
  let(:user) { create(:user) }

  context "when logged in as correct user" do
    let(:revised_user_params) do
      attributes_for(:user, name: "revised_name",
                            email: "revised_email@example.com",
                            introduction: "Revised!",
                            avatar: avatar)
    end
    let(:avatar) { "#{Rails.root}/spec/fixtures/images/test_cat.png" }
    let(:invalid_user_params) do
      attributes_for(:user, password: "wrong", password_confirmation: "wrong")
    end

    it "redirects to the page correctly by friendly forwarding,
          and succeeds in editing a user with valid attributes", js: true do
      visit edit_user_path(user)
      expect(current_path).to eq login_path
      expect(page).to have_content "ログインしてください"
      log_in_as(user)
      expect(current_path).to eq edit_user_path(user)
      attach_file "画像を設定する", revised_user_params[:avatar], make_visible: true
      fill_in "ニックネーム (30文字以内)", with: revised_user_params[:name]
      fill_in "メールアドレス", with: revised_user_params[:email]
      fill_in "紹介文", with: revised_user_params[:introduction]
      click_button "変更を保存する"
      expect(current_path).to eq user_path(user)
      expect(page).to have_content "アカウント設定を更新しました。"
      expect(page).to have_selector "img[src$='#{user.reload.avatar.thumb.url}']"
      expect(page).to have_selector "img[src$='#{user.reload.avatar.url}']"
      expect(page).to have_content revised_user_params[:name]
      expect(page).to have_content revised_user_params[:email]
      expect(page).to have_content revised_user_params[:introduction]
      within('#side-menu-list') do
        click_link "ログアウト"
      end
      log_in_as(user, email: revised_user_params[:email])
      expect(current_path).to eq user_path(user)
    end

    it "fails and stay with invalid attributes", js: true do
      log_in_as(user)
      expect(current_path).to eq user_path(user)
      visit edit_user_path(user)
      fill_in "ニックネーム (30文字以内)", with: invalid_user_params[:name]
      fill_in "メールアドレス", with: invalid_user_params[:email]
      fill_in "パスワード (半角英数6文字以上)", with: invalid_user_params[:password]
      fill_in "パスワード再入力", with: invalid_user_params[:password_confirmation]
      click_button "変更を保存する"
      expect(page).to have_content "パスワードは6文字以上で入力してください"
    end
  end

  context "when logged in as wrong user" do
    let(:other_user) { create(:user) }

    it "fails and redirects to the root page", js: true do
      log_in_as(other_user)
      visit edit_user_path(user)
      expect(current_path).to eq root_path
      expect(page).to have_content "保護されたページです"
    end
  end
end
