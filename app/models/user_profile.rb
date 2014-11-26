class UserProfile < ActiveRecord::Base
  belongs_to :user
  belongs_to :profile_type
end


# == Schema Information

=begin

Table: user_profiles
  Columns:
  id	int(11) AI PK
  user_id	int(11)
  first_name	varchar(30)
  last_name	varchar(30)
  created_at	datetime
  updated_at	datetime
  user_company_id	int(11)
  profile_type_id	int(11)
  profile_type_name	varchar(20)

=end

