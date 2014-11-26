class ProfileType < ActiveRecord::Base
  has_many :user_profiles
  has_many :profile_description


end


# == Schema Information

=begin

  Columns:
  Table: profile_types
  Columns:
  id	int(11) AI PK
  enabled	tinyint(4)
  default	tinyint(1)


=end

