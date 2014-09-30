#spec/features/test_spec.rb

require 'rails_helper'
require 'spec_helper'

describe 'accessibility of webpage' do

  before(:all) do
    query_log
  end
  before(:each) do

  end
  it 'Should submit item', :js => true  do
    FactoryGirl.build(:field_rate,:with_currency).attributes
    @category =  FactoryGirl.create(:item_category)
    @descr = FactoryGirl.build(:item_description).attributes
    @location =  FactoryGirl.build(:item_location,:with_locations)
    currency = FieldCurrency.first
    city = @location.location_city
    tags = FactoryGirl.build(:item_tag).attributes
    visit item_new_path
    puts "Accessing Page! " .colorize(:yellow)
    page.fill_in "item_title" , :with => @descr["item_title"]
    page.fill_in "item_description" , :with => @descr["description_text"]
    page.fill_in "item_description" , :with => @descr["description_text"]
    page.fill_in "salary_rate_min", :with => 100000
    page.fill_in "salary_rate_max", :with => 200000
    fill_in "fake_tag", :with =>tags["tag_text"], :match => :first
  page.select(@category.category_descriptions[0].name, :from => 'item[item_category_id]')
  page.select(currency.currency_title,:from => 'item[field_rate_attributes][field_currency_id]')
  page.select(city.name, :from => 'item[item_location_attributes][location_city_id]')
  sleep(0.5)
  page.select(city.location_districts[0].name, :from => 'item[item_location_attributes][location_district_id]')

  expect(page).to have_content("#{@descr["item_title"].length}/100")
  expect(page).to have_content("#{@descr["description_text"].length}/2500")
  click_button("submit_item",:match => :first)
  sleep(2)
   # expect(page).to have_content(I18n.t("form_input.item.item_creation_successfull"))
  expect(Item.all.count).to eq(1)
  expect(current_path).to eq(item_show_path(Item.first.id))
  end

  it 'should create item', :js => true  do
   item = FactoryGirl.create(:item_with_description)
    visit item_show_path(item.id)
    sleep(10)

  end
end