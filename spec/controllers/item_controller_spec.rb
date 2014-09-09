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

      puts "Description Nest: #{ @description_nest.inspect }" .colorize(:yellow)

      expect{
        post :create,item: {item_descriptions_attributes: [@description_nest],
                            item_category_id: @category_nest["id"],
                            item_tags_attributes: {"0" => @tags_nest},
                            item_location_attributes: @location_nest,
                            }
      }.to change(Item,:count).by(1)
      expect(ItemLocation.all.count).to eq(1)
      expect(ItemTag.all.count).to eq(3)
      expect(ItemDescription.all.count).to eq(1)
    end

    it "Fail to create description because title is blank" do
      @description_nest = FactoryGirl.build(:item_description,item_title: "").attributes
      expect{
        post :create,item: {item_descriptions_attributes: [@description_nest]
        }
      }.to change(ItemDescription,:count).by(0)
    end

    it "Testing valid tag " do
      @tags_nest = FactoryGirl.build(:item_tag).attributes
      expect{
        post :create,item: {item_tags_attributes: {"0" => @tags_nest}
        }
      }.to change(ItemTag,:count).by(3)
    end

  end


end