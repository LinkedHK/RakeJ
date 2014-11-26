class UserAuth::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  before_filter :init_omni, only: [:google_oauth2, :facebook]
  def self.provides_callback_for(provider)
    class_eval %Q{
  def #{provider}
    if @omni_service.new_user
        sign_in @user,event: :authentication
        redirect_to user_check_profile_url
        set_flash_message(:notice, :check_profile)
    else
        sign_in_and_redirect @user, event: :authentication
        set_flash_message(:notice, :success, kind: "#{provider}".capitalize) if is_navigational_format?
    end
  end
    }
  end
  [:google_oauth2, :facebook].each do |provider|
    provides_callback_for provider
  end
  def init_omni
    @omni_service = OmniService.new(request.env["omniauth.auth"])
    begin
      @user = @omni_service.check_uid
    rescue
      redirect_to new_user_registration_url
      session["devise.#{provider}_data"] = env["omniauth.auth"]
    end
  end




end