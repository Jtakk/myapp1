FactoryBot.define do
  factory :region do
    sequence(:name) { |n| "test_region##{n}" }
  end
end
