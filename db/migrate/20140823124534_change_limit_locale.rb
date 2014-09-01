class ChangeLimitLocale < ActiveRecord::Migration
  def change
    change_column(:category_description,:locale,:string,{:default => 'en_US',:limit => 5})
  end
end
