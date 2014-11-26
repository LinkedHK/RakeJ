FactoryGirl.define do
  factory :item_location do
   trait :with_locations do
     after(:build) do |f|
       found_country = LocationCountry.first
       if found_country
         country = found_country
       else
         country  = FactoryGirl.create(:location_country)
       end
       city = country.location_cities.first
       district = city.location_districts.first
       f.location_country = country
       f.location_city = city
       f.location_district = district
     end

     after(:create) do |f|
       found_country = LocationCountry.first
       if found_country
         country = found_country
       else
         country  = FactoryGirl.create(:location_country)
       end
       city = country.location_cities.first
       district = city.location_districts.first
       f.location_country = country
       f.location_city = city
       f.location_district = district
     end
   end

  trait :fake_city do
    location_city_id -2
  end

  trait :fake_district do
    location_district_id -2
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
    name "Central"
    association :location_city
  end


end