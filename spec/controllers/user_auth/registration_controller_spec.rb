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

      @user_nest= FactoryGirl.build(:user)
      @profile_nest= FactoryGirl.build(:user_profile).attributes
      expect{

        post  :create, user: { email: @user_nest.email,
                               password: @user_nest.password,
                               password_confirmation: @user_nest.password,
                               user_profile_attributes: @profile_nest


        }
      }.to change(User,:count).by(1)

    end

  end



end