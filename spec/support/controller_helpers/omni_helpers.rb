module OmniHelpers
  def set_omniauth(opts = {})


    OmniAuth.config.test_mode = true

    OmniAuth.config.add_mock(:facebook,
                             :provider => 'facebook',
                             :uid => '1234567',
                             :info => {
                                 :nickname => 'jbloggs',
                                 :email => 'joe@bloggs.com',
                                 :name => 'Joe Bloggs',
                                 :first_name => 'Joe',
                                 :last_name => 'Bloggs',
                                 :image => 'https://graph.facebook.com/1234567/picture?type=square',
                                 :urls => { :Facebook => 'http://www.facebook.com/jbloggs' },
                                 :location => 'Palo Alto, California',
                                 :verified => true
                             })
    request.env["omniauth.auth"] = OmniAuth.config.mock_auth[:facebook]
  end

  def set_invalid_omniauth(opts = {})
    OmniAuth.config.add_mock(:invalid,
                             :provider => nil,
                             :uid => nil)
    request.env["omniauth.auth"] = OmniAuth.config.mock_auth[:invalid]
  end

  def provider_url(pr)
    Rails.application.routes.url_helpers.user_omniauth_authorize_path(:provider => pr)
  end
end

RSpec.configure do |config|
  config.include OmniHelpers, :type => :controller
end