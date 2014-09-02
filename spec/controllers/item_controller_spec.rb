require 'rails_helper'
RSpec.describe ItemController, :type => :controller do

  describe "Page Accessibility" do

    it "Add item page " do
      get :new
      expect(response).to have_http_status(200)

    end

  end

  describe "Basic Actions" do

    it "Create a new item" do


      category_nest = FactoryGirl.create(:item_category)
      location_nest = FactoryGirl.build(:item_location).attributes
      expect{
        post :create, {item: { :description => FactoryGirl.build(:item_description).attributes }, category:  { :item_category_id => category_nest.id}, location: location_nest}
      }.to change(Item, :count).by(1)

    end




  end


end