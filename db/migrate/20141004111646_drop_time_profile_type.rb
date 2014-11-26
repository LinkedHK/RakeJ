class DropTimeProfileType < ActiveRecord::Migration
  def change
    remove_column(:profile_types,:created_at)
    remove_column(:profile_types,:updated_at)
  end
end
