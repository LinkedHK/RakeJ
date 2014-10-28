require 'rails_helper'


RSpec.describe UserAuth::OmniauthCallbacksController, :type => :controller do

  describe "Basic actions" do

    before(:each) do
      @request.env["devise.mapping"] = Devise.mappings[:user]
      set_omniauth
      query_log
    end
    it "Submit a new user via facebook" do
      u_profile = UserProfile.count
      expect{
        get :facebook, request.env["omniauth.auth"]
      }.to change(User,:count).by(1)
      expect(UserProfile.count).to eq(u_profile+1)
      expect(response).to redirect_to(user_check_profile_path)
    end

    it "Submit an existing user" do
      omni =  OmniService.new(request.env["omniauth.auth"])
      omni.check_uid
      expect{
        get :facebook, request.env["omniauth.auth"]
      }.to change(User,:count).by(0)
      expect(response).to redirect_to(root_path)
    end

    it "Submit invalid user" do
=begin
      set_invalid_omniauth
      expect{
        get :facebook, request.env["omniauth.auth"]
      }.to raise_exception

      expect(response).to redirect_to(redirect_to new_user_registration_url)
=end
    end
  end



end