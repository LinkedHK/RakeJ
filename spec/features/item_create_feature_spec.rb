#spec/features/test_spec.rb

require 'rails_helper'
require 'spec_helper'

describe 'accessibility of webpage' do

  before(:all) do
    query_log
    FactoryGirl.create(:item_category)
    @descr = FactoryGirl.build(:item_description).attributes
    @rate  = FactoryGirl.build(:field_rate,:with_currency).attributes
    @location = FactoryGirl.build(:item_location,:with_locations)

  end
  it 'should access web page' do

    category = CategoryDescription.first
    currency = FieldCurrency.first
    title = I18n.t("form_input.item.item_title")
    description = I18n.t("form_input.item.item_description")
    city = LocationCity.first
    visit "/item/new"
    page.fill_in "item_title" , :with => @descr["item_title"]
    page.fill_in "item_description" , :with => @descr["description_text"]
    page.fill_in "item_description" , :with => @descr["description_text"]
    page.fill_in "salary_rate_min", :with => @rate["rate_min"]
    page.fill_in "salary_rate_max", :with => @rate["rate_max"]

   #print page.html
    page.select(category.name, :from => 'item[item_category_id]')
    page.select(currency.currency_title, :from => 'item[field_rate_attributes][field_currency_id]')
    page.select(currency.currency_title, :from => 'item[field_rate_attributes][field_currency_id]')



    expect(page).to have_content("#{title} #{@descr["item_title"].length}/100")
    expect(page).to have_content("#{description} #{@descr["description_text"].length}/2500")



  end
end