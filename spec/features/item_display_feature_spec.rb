require 'rails_helper'
require 'spec_helper'

describe 'Display items list' do

  before(:all) do
    query_log
  end

  it 'Should display item list', :js => true do
    ItemPresenter.new(FactoryGirl.create(:item_with_description))
    visit item_index_path
  end


end