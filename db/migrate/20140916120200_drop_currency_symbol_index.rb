class DropCurrencySymbolIndex < ActiveRecord::Migration
  def change
    remove_index(:field_currency,:currency_symbol)
  end
end
