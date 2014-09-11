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
    before(:each) do
      @category_nest = FactoryGirl.create(:item_category).attributes
      @location_nest = FactoryGirl.build(:item_location,:with_locations).attributes
      @description_nest = FactoryGirl.build(:item_description).attributes
      @tags_nest = FactoryGirl.build(:item_tag).attributes
      request.env["HTTP_ACCEPT"] = 'application/json'
    end

    it "Create a new item" do
      expect{
        post :create,item: {item_descriptions_attributes: [@description_nest],
                            item_category_id: @category_nest["id"],
                            item_tags_attributes: {"0" => @tags_nest},
                            item_location_attributes: @location_nest}
      }.to change(Item,:count).by(1)
      expect(ItemLocation.all.count).to eq(1)
      expect(ItemTag.all.count).to eq(3)
      expect(ItemDescription.all.count).to eq(1)
    end
    it "Fail to create item because title is blank" do
      @description_nest = FactoryGirl.build(:item_description,:empty_title).attributes
      expect{
        post :create,item: {item_descriptions_attributes: [@description_nest],
                            item_category_id: @category_nest["id"],
                            item_tags_attributes: {"0" => @tags_nest},
                            item_location_attributes: @location_nest}
      }.to change(ItemDescription,:count).by(0)
      resp =  parse_json(response)
      validation_error = resp["validation_error"]

      expect(validation_error.length).to eq(1)
      expect(validation_error["item_descriptions.item_title"].length).to eq(1)
      expect(validation_error["item_descriptions.item_title"][0]).to eq(I18n.t("form_input.validation.empty_title"))
    end
    it "Fail to create item because description is blank" do
      @description_nest = FactoryGirl.build(:item_description,:empty_description).attributes
      expect{
        post :create,item: {item_descriptions_attributes: [@description_nest],
                            item_category_id: @category_nest["id"],
                            item_tags_attributes: {"0" => @tags_nest},
                            item_location_attributes: @location_nest}
      }.to change(ItemDescription,:count).by(0)
      resp =  parse_json(response)
      validation_error = resp["validation_error"]
      expect(validation_error.length).to eq(1)
      expect(validation_error["item_descriptions.description_text"].length).to eq(1)
      expect(validation_error["item_descriptions.description_text"][0]).to eq(I18n.t("form_input.validation.empty_description"))
    end

    it "Fail to create item because item_category is blank" do
      @category_nest["id"] = -2
      expect{
        post :create,item: {item_descriptions_attributes: [@description_nest],
                            item_category_id: @category_nest["id"],
                            item_tags_attributes: {"0" => @tags_nest},
                            item_location_attributes: @location_nest}
      }.to change(ItemDescription,:count).by(0)
      resp =  parse_json(response)
      validation_error = resp["validation_error"]
      expect(validation_error.length).to eq(1)
      expect(validation_error["item_category"].length).to eq(1)
      expect(validation_error["item_category"][0]).to eq(I18n.t("form_input.validation.category_invalid"))
    end

    it "Fail to add item because of fake city" do
      @location_nest["location_city_id"] = -2
      expect{
        post :create,item:   {item_descriptions_attributes: [@description_nest],
                              item_category_id: @category_nest["id"],
                              item_tags_attributes: {"0" => @tags_nest},
                              item_location_attributes: @location_nest}
      }
      .to change(ItemLocation,:count).by(0)

      resp =  parse_json(response)
      validation_error = resp["validation_error"]
      expect(validation_error.length).to eq(1)
      expect(validation_error["item_location.base"].length).to eq(1)
      expect(validation_error["item_location.base"][0]).to eq(I18n.t("form_input.validation.location_invalid"))
    end
    it "Fail to add item because of fake district" do
      @location_nest["location_district_id"] = -2
      expect{
        post :create,item:   {item_descriptions_attributes: [@description_nest],
                              item_category_id: @category_nest["id"],
                              item_tags_attributes: {"0" => @tags_nest},
                              item_location_attributes: @location_nest}
      }
      .to change(ItemLocation,:count).by(0)

      resp =  parse_json(response)
      validation_error = resp["validation_error"]
      expect(validation_error.length).to eq(1)
      expect(validation_error["item_location.base"].length).to eq(1)
      expect(validation_error["item_location.base"][0]).to eq(I18n.t("form_input.validation.location_invalid"))

    end

    it "3 tags must be added." do
      tags_nest = FactoryGirl.build(:item_tag).attributes
      expect{
        post :create,item: {item_descriptions_attributes: [@description_nest],
                            item_category_id: @category_nest["id"],
                            item_tags_attributes: {"0" => tags_nest},
                            item_location_attributes: @location_nest}
        }.to change(ItemTag,:count).by(3)
    end
    it "Max number of tags " do
      tags_nest = FactoryGirl.build(:item_long_tag).attributes
      expect{
        post :create,item: {item_descriptions_attributes: [@description_nest],
                            item_category_id: @category_nest["id"],
                            item_tags_attributes: {"0" => tags_nest},
                            item_location_attributes: @location_nest}
      }.to change(ItemTag,:count).by(4)
    end
  end

end