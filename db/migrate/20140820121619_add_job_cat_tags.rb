
class AddJobCatTags < ActiveRecord::Migration
  def change

    create_table :item_categories do |t|
      t.integer :parent_id,default: -1
      t.string :name, null: false
    end

    create_table :job_tags do |t|
      t.belongs_to :items
      t.string :name,limit: 15
    end

    add_index(:item_categories,:name,:unique => true)
    add_index(:item_categories,:parent_id)



  end
end
