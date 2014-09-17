#spec/features/test_spec.rb

require 'spec_helper'
require 'i18n'
describe 'accessibility of webpage' do
  it 'should access web page' do
    visit '/item/new'
  #  expect(page).to have_content I18n.t("form_input.item.item_currency")
  end
end