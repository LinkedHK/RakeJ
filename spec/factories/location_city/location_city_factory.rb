FactoryGirl.define do
  factory :location_district , :class => LocationDistrict do
    name "Kowloon"
  end
  factory :location_city, :class => LocationCity do
    name "Hong Kong"
    factory :city_with_districts do
      after(:create) do |location_city|
        FactoryGirl.create(:location_district, city: location_city)
      end
    end
  end


end