FactoryBot.define do
  factory :post do
    message { "Post Text" }
    sequence(:latitude) { |n| n }
    sequence(:longitude) { |n| n }
  end
end
