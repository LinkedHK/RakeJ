class ItemCell < Cell::ViewModel
  include ActionView::Helpers::FormHelper
  include ActionView::Helpers::FormTagHelper
  include ActionView::Helpers::FormOptionsHelper
  include ActionView::RecordIdentifier
  include Kaminari::ActionViewExtension
  def list(items = nil)
    #puts "Items #{items}".colorize(:red)

    if items.blank?
      puts "Nothing Found!"
    else

      @items = ItemPresenter.new(items)
      render
    end
  end
  def list_mobile(items = nil)
    if items.present?
      @items = ItemPresenter.new(items)
      @pagin = items
      @items_num = items.length
      @p_list = paginate(items)
      render
      else
        puts "Nothing Found!"
    end
  end
  def main_search(query = nil)
    if query
      @item = Item.new(query)
    else
      @item = Item.build
    end
    render 'main_search_form'
  end




end
