class JobCategory < ActiveRecord::base
  has_many :job_items

end