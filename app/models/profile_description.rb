class ProfileDescription < ActiveRecord::Base
  belongs_to :profile_type

  def self.types_list
    self.all.where(:locale => 'en_US')
  end
  def self.select_default
  result =  self.joins('Inner join  `profile_types`  on
`profile_descriptions` .`profile_type_id` =  `profile_types`.`id` where profile_descriptions.locale = "en_US"and profile_types.default = 1 ')
    .select('profile_types.id as `default` ').first
    if result
      result.default
    else
      result
    end
  end

end


# == Schema Information




=begin

Table: profile_descriptions
  Columns:
  id	int(11) AI PK
  profile_types_id	int(11)
  profile_name	varchar(20)
  locale	varchar(10)


=end

