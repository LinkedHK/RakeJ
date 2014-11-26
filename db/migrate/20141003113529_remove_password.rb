class RemovePassword < ActiveRecord::Migration
  def change
    remove_column(:users,:password)
    remove_column(:users,:password_salt)
  end
end
