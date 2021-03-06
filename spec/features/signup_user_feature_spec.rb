require 'rails_helper'
require 'spec_helper'

describe 'Actions of signup page',:js => true do

  it 'Successfully sign up user' do
    @user = FactoryGirl.build(:user)
    @profile = FactoryGirl.build(:user_profile)
    visit user_signup_path
    page.fill_in "email" , :with => @user.email,:match => :first
    page.fill_in "password" , :with => @user.password,:match => :first
    page.fill_in "password_confirmation" , :with => @user.password,:match => :first
    page.fill_in "first_name", :with => @profile.first_name,:match => :first
    page.fill_in "last_name", :with => @profile.first_name,:match => :first
    click_button("submit_user",:match => :first)
    #expect(User.count).to eq(1)

 #   sleep(20)
  end



end