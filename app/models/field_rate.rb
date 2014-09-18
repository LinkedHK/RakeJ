class FieldRate <  ActiveRecord::Base
  self.table_name = 'field_rate'
  belongs_to :item,touch: true
  belongs_to :field_currency, inverse_of: :field_rates

  before_save :normalize_currency,:check_rate

  def normalize_currency
   currency = FieldCurrency.find_by(id:  self.field_currency_id)
   if currency
     self.field_currency_id = currency.id
     self.currency_info = currency.currency_title
   else
     # Choose Default Currency if not found
     self.field_currency_id = FieldCurrency.default_currency.id
   end
  end
  def check_rate
    # Rate max
    if  (self.rate_min.blank? && self.rate_max.blank?) || (self.rate_min == 0 &&  self.rate_max == 0)
      self.negotiable = 1
    end
  end

end


# == Schema Information

=begin

Table: field_rate
Columns:
 id	int(11) AI PK
    item_id	int(11)
    currency	varchar(10)
    currency_info	varchar(5)
    field_currency_id	int(11)
    negotiable	int(11)
    rate_min	int(11)
    rate_max	int(11)
=end