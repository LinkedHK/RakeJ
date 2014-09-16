class FieldCurrency < ActiveRecord::Base

  self.table_name = 'field_currency'
  has_many :field_rates, inverse_of: :field_currency

  def self.default_currency
    self.where(:default_currency => 1).first
  end

  def self.normalize_order
    self.all.order('currency_title Desc',:default_currency)
  end
end

# == Schema Information

=begin

Table: field_currency
  Columns:
    id	int(11) AI PK
    currency_title	varchar(5)
    currency_symbol	varchar(5)
    currency_description	varchar(50)
    currency_code	varchar(5)
    default_currency	int(11)


=end

