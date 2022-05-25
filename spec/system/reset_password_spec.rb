require 'rails_helper'

RSpec.describe "ResetPassword", type: :system do
  let(:user) { create(:user) }

  it "succeeds in resetting the password", js: true do
    visit login_path
    click_link "パスワードをお忘れの方はこちら"
    expect(current_path).to eq new_password_reset_path
    fill_in "メールアドレス", with: "wrong@example.com"
    click_button "メールを送信する"
    expect(page).to have_content "登録されていないメールアドレスです。"
    fill_in "メールアドレス", with: user.email
    click_button "メールを送信する"
    expect(current_path).to eq root_path
    expect(page).to have_content "パスワード再設定案内のメールを送信しました。"
    expect(ActionMailer::Base.deliveries.last.to).to eq [user.email]
    link = URI.extract(ActionMailer::Base.deliveries.last.text_part.body.encoded)[0]
    visit link
    expect(page).to have_content "パスワード再設定"
    fill_in "パスワード (半角英数6文字以上)", with: ""
    fill_in "パスワード再入力", with: ""
    click_button "パスワードを再設定する"
    expect(page).to have_content "入力必須項目"
    fill_in "パスワード (半角英数6文字以上)", with: "revised_password"
    fill_in "パスワード再入力", with: "revised_password"
    click_button "パスワードを再設定する"
    expect(page).to have_content "パスワードを再設定しました。"
    expect(current_path).to eq user_path(user)
  end

  it "fails in resetting the password with an expired token", js: true do
    visit login_path
    click_link "パスワードをお忘れの方はこちら"
    fill_in "メールアドレス", with: user.email
    click_button "メールを送信する"
    travel_to 3.hours.after
    link = URI.extract(ActionMailer::Base.deliveries.last.text_part.body.encoded)[0]
    visit link
    expect(current_path).to eq new_password_reset_path
    expect(page).to have_content "パスワード再設定の有効期限が切れています。"
  end
end
