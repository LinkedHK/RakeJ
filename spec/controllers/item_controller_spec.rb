require 'rails_helper'
RSpec.describe ItemController, :type => :controller do

  describe "Page Accessibility" do

    it "Add item page " do
      get :new
      expect(response).to have_http_status(200)

    end

  end

  describe "Basic Actions" do

    before(:each) do
      query_log
    end

    it "Create a new item" do
      category_nest = FactoryGirl.create(:item_category).attributes
      location_nest = FactoryGirl.build(:item_location).attributes
      description_nest = FactoryGirl.build(:item_description).attributes
      tags_nest = FactoryGirl.build(:item_tag).attributes


      expect{
        post :create,item: {:item_descriptions_attributes=>{0=> description_nest },
                            :item_category_id =>category_nest[:id],
                            :item_tags_attributes=>{0=>{:tag_text=>tags_nest[:tag_text]}},
                            :item_location_attributes=>{
                                :location_city_id=>location_nest[:location_city_id],
                                :location_district_id=>location_nest[:location_district_id]
                            },
        }
      }.to change(Item,:count).by(1)



    end

  end


end