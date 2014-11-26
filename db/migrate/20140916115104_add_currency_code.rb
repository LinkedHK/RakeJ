class AddCurrencyCode < ActiveRecord::Migration
  def change
    add_column(:field_currency,:currency_code,:string,{limit: 5})
  end
end
