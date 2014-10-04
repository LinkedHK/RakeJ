class RemoveRefernceTypeProfile < ActiveRecord::Migration
  def change
    remove_column(:profile_descriptions,:profile_types_id)
    add_reference(:profile_descriptions,:profile_type)
  end
end
