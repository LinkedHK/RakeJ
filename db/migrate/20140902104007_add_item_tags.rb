class AddItemTags < ActiveRecord::Migration
  def change
    create_table :item_tags do |t|
      t.references :item
      t.references :tag_list
    end
  end
end
