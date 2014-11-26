class AddDefaultLocale < ActiveRecord::Migration
  def change
    change_column(:category_description,:locale,:string,default: 'en_US')
  end
end
