class CreateProfileDescriptions < ActiveRecord::Migration
  def change

    remove_column(:profile_types,:profile_name)
    remove_column(:profile_types,:profile_description)

    create_table :profile_descriptions do |t|
      t.references :profile_types
      t.string :profile_name, :limit => 20
      t.string :locale, {:limit => 10, :default => 'en_Us'}
    end
  end
end
