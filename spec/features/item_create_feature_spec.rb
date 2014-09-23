#spec/features/test_spec.rb

require 'rails_helper'
require 'spec_helper'

describe 'accessibility of webpage' do

  before(:all) do
    query_log
  end
  it 'should access web page' do

    @descr = FactoryGirl.build(:item_description).attributes
    FactoryGirl.create(:item_category)
    @category = CategoryDescription.first
    @title = I18n.t("form_input.item.item_title")
    @description = I18n.t("form_input.item.item_description")

    visit '/item/new'

    page.fill_in "item_title" , :with => @descr["item_title"]
    page.fill_in "item_description" , :with => @descr["description_text"]
    page.fill_in "item_description" , :with => @descr["description_text"]

  # print page.html
   select(@category.name, :from => 'item[item_category_id]')

    expect(page).to have_content("#{@title} #{@descr["item_title"].length}/100")
    expect(page).to have_content("#{@description} #{@descr["description_text"].length}/2500")





  end
end