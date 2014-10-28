class UserAuth::RegistrationController < Devise::RegistrationsController

# GET /resource/sign_up
  def new
    build_resource({user_profile_attributes: {}})
    respond_with self.resource

  end
  def create
    puts " Create params #{sign_up_params.inspect}" .colorize(:red)
    super
  end

  def sign_up_params
    params.require(:user).permit(:email,:password, :password_confirmation,
                                         user_profile_attributes: [:first_name,:last_name,:profile_type_id])
  end

  def check_profile


  end

  def after_sign_up_path_for(resource)
    url_for :item_index
  end


end