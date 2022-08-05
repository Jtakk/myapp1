FactoryBot.define do
  factory :area do
    sequence(:name) { |n| "test_area##{n}" }
  end
end
