class ModifyTagsTable < ActiveRecord::Migration
  def change

    drop_table(:item_tags)

    create_table :item_tags do |t|
      t.references :item
      t.string :tag_text , limit: 40
      t.datetime :tag_added

    end

    add_index(:item_tags,:tag_added)

  end
end
