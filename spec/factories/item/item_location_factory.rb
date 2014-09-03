FactoryGirl.define do
  factory :item_location do
    after(:build) do |f|
      country  = FactoryGirl.create(:location_country)
      city = country.location_cities.first
      district = city.location_districts.first
      f.location_country = country
      f.location_city = city
      f.location_district = district
    end
  end

  factory :location_country do
    name "Hong Kong"
    after(:create) do |location_country|
      FactoryGirl.create(:location_city, location_country: location_country)
    end
  end
  factory :location_city do
    name "Hong Kong"
    association :location_country
    after(:create) do |location_city|
      FactoryGirl.create(:location_district,location_city: location_city )
    end
  end
  factory :location_district do
    name "Kowloon"
    association :location_city
  end


end