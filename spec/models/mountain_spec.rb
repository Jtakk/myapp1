require 'rails_helper'

RSpec.describe Mountain, type: :model do
  describe "the 'yomi_asc' scope" do
    let(:first_mountain) { create(:mountain, id: 1, yomi: "い") }
    let(:second_mountain) { create(:mountain, id: 2, yomi: "あ") }

    it "returns mountains in ascending order of ID" do
      expect(Mountain.all).to match [first_mountain, second_mountain]
    end

    it "returns mountains in ascending order of yomi" do
      expect(Mountain.all.yomi_asc).to match [second_mountain, first_mountain]
    end
  end

  describe "#self.search_mountain(keyword)" do
    let!(:mountain) { create(:mountain, name: "富士山", yomi: "ふじさん") }

    it "returns array including the mountain when search by name" do
      expect(Mountain.search_mountain("富士")).to match_array [mountain]
    end

    it "returns array including the mountain when search by yomi" do
      expect(Mountain.search_mountain("ふじ")).to match_array [mountain]
    end

    it "returns empty array when search by yomi which doesn't match anything" do
      expect(Mountain.search_mountain("やま")).to be_empty
    end
  end
end
