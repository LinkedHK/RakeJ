FieldCurrency.seed do |s|
  s.id = 1
  s.currency_title = "HK$"
  s.currency_description = "Hong Kong Dollar"
  s.currency_symbol = "$"
  s.currency_code = "HKD"
  s.default_currency = 1
end


FieldCurrency.seed do |s|
  s.id = 2
  s.currency_title = "SG$"
  s.currency_symbol = "$"
  s.currency_description = "Singapore Dollar"
  s.currency_code = "SGD"
  s.default_currency = 0
end

FieldCurrency.seed do |s|

  s.id = 3
  s.currency_title = "US$"
  s.currency_description = "United States Dollar"
  s.currency_symbol = "$"
  s.currency_code = "USD"
  s.default_currency = 0
end
