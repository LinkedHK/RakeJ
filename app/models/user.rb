class User < ActiveRecord::base
  has_many :job_items
end