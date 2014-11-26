class CreateSiteSettings < ActiveRecord::Migration
  def change
    create_table :site_settings do |t|
      t.string :name, not_null: true,default: ''
      t.text :value, not_null: true
      t.timestamps
    end
  end
end
