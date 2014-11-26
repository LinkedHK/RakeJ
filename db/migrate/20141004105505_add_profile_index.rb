class AddProfileIndex < ActiveRecord::Migration
  def change
    add_index(:user_profiles,:profile_type_id)
  end
end
