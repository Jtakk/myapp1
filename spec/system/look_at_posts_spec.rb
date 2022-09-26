require 'rails_helper'

RSpec.describe "LookAtPosts", type: :system do
  let(:mountain) { create(:mountain) }
  let(:prefecture) { create(:prefecture, region_id: region.id) }
  let(:region) { create(:region) }
  let(:area) { create(:area) }
  let(:tag) { create(:tag) }
  let(:user) { create(:user) }
  let(:other_user) { create(:user) }
  let(:latest_unpopular_post) do
    create(:post, user_id: user.id, mountain_id: mountain.id, created_at: Time.current + 1.days)
  end
  let(:oldest_popular_post) do
    create(:post, user_id: other_user.id, mountain_id: mountain.id, created_at: Time.current)
  end
  let!(:photo_1) { create(:photo, post_id: latest_unpopular_post.id) }
  let!(:photo_2) { create(:photo, post_id: oldest_popular_post.id) }

  before do
    mountain.prefectures << prefecture
    mountain.areas << area
    mountain.tags << tag
    oldest_popular_post.liked_users << user
    visit mountain_path(mountain)
  end

  it "shows the information of the mountain and the related keywords including links", js: true do
    click_on "基本情報"
    within('#mountain-introduction') do
      expect(page).to have_selector "img[src$='#{mountain.image.url}']"
      expect(page).to have_content mountain.yomi
      expect(page).to have_content mountain.name
      expect(page).to have_content mountain.elevation
      expect(page).to have_content mountain.introduction
      expect(page).to have_link prefecture.name, href: mountain_prefecture_path(prefecture)
      expect(page).to have_link area.name, href: mountain_area_path(area)
      expect(page).to have_link tag.name, href: mountain_tag_path(tag)
    end
  end

  it "shows the posts sorted by newest arrivals", js: true do
    click_on "一覧から探す"
    within('#recent-posts-0') do
      expect(page).to have_content user.name
      expect(page).to have_content latest_unpopular_post.message
    end
    find('#recent-posts-0').click
    within('#post-view') do
      expect(page).to have_selector "img[src$='#{photo_1.image.fixed.url}']"
      expect(page).to have_link user.name, href: user_path(user)
      expect(page).to have_content latest_unpopular_post.message
    end
    click_on "一覧から探す"
    within('#recent-posts-1') do
      expect(page).to have_content other_user.name
      expect(page).to have_content oldest_popular_post.message
    end
    find('#recent-posts-1').click
    within('#post-view') do
      expect(page).to have_selector "img[src$='#{photo_2.image.fixed.url}']"
      expect(page).to have_link other_user.name, href: user_path(other_user)
      expect(page).to have_content oldest_popular_post.message
    end
  end

  it "shows the posts sorted by popularity", js: true do
    click_on "一覧から探す"
    click_on "いいね数"
    within('#like-posts-0') do
      expect(page).to have_content other_user.name
      expect(page).to have_content oldest_popular_post.message
    end
    find('#like-posts-0').click
    within('#post-view') do
      expect(page).to have_selector "img[src$='#{photo_2.image.fixed.url}']"
      expect(page).to have_link other_user.name, href: user_path(other_user)
      expect(page).to have_content oldest_popular_post.message
    end
    click_on "一覧から探す"
    within('#like-posts-1') do
      expect(page).to have_content user.name
      expect(page).to have_content latest_unpopular_post.message
    end
    find('#like-posts-1').click
    within('#post-view') do
      expect(page).to have_selector "img[src$='#{photo_1.image.fixed.url}']"
      expect(page).to have_link user.name, href: user_path(user)
      expect(page).to have_content latest_unpopular_post.message
    end
  end
end
