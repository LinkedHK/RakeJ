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

ActiveRecord::Schema.define(version: 20140820121758) do

  create_table "job_categories", force: true do |t|
    t.integer "parent_id", default: -1
    t.string  "name",                   null: false
  end

  add_index "job_categories", ["name"], name: "index_job_categories_on_name", unique: true, using: :btree
  add_index "job_categories", ["parent_id"], name: "index_job_categories_on_parent_id", using: :btree

  create_table "job_items", force: true do |t|
    t.integer  "user_id"
    t.integer  "job_categories_id"
    t.string   "job_type"
    t.integer  "duration_day"
    t.integer  "duration_weeks"
    t.integer  "duration_month"
    t.string   "job_status"
    t.string   "location_country"
    t.string   "location_city"
    t.string   "location_district"
    t.string   "job_title",                     null: false
    t.text     "job_description"
    t.datetime "planned_start_date"
    t.integer  "salary_min"
    t.string   "salary_max"
    t.string   "currency",           limit: 10
    t.string   "language",           limit: 10
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "job_items", ["user_id"], name: "index_job_items_on_user_id", using: :btree

  create_table "job_tags", force: true do |t|
    t.integer "job_items_id"
    t.string  "name",         limit: 15
  end

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
