class CreateUserProfiles < ActiveRecord::Migration
  def change
    create_table :user_profiles do |t|
      t.references :user
      t.string :first_name, limit: 30
      t.string :last_name, limit: 30
      t.timestamps
    end
  end
end
