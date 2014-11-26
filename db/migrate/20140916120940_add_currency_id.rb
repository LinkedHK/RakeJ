class AddCurrencyId < ActiveRecord::Migration
  def change
    add_reference(:field_rate,:currency)
    add_column(:field_rate,:currency_info,:string,{:limit => 5})
  end
end
