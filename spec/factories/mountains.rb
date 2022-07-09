FactoryBot.define do
  factory :mountain do
    sequence(:name) { |n| "test_mountain##{n}" }
    sequence(:yomi) { |n| "yomi_test_mountain##{n}" }
    elevation { 2000 }
    image { Rack::Test::UploadedFile.new("#{Rails.root}/spec/fixtures/images/test_mountain.png") }
    introduction { "Text" }
    latitude { 35 }
    longitude { 135 }
    zoom { 10 }
  end
end
