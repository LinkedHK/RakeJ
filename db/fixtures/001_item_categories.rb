ItemCategory.seed do |s|
  s.id = 1
  s.parent_id = -1
  s.enabled = 1
  s.slug = 'information-technology'
end

CategoryDescription.seed do |s|
  s.item_category_id = 1
  s.name = 'Information Technology'
end


ItemCategory.seed do |s|
  s.id = 2
  s.parent_id = -1
  s.enabled = 1
  s.slug = 'accounting'
end


CategoryDescription.seed do |s|
    s.item_category_id = 2
    s.name = 'Accounting'
end


ItemCategory.seed do |s|
  s.id = 3
  s.parent_id = -1
  s.enabled = 1
  s.slug = 'human-resources'
end


CategoryDescription.seed do |s|
    s.item_category_id = 3
    s.name = 'Human Resources'
end

ItemCategory.seed do |s|
  s.id = 4
  s.parent_id = -1
  s.enabled = 1
  s.slug = 'banking-finance'
end


CategoryDescription.seed do |s|
  s.item_category_id = 4
  s.name = 'Banking / Finance'
end



ItemCategory.seed do |s|
  s.id = 5
  s.parent_id = -1
  s.enabled = 1
  s.slug = 'engineering'
end


CategoryDescription.seed do |s|
  s.item_category_id = 5
  s.name = 'Engineering'
end

ItemCategory.seed do |s|
  s.id = 6
  s.parent_id = -1
  s.enabled = 1
  s.slug = 'marketing-public-relations'
end


CategoryDescription.seed do |s|
  s.item_category_id = 6
  s.name = 'Marketing / Public Relations'
end


ItemCategory.seed do |s|
  s.id = 7
  s.parent_id = -1
  s.enabled = 1
  s.slug = 'sales-customer-service'
end


CategoryDescription.seed do |s|
  s.item_category_id = 7
  s.name = 'Sales / Customer Service'
end

ItemCategory.seed do |s|
  s.id = 8
  s.parent_id = -1
  s.enabled = 1
  s.slug = 'other'
end


CategoryDescription.seed do |s|
  s.item_category_id = 8
  s.name = 'other'
end







