class MoveCompanyData < ActiveRecord::Migration
  def change
    remove_column(:users,:company_address)
    remove_column(:users,:company_description)
    remove_column(:users,:company_name)
  end
end
