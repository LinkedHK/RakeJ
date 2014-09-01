FactoryGirl.define do
  factory :item do |f|
    f.item_categories_id 1

    factory :item_with_description do
      after(:build) do |item|
        FactoryGirl.build(:item_description,item: item)
      end

    end

  end

end