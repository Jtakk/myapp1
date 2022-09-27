require 'rails_helper'

RSpec.describe "RootPages", type: :system do
  describe "Post Feed" do
    number = RootPagesController::MAX_POST_COUNT
    let(:user) { create(:user) }
    let(:mountain) { create(:mountain) }
    let!(:post_list) { create_list(:post, number + 1, user_id: user.id, mountain_id: mountain.id) }

    before do
      0.upto(number) do |i|
        create(:photo, post_id: post_list[i].id)
      end
      visit root_path
    end

    it "shows the recent posts and allows ones access it's individual pages", js: true do
      1.upto(number) do |i|
        within("#recent-post-#{(i - 1)}") do
          expect(page).to have_content mountain.yomi
          expect(page).to have_content mountain.name
          expect(page).to have_content post_list[-i].message
          expect(page).to have_selector "img[src$='#{post_list[-i].photos[0].image.fixed.url}']"
        end
        expect(page).to have_link nil, href: post_path(post_list[-i])
      end
      expect(page).not_to have_content post_list[0].message
      expect(page).not_to have_selector "img[src$='#{post_list[0].photos[0].image.fixed.url}']"
      expect(page).not_to have_link nil, href: post_path(post_list[0])
    end
  end

  describe "clickable links" do
    before { visit root_path }

    it "has valid links within header", js: true do
      within('#app-header') do
        expect(page).to have_link "Myapp1", href: root_path
        expect(page).to have_link "ホーム", href: root_path
        expect(page).to have_link "新規登録", href: signup_path
        expect(page).to have_link "ログイン", href: login_path
        click_on "山を探す"
      end
      within('#search-menu-list') do
        expect(page).to have_link "フリーワード検索", href: mountains_path
        expect(page).to have_link "都道府県から探す", href: '/mountains?tab=1'
        expect(page).to have_link "山域から探す", href: '/mountains?tab=2'
        expect(page).to have_link "タグから探す", href: '/mountains?tab=3'
      end
    end

    it "has valid links within hero header", js: true do
      within('#hero-header') do
        expect(page).to have_link "新規登録", href: signup_path
        expect(page).to have_link "ログイン", href: login_path
      end
    end

    it "has valid links within overview", js: true do
      within('#overview') do
        expect(page).to have_link "山を探す", href: mountains_path
        expect(page).to have_link "新規登録", href: signup_path
        expect(page).to have_link "ログイン", href: login_path
      end
    end
  end
end
