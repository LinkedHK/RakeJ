
class AddJobCatTags < ActiveRecord::Migration
  def change

    create_table :job_categories do |t|
      t.integer :parent_id,default: -1
      t.string :name, null: false
    end

    create_table :job_tags do |t|
      t.belongs_to :job_items
      t.string :name,limit: 15
    end

    add_index(:job_categories,:name,:unique => true)
    add_index(:job_categories,:parent_id)



  end
end
