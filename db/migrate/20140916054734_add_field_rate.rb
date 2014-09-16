class AddFieldRate < ActiveRecord::Migration
  def change
    create_table :field_rate do |t|
      t.references :item
      t.column :rate_number,:integer
      t.column :currency, :string, limit: 10
    end
    add_index :field_rate,:item_id, :unique => true
  end
end
