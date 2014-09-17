FactoryGirl.define do
  factory :field_rate do
   rate_min 10000
   rate_max 99999
  end
  trait :with_currency do
    after(:build) do |f|
      f.field_currency_id = FactoryGirl.create(:field_currency).id
    end
  end
  trait :with_invalid_rate do
    rate_min ''
    rate_max ''
  end

  trait :with_zero_rate do
    rate_min 0
    rate_max 0
  end

  trait :with_negotiation do
    negotiable 1
  end
  factory :field_currency do
    currency_title "HK$"
    default_currency 1
  end

end