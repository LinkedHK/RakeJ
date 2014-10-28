class UserAuth::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  before_filter :init_omni

  def init_omni
    @omni_service = OmniService.new(request.env["omniauth.auth"])
  end
  def self.provides_callback_for(provider)
    class_eval %Q{
      def #{provider}
         @user = User.find_for_oauth(env["omniauth.auth"], current_user)
        if @user.persisted?
          sign_in_and_redirect @user, event: :authentication
          set_flash_message(:notice, :success, kind: "#{provider}".capitalize) if is_navigational_format?
        else
          session["devise.#{provider}_data"] = env["omniauth.auth"]
          redirect_to new_user_registration_url
        end
      end
    }
=begin
  @user = User.find_for_oauth(env["omniauth.auth"], current_user)

        if @user.persisted?
          sign_in_and_redirect @user, event: :authentication
          set_flash_message(:notice, :success, kind: "#{provider}".capitalize) if is_navigational_format?
        else
          session["devise.#{provider}_data"] = env["omniauth.auth"]
          redirect_to new_user_registration_url
        end
=end
  end
  def facebook
    @user = @omni_service.check_uid
    if @user.valid?
      if @omni_service.new_user
        sign_in @user,event: :authentication
        redirect_to user_check_profile_url
        set_flash_message(:notice, :check_profile)
      else
        sign_in_and_redirect @user, event: :authentication
        set_flash_message(:notice, :success, kind: "facebook".capitalize) if is_navigational_format?
      end
    else
      puts "Failure to create a user " .colorize(:red)
      session["devise.facebook_data"] = env["omniauth.auth"]
      redirect_to new_user_registration_url
    end
  end


  #[:google_oauth2, :facebook].each do |provider|
  #  provides_callback_for provider
  #end





end