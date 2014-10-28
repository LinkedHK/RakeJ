class CreateOmniIdentities < ActiveRecord::Migration
  def change
    create_table :omni_identities do |t|
      t.references :user, index: true
      t.string :provider, not_null: false, default: ''
      t.string :uid,not_null: false, default: ''
      t.timestamps
    end
    add_index(:omni_identities,:uid, unique: true)
    add_index(:omni_identities,:provider)
  end
end
