class SiteSetting < ActiveRecord::Base


  # Just dummyMethods. Using Rails.application.config for simplify

  def self.omni_provider(provider)
    data = Devise.omniauth_configs[provider]
    provider_data = nil
    if data
      provider_data = {
          :client =>  data.args[0],
          :scope =>  data.args[2] ?  data.args[2][:scope] : nil,
          :redirect_uri => Rails.application.routes.url_helpers.user_omniauth_callback_path(:action => provider)
      }
    end
    provider_data
  end
end
