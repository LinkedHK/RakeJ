# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140916175903) do

  create_table "category_description", force: true do |t|
    t.integer "item_category_id"
    t.string  "name",             limit: 100
    t.string  "locale",           limit: 5,   default: "en_US"
  end

  add_index "category_description", ["item_category_id"], name: "index_category_description_on_item_category_id", using: :btree
  add_index "category_description", ["locale"], name: "index_category_description_on_locale", using: :btree

  create_table "field_currency", force: true do |t|
    t.string  "currency_title",       limit: 5
    t.string  "currency_symbol",      limit: 5
    t.string  "currency_description", limit: 50
    t.string  "currency_code",        limit: 5
    t.integer "default_currency",                default: 0
  end

  add_index "field_currency", ["currency_title"], name: "index_field_currency_on_currency_title", unique: true, using: :btree
  add_index "field_currency", ["default_currency"], name: "index_field_currency_on_default_currency", using: :btree

  create_table "field_rate", force: true do |t|
    t.integer "item_id"
    t.integer "rate_number"
    t.string  "currency",          limit: 10
    t.string  "currency_info",     limit: 5
    t.integer "field_currency_id"
  end

  add_index "field_rate", ["item_id"], name: "index_field_rate_on_item_id", unique: true, using: :btree

  create_table "item_categories", force: true do |t|
    t.integer "parent_id", default: -1
    t.boolean "enabled"
  end

  add_index "item_categories", ["enabled"], name: "index_item_categories_on_enabled", using: :btree
  add_index "item_categories", ["parent_id"], name: "index_item_categories_on_parent_id", using: :btree

  create_table "item_description", force: true do |t|
    t.integer "item_id"
    t.string  "item_title"
    t.text    "description_text"
    t.string  "locale",           limit: 10
  end

  add_index "item_description", ["item_id"], name: "index_item_description_on_item_id", using: :btree

  create_table "item_location", force: true do |t|
    t.integer "location_country_id"
    t.string  "s_country"
    t.integer "location_city_id"
    t.string  "s_city"
    t.integer "location_district_id"
    t.string  "s_district"
    t.decimal "d_coord_lat",          precision: 10, scale: 6
    t.decimal "d_coord_long",         precision: 10, scale: 6
    t.integer "item_id"
  end

  create_table "item_tags", force: true do |t|
    t.integer  "item_id"
    t.string   "tag_text",  limit: 40
    t.datetime "tag_added"
  end

  add_index "item_tags", ["tag_added"], name: "index_item_tags_on_tag_added", using: :btree

  create_table "items", force: true do |t|
    t.integer  "user_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "item_category_id"
  end

  add_index "items", ["user_id"], name: "index_items_on_user_id", using: :btree

  create_table "location_city", force: true do |t|
    t.integer "location_country_id"
    t.string  "name"
  end

  add_index "location_city", ["location_country_id"], name: "index_location_city_on_location_country_id", using: :btree
  add_index "location_city", ["name"], name: "index_location_city_on_name", unique: true, using: :btree

  create_table "location_country", force: true do |t|
    t.string "name", null: false
  end

  add_index "location_country", ["name"], name: "index_location_country_on_name", unique: true, using: :btree

  create_table "location_district", force: true do |t|
    t.integer "location_city_id"
    t.string  "name"
  end

  add_index "location_district", ["location_city_id"], name: "index_location_district_on_location_city_id", using: :btree
  add_index "location_district", ["name"], name: "index_location_district_on_name", unique: true, using: :btree

  create_table "sessions", force: true do |t|
    t.string   "session_id", null: false
    t.text     "data"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "sessions", ["session_id"], name: "index_sessions_on_session_id", unique: true, using: :btree
  add_index "sessions", ["updated_at"], name: "index_sessions_on_updated_at", using: :btree

  create_table "users", force: true do |t|
    t.string   "first_name"
    t.string   "last_name"
    t.string   "email",                                           null: false
    t.string   "password",            limit: 100,                 null: false
    t.string   "password_salt"
    t.integer  "user_type",                       default: 0
    t.integer  "admin",                           default: 0
    t.integer  "account_status",                  default: 1
    t.boolean  "verified",                        default: false
    t.datetime "registration_date"
    t.datetime "login_date"
    t.string   "company_name",        limit: 30
    t.string   "company_address"
    t.text     "company_description"
    t.string   "locale",              limit: 10
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "users", ["company_name"], name: "index_users_on_company_name", using: :btree
  add_index "users", ["created_at", "updated_at"], name: "index_users_on_created_at_and_updated_at", using: :btree
  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree

end
