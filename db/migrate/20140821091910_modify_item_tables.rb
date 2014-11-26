class ModifyItemTables < ActiveRecord::Migration
  def change
    remove_column(:job_items,:job_title)
    rename_table(:job_tags,:item_tags)
    rename_table(:job_categories,:item_categories)
    rename_table(:job_items,:items)
  end
end
