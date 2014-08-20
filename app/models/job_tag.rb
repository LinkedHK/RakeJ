class JobTag < ActiveRecord::base
  belongs_to :job_items
end