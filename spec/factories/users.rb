FactoryBot.define do
  factory :user do
    sequence(:name) { |n| "test_user##{n}" }
    sequence(:email) { |n| "test#{n}@example.com" }
    password_digest { "MyString" }
    introduction { "Hello, World!" }
  end
end
