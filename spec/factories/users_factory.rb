# Read about factories at https://github.com/thoughtbot/factory_girl
require 'faker'

FactoryGirl.define do
  factory :user do
    email 'test@example.com'
    password 'f4k3p455w0rd'
    factory :with_profile  do
      after(:create) do |user|
        FactoryGirl.create(:user_profile, user: user)
      end
    end
  end

end
