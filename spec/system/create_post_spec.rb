require 'rails_helper'

RSpec.describe "CreatePost", type: :system do
  let(:user) { create(:user) }
  let(:mountain) { create(:mountain) }
  let(:latitude) { mountain.latitude.to_f + 1.0 }
  let(:longitude) { mountain.longitude.to_f + 1.0 }
  let(:message) { "test message" }
  let(:image_1) { "#{Rails.root}/spec/fixtures/images/test_photo_1.png" }
  let(:image_2) { "#{Rails.root}/spec/fixtures/images/test_photo_2.png" }

  it "makes a user login and succeeds in creating a post with photos", js: true do
    visit mountain_path(mountain)
    click_on "投稿する"
    within('#tabpanel-create-post') do
      click_on "ログイン"
    end
    expect(current_path).to eq login_path
    log_in_as(user)
    expect(current_path).to eq user_path(user)
    visit mountain_path(mountain)
    click_on "投稿する"
    expect(find('#btn-submit-post', visible: false)).to be_disabled
    fill_in "緯度", with: latitude
    fill_in "経度", with: longitude
    click_button "マーカーを設置"
    fill_in "メッセージ", with: message
    expect(find('#btn-submit-post', visible: false)).to be_disabled
    10.times do
      attach_file "写真を追加する", image_1, make_visible: true
    end
    expect(find('#btn-upload-photo').style('pointer-events')['pointer-events']).to eq "none"
    9.downto(0) do |i|
      find("#cancel-icon-#{i}").click
    end
    expect(find('#btn-upload-photo').style('pointer-events')['pointer-events']).to eq "auto"
    attach_file "写真を追加する", image_1, make_visible: true
    attach_file "写真を追加する", image_2, make_visible: true
    expect(find('#btn-submit-post', visible: false)).not_to be_disabled
    click_button "この内容で投稿する"
    expect(page).to have_content "投稿しました。"
    posted_image_1 = user.posts.last.photos[0].image
    posted_image_2 = user.posts.last.photos[1].image
    within('#post-view') do
      expect(page).to have_selector "img[src$='#{posted_image_1.fixed.url}']"
      expect(page).to have_selector "img[src$='#{posted_image_2.fixed.url}']"
      expect(page).to have_link user.name, href: user_path(user)
      expect(page).to have_content message
    end
  end
end
