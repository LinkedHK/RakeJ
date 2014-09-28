FactoryGirl.define do
  factory :item do |f|
    association :item_category
  end

  trait :invalid_category do
    item_category_id -2
  end
  factory :item_category do |f|
    f.parent_id -1
    f.enabled 1
    after(:create) do |item_category|
      FactoryGirl.create(:category_description,item_category: item_category)
    end
  end
  factory :item_description  do |f|
    item_title "Item Title"
    description_text "Item Description"
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