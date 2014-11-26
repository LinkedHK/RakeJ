class ChangeSizeOfDefaultCurrency < ActiveRecord::Migration
  def change


    change_column(:field_currency,:default_currency,:integer, {:limit => 1})
  end
end
