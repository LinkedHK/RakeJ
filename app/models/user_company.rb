class UserCompany < ActiveRecord::Base
  belongs_to :user
end

# == Schema Information

=begin

Table: user_companies
  Columns:
  id	int(11) AI PK
  company_name	varchar(50)
  company_address	varchar(255)
  company_description	text
  created_at	datetime
  updated_at	datetime


=end

