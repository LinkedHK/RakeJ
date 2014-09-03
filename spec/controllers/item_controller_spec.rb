require 'rails_helper'
RSpec.describe ItemController, :type => :controller do

  describe "Page Accessibility" do

    it "Add item page " do
      get :new
      expect(response).to have_http_status(200)

    end

  end

  describe "Basic Actions" do

    before(:all) do
      query_log
    end

    it "Create a new item" do
      @category_nest = FactoryGirl.create(:item_category).attributes
      @location_nest = FactoryGirl.build(:item_location).attributes
      @description_nest = FactoryGirl.build(:item_description).attributes
      @tags_nest = FactoryGirl.build(:item_tag).attributes

      expect{
        post :create,item: {item_descriptions_attributes: [@description_nest],
                            item_category_id: @category_nest["id"],
                            item_tags_attributes: [@tags_nest],
                            item_location_attributes: @location_nest,
                            }
      }.to change(Item,:count).by(1)

      expect(ItemLocation.all.count).to eq(1)
    #  expect(ItemTag.all.count).to eq(3)



=begin

Test

{"item_category_id"=>"66",
"item_descriptions_attributes"=>{"item_title"=>"Item Title",
"description_text"=>"Item Description"},
"item_location_attributes"=>{"location_city_id"=>"65",
"location_district_id"=>"65"},
"item_tags_attributes"=>{"tag_text"=>"tech,sales,marketing"}}




=end


    end

  end


end