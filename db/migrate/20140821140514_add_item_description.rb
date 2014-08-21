class AddItemDescription < ActiveRecord::Migration
  def change
    create_table :item_description do |t|
      t.belongs_to :item
      t.string :item_title
      t.text :item_description, limit: 2500
      t.string :locale , limit: 10
    end
    add_index(:item_description,:item_id)
  end
end
