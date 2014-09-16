class AddDefaultCurrency < ActiveRecord::Migration
  def change
    add_column(:field_currency,:default_currency, :integer,{:default => 0})
    add_index(:field_currency,:default_currency)
  end

end
