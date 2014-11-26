class AddUser < ActiveRecord::Migration
  def change

    create_table :users do |t|
      t.string :first_name
      t.string :last_name
      t.string :email, null: false
      t.string :password, limit: 100,null: false
      t.string :password_salt
      t.integer :user_type,default: 0 # Job seeker, Recruiter
      t.integer :admin,default: 0
      t.integer :account_status, default: 1 # Enabled disabled
      t.boolean :verified, default: false
      t.datetime :registration_date
      t.datetime :login_date
      t.string :company_name, limit: 30
      t.string :company_address
      t.text :company_description, limit: 2000
      t.string :locale, limit: 10
      t.timestamps
    end

    add_index(:users,:email,:unique => true)
    add_index(:users,:company_name)
    add_index(:users,[:created_at,:updated_at])
  end
end
