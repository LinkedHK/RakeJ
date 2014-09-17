require 'rspec'
require 'rails_helper'
describe FieldRate, :class => FieldRate do
  before(:all) do
    query_log
  end

  it "Store default rate" do
    create_rate = FactoryGirl.create(:field_rate,:with_currency)
    saved_rate = FieldRate.first
    expect(saved_rate.negotiable).to eq(0)
    expect(saved_rate.rate_min).to eq(create_rate.rate_min)
  end

  it "Store default rate if min rate is invalid" do
      FactoryGirl.create(:field_rate,:with_invalid_rate,:with_currency)
      rate = FieldRate.first
      expect(rate.negotiable).to eq(1)
  end

  it "Store default rate if min/max rate is zero" do
    FactoryGirl.create(:field_rate,:with_zero_rate,:with_currency)
    rate = FieldRate.first
    expect(rate.negotiable).to eq(1)
  end

  it "With negotiable" do
    FactoryGirl.create(:field_rate,:with_negotiation,:with_currency)
    rate = FieldRate.first
    expect(rate.negotiable).to eq(1)
  end





end