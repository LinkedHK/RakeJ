FactoryGirl.define do

  factory :item do |f|
    association :item_category
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
    item_description "Item Description"
    locale "en_US"
  end


  factory :category_description do |f|
    association :item_category
    name "Tech"
    locale "en_US"
  end


end