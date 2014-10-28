class OmniService

  TEMP_EMAIL_PREFIX = "tmp_email"
  attr_accessor :auth_query
  attr_reader :new_user

  def initialize(query)
    @auth_query = query
  end

  def check_uid
    identity = OmniIdentity.find_or_create(@auth_query)
    user = identity.user
    user = create_user if user.nil?
    update_identity(user, identity)
    user
  end

  def create_user
    @new_user = true
    user = User.where(:email => @auth_query.info.email).first
    if user.nil?
      user = build_user
      user.save!
      create_profile(user)
    end
    user
  end

  def build_user
    email = @auth_query.info.email ?  @auth_query.info.email  : "#{TEMP_EMAIL_PREFIX}-#{@auth_query.uid}-#{@auth_query.provider}.com"
    User.new(
        email: email,
        password: Devise.friendly_token[0,20]
    )
  end

  def update_identity(user,identity )
    if identity.user != user
      identity.user = user
      identity.save
    end
    identity
  end
  def create_profile(user)
    profile = UserProfile.new(user: user,
          first_name: @auth_query.info.first_name,
          last_name: @auth_query.info.last_name
    )
    profile.save
  end

end