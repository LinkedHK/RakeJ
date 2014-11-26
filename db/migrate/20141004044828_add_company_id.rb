class AddCompanyId < ActiveRecord::Migration
  def change
    remove_column(:users,:user_type)
    add_reference(:user_profiles,:user_company, {:default => -1 })
    #add_column(:user_profiles,:profile_type,:integer,{:limit => 3} )
    #add_column(:user_profiles,:profile_type_name,:string,{:limit => 20} )
    #add_index(:user_profiles,:profile_type)
  end
end
