FactoryBot.define do
  factory :post do
    sequence(:message) { |n| "Post Text First #{n}" }
    latitude { 35.1 }
    longitude { 135 }

    trait :second do
      sequence(:message) { |n| "Post Text Second #{n}" }
      latitude { 35.2 }
      longitude { 135 }
    end
  end
end
