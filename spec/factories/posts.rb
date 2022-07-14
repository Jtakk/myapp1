FactoryBot.define do
  factory :post do
    message { "Post Text" }
    latitude { 35.1 }
    longitude { 135 }

    trait :second do
      message { "Post Text 2" }
      latitude { 35.2 }
      longitude { 135 }
    end
  end
end
