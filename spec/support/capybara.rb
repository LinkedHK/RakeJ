require 'capybara'
require 'capybara/dsl'
require 'capybara/poltergeist'

Capybara.register_driver :selenium_chrome do |app|
  Capybara::Selenium::Driver.new(app, :browser => :chrome)
end


Capybara.configure do |c|
  #c.javascript_driver = :poltergeist
  #c.javascript_driver = :selenium

 # c.app_host = 'http://dis.ddns.net:3000'
 # c.server_port =  3000

  c.default_wait_time = 5
  c.current_driver = :selenium_chrome


end




RSpec.configure do |config|
  config.include Capybara::DSL
end