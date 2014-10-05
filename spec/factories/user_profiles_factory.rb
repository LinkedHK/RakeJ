# Read about factories at https://github.com/thoughtbot/factory_girl
require 'faker'
FactoryGirl.define do
  factory :user_profile do
    first_name Faker::Name.first_name
    last_name Faker::Name.last_name
  end
end
