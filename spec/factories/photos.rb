FactoryBot.define do
  factory :photo do
    image { Rack::Test::UploadedFile.new("#{Rails.root}/spec/fixtures/images/test_photo_1.png") }
  end
end
