require 'rails_helper'


RSpec.describe UserAuth::RegistrationController, :type => :controller do

  describe "Basic actions" do

    before(:each) do
      @request.env["devise.mapping"] = Devise.mappings[:user]



    end

    it "Access signup page" do

      get :new
      query_log
      expect(response).to have_http_status(200)
    end

    it "Submit signup user" do
=begin
      @user_nest= FactoryGirl.build(:user).attributes
      @profile_nest= FactoryGirl.build(:user_profile).attributes
      expect{

        post  :create, user:  @user_nest,
                               user_profile_attributes: [@profile_nest]
      }.to change(User,:count).by(1)
      expect(UserProfile.count).to eq(1)
=end


    end

  end



end