class ModifyDefaultType < ActiveRecord::Migration
  def change
    remove_column(:profile_types,:default)
    add_column(:profile_types,:default,:boolean,{:default => 0})
  end
end
