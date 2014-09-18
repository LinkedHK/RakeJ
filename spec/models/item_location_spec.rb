require 'rspec'
require 'rails_helper'
describe ItemLocation, :class => ItemLocation do
  before(:all) do
    query_log
  end

  it "Save country, city , district" do

      created = FactoryGirl.create(:item_location,:with_locations)
      saved = ItemLocation.first
      expect(ItemLocation.all.count).to eq(1)
      expect(saved.s_country).to eq(created.s_country)
      expect(saved.s_city).to eq(created.s_city)
      expect(saved.s_district).to eq(created.s_district)
      expect(saved.location_country_id).to eq(created.location_country_id)
      expect(saved.location_city_id).to eq(created.location_country_id)
      expect(saved.location_district_id).to eq(created.location_district_id)
  end

  it "Fail to save because of missing city" do
    location = FactoryGirl.build(:item_location,:fake_city)
    expect(location.errors).not_to be_valid
  end






end