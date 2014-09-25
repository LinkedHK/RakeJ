require 'capybara'
require 'capybara/dsl'
require 'capybara/poltergeist'


Capybara.configure do |c|
  c.javascript_driver = :poltergeist
  c.default_wait_time = 5
end

RSpec.configure do |config|
  config.include Capybara::DSL
end