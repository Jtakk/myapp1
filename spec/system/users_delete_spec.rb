require 'rails_helper'

RSpec.describe "UsersDelete", type: :system do
  let(:user) { create(:user) }

  it "succeeds in deleting a user", js: true do
    log_in_as(user)
    visit edit_user_path(user)
    click_button "アカウントを削除する"
    within('#delete-user-modal') do
      fill_in "メールアドレス", with: user.email
      click_on "削除する"
    end
    expect(current_path).to eq root_path
    expect(page).to have_content "アカウントを削除しました。"
  end
end
