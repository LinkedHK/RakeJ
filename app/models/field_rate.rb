class FieldRate <  ActiveRecord::Base
  self.table_name = 'field_rate'
  belongs_to :item
  belongs_to :field_currency, inverse_of: :field_rates
end


# == Schema Information

=begin

Table: field_rate
Columns:
id	int(11) AI PK
item_id	int(11)
rate_number	int(11)
currency	varchar(10)
=end