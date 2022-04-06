FactoryBot.define do
  factory :user do
    sequence(:name) { |n| "test_user##{n}" }
    sequence(:email) { |n| "test#{n}@example.com" }
    password { "password" }
    password_confirmation { "password" }
    introduction { "Hello, World!" }
  end
end
