class UserAuth::RegistrationController < Devise::RegistrationsController

# GET /resource/sign_up
  def new
    build_resource({user_profile_attributes: {}})
    respond_with self.resource
  end

  def sign_up_params
    params.require(:user).permit(:email,:password, :password_confirmation,
                                         user_profile_attributes: [:first_name,:last_name]
          )
  end



end