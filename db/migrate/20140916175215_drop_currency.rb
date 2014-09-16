class DropCurrency < ActiveRecord::Migration
  def change
    remove_reference(:field_rate,:currency)
    add_reference(:field_rate,:field_currency)
  end
end
