FactoryBot.define do
  factory :tag do
    sequence(:name) { |n| "test_tag##{n}" }
  end
end
