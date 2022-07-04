FactoryBot.define do
  factory :photo do
    image { Rack::Test::UploadedFile.new("#{Rails.root}/spec/fixtures/images/test_mountain.png") }
  end
end
