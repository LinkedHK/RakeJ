class ItemDescription < ActiveRecord::Base
  self.table_name = 'item_description'
  belongs_to :item, touch: true

  validates_presence_of :item_title , message: I18n.t("form_input.validation.empty_title")
  validates_presence_of :description_text, message:  I18n.t("form_input.validation.empty_description")

# == Schema Information

=begin
Table: item_description
  Columns:
  id	int(11) AI PK
  item_id	int(11)
  item_title	varchar(255)
  item_description	text
  locale	varchar(10)
=end



end