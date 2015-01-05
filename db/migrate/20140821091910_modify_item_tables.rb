class ModifyItemTables < ActiveRecord::Migration
  def change
    remove_column(:items,:job_title)
    rename_table(:job_tags,:item_tags)
  end
end
