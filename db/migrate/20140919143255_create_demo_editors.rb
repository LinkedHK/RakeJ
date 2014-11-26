class CreateDemoEditors < ActiveRecord::Migration
  def change
    create_table :demo_editors do |t|
      t.string :title
      t.text :descr, limit: 2500
      t.timestamps
    end
  end
end
