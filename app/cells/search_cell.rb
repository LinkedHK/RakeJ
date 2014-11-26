class SearchCell < Cell::ViewModel
  include ActionView::Helpers::FormHelper
  include ActionView::Helpers::FormTagHelper
  include ActionView::Helpers::FormOptionsHelper
  include ActionView::RecordIdentifier
  include Kaminari::ActionViewExtension
  def main_search(query = nil)
    @item = build_item(query)
    render 'main_search_form'
  end

  def main_search_mobile(query = nil)
    @item = build_item(query)
    render 'main_search_form_mobile'
  end

  protected

  def build_item(query)
    item = nil
    if query
      item = Item.new(query)
    else
      item = Item.build
    end
    item
  end




end
