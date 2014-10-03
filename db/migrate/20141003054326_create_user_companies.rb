class CreateUserCompanies < ActiveRecord::Migration
  def change
    create_table :user_companies do |t|
      t.references :user
      t.string :company_name, limit: 50
      t.string :company_address
      t.text :company_description, limit: 2000
      t.timestamps
    end
  end
end
