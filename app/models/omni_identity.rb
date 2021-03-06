class OmniIdentity < ActiveRecord::Base
  belongs_to :user

  validates_presence_of :uid,:provider

  def self. find_or_create(auth)
    find_or_create_by(uid: auth.uid, provider: auth.provider)
  end

end
