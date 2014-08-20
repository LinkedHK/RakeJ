class JobItem < ActiveRecord::base
  belongs_to :user
  belongs_to :job_category
  has_many :job_tags
  has_one :location
end