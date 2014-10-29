Rails.application.routes.draw do

  devise_for :user, controllers: { registrations: "user_auth/registration",
                                   omniauth_callbacks: "user_auth/omniauth_callbacks"
  }

  devise_scope :user do
    get "usr/sign_up" => "user_auth/registration#new", as: 'user_signup'
    get "/check_profile" => "user_auth/registration#check_profile", as: 'user_check_profile'
  end
end
