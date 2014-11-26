Dir[Rails.root.join('config', 'routes', '*.{rb}')].each do |file|
  load (file)
end