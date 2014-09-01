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
      item_attr = FactoryGirl.build(:item_with_description).attributes

      puts "!!!!!!!Item Attr #{item_attr}"
      expect{
        post :create, {item: item_attr}
      }.to change(Item, :count).by(1)

    end




  end


end