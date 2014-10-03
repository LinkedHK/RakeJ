class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable, :omniauthable

  has_many :items
  has_one :user_company
  has_one :user_profile

  accepts_nested_attributes_for :user_company
  accepts_nested_attributes_for :user_profile

end

# == Schema Information

=begin

Table: users
  Columns:
  id	int(11) AI PK
  email	varchar(255)
  password	varchar(100)
  password_salt	varchar(255)
  user_type	int(11)
  admin	int(11)
  account_status	int(11)
  verified	tinyint(1)
  registration_date	datetime
  login_date	datetime
  locale	varchar(10)
  created_at	datetime
  updated_at	datetime
  encrypted_password	varchar(255)
  reset_password_token	varchar(255)
  reset_password_sent_at	datetime
  remember_created_at	datetime
  sign_in_count	int(11)
  current_sign_in_at	datetime
  last_sign_in_at	datetime
  current_sign_in_ip	varchar(255)
  last_sign_in_ip	varchar(255)
  confirmation_token	varchar(255)
  confirmed_at	datetime
  confirmation_sent_at	datetime
  unconfirmed_email	varchar(255)

=end


