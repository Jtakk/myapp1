FactoryBot.define do
  factory :prefecture do
    sequence(:name) { |n| "test_prefecture##{n}" }
    region { nil }
  end
end
