class CreateCorrectProfileDescriptions < ActiveRecord::Migration
  def change
      remove_column(:profile_descriptions,:locale)
     add_column(:profile_descriptions,:locale,:string, {:limit => 10, :default => 'en_US'})
  end
end
