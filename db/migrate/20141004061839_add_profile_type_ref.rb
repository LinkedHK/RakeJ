class AddProfileTypeRef < ActiveRecord::Migration
  def change
    add_reference(:user_profiles,:profile_type)
    add_column(:user_profiles, :profile_type_name,:string,{:limit => 20})
  end
end
