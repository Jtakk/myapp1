require 'rails_helper'

RSpec.describe "SearchMountains", type: :system do
  number = MountainsController::MAX_ITEM_COUNT
  let(:region) { create(:region, id: 2, name: "東北") }
  let(:prefecture_1) { create(:prefecture, id: 2, region_id: region.id, name: "青森") }
  let(:mountain_1) { create(:mountain, name: "岩木山", yomi: "いわきさん") }
  let(:prefecture_2) { create(:prefecture, id: 3, region_id: region.id, name: "岩手") }
  let(:mountain_2) { create(:mountain, name: "八幡平", yomi: "はちまんたい") }
  let(:area) { create(:area, id: 6, name: "奥羽山脈") }
  let(:tag) { create(:tag, id: 1, name: "日本百名山") }

  context "the number of mountains is less than the maximum number of displayed items" do
    before do
      mountain_1.prefectures << prefecture_1
      mountain_2.prefectures << prefecture_2
      mountain_1.areas << area
      mountain_1.tags << tag
      visit mountains_path
    end

    it "searches mountains by keywords", js: true do
      fill_in "山名検索", with: "岩"
      click_button "検索"
      expect(current_path).to eq mountain_search_path
      expect(page).to have_link "山を探す", href: mountains_path
      expect(page).to have_content mountain_1.yomi
      expect(page).to have_content mountain_1.name
      expect(page).to have_content mountain_1.elevation
      expect(page).to have_content mountain_1.introduction
      expect(page).to have_selector "img[src$='#{mountain_1.image.url}']"
      expect(page).to have_link nil, href: mountain_path(mountain_1)
      fill_in "山名検索", with: "八"
      click_button "検索"
      expect(current_path).to eq mountain_search_path
      expect(page).to have_link "山を探す", href: mountains_path
      expect(page).to have_content mountain_2.yomi
      expect(page).to have_content mountain_2.name
      expect(page).to have_content mountain_2.elevation
      expect(page).to have_content mountain_2.introduction
      expect(page).to have_selector "img[src$='#{mountain_2.image.url}']"
      expect(page).to have_link nil, href: mountain_path(mountain_2)
    end

    it "searches mountains by regions", js: true do
      click_on "都道府県から探す"
      click_on(region.name + "地方")
      expect(current_path).to eq mountain_region_path(region)
      expect(page).to have_link "山を探す", href: "/mountains?tab=1"
      expect(page).to have_content mountain_1.yomi
      expect(page).to have_content mountain_1.name
      expect(page).to have_content mountain_1.elevation
      expect(page).to have_content mountain_1.introduction
      expect(page).to have_selector "img[src$='#{mountain_1.image.url}']"
      expect(page).to have_link nil, href: mountain_path(mountain_1)
      expect(page).to have_content mountain_2.yomi
      expect(page).to have_content mountain_2.name
      expect(page).to have_content mountain_2.elevation
      expect(page).to have_content mountain_2.introduction
      expect(page).to have_selector "img[src$='#{mountain_2.image.url}']"
      expect(page).to have_link nil, href: mountain_path(mountain_2)
    end

    it "searches mountains by prefectures", js: true do
      click_on "都道府県から探す"
      click_on prefecture_1.name
      expect(current_path).to eq mountain_prefecture_path(prefecture_1)
      expect(page).to have_link "山を探す", href: "/mountains?tab=1"
      expect(page).to have_link (prefecture_1.region.name + "地方"),
        href: mountain_region_path(prefecture_1.region)
      expect(page).to have_content mountain_1.yomi
      expect(page).to have_content mountain_1.name
      expect(page).to have_content mountain_1.elevation
      expect(page).to have_content mountain_1.introduction
      expect(page).to have_selector "img[src$='#{mountain_1.image.url}']"
      expect(page).to have_link nil, href: mountain_path(mountain_1)
    end

    it "searches mountains by areas", js: true do
      click_on "山域から探す"
      find('#panel2-header').click
      click_on area.name
      expect(current_path).to eq mountain_area_path(area)
      expect(page).to have_link "山を探す", href: "/mountains?tab=2"
      expect(page).to have_content mountain_1.yomi
      expect(page).to have_content mountain_1.name
      expect(page).to have_content mountain_1.elevation
      expect(page).to have_content mountain_1.introduction
      expect(page).to have_selector "img[src$='#{mountain_1.image.url}']"
      expect(page).to have_link nil, href: mountain_path(mountain_1)
    end

    it "searches mountains by tags", js: true do
      click_on "タグから探す"
      click_on tag.name
      expect(current_path).to eq mountain_tag_path(tag)
      expect(page).to have_link "山を探す", href: "/mountains?tab=3"
      expect(page).to have_content mountain_1.yomi
      expect(page).to have_content mountain_1.name
      expect(page).to have_content mountain_1.elevation
      expect(page).to have_content mountain_1.introduction
      expect(page).to have_selector "img[src$='#{mountain_1.image.url}']"
      expect(page).to have_link nil, href: mountain_path(mountain_1)
    end
  end

  context "the number of mountains is more than the maximum number of displayed items" do
    let(:mountain_list) { create_list(:mountain, number + 1) }

    before do
      mountain_list.each do |mountain|
        mountain.tags << tag
      end
      visit mountains_path
    end

    it "changes displayed items by clicking pagination", js: true do
      click_on "タグから探す"
      click_on tag.name
      expect(current_path).to eq mountain_tag_path(tag)
      expect(page.all('.mountain-paper').count).to eq number
      click_button "2"
      expect(page.all('.mountain-paper').count).to eq 1
    end
  end
end
