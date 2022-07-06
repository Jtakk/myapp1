FactoryBot.define do
  factory :photo do
    image { Rack::Test::UploadedFile.new("#{Rails.root}/spec/fixtures/images/yuuyake_yama.png") }
  end
end
