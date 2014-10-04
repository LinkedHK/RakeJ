class RemoveUserId < ActiveRecord::Migration
  def change
    remove_column(:user_companies,:user_id)
  end
end
