class AddCurrencyField < ActiveRecord::Migration
  def change
    create_table :field_currency do |t|
      t.column :currency_title , :string , limit: 5
      t.column :currency_symbol , :string , limit: 5
      t.column :currency_description, :string , limit: 50
    end
    add_index :field_currency,:currency_title,{:unique => true}
    add_index :field_currency,:currency_symbol,{:unique => true}
  end
end
