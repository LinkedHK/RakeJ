require 'faker'
FactoryGirl.define do
  factory :item do |f|
    factory :item_with_description do
      before(:create) do |item|
        category = FactoryGirl.create(:item_category)
        item.item_category_id = category.id
      end
      after(:create) do |item|
        FactoryGirl.create(:item_description, item: item)
        FactoryGirl.create(:item_location,:with_locations, item: item)
        FactoryGirl.create(:field_rate,:with_currency, item: item)
        FactoryGirl.create(:item_tag, item: item)
      end
    end

  end

  trait :invalid_category do
    item_category_id -2
  end
  factory :item_category do |f|
    f.parent_id -1
    f.enabled 1
    f.slug 'test'
    after(:create) do |item_category|
      FactoryGirl.create(:category_description,item_category: item_category)
    end
  end
  factory :item_description  do |f|
    item_title Faker::Lorem.sentence
    description_text Faker::Lorem.paragraph(20,true)
    locale "en_US"
    trait :empty_title do
      item_title ""
    end
    trait :empty_description do
      description_text ""
    end

  end

  factory :category_description do |f|
    f.name "Tech"
    f.locale "en_US"
  end
  factory :item_tag do |t|
    tag_text "tech,sales,marketing"
    factory :item_long_tag do |t|
      tag_text "tech,sales,marketing,something1, something2,something4"
    end
  end


end