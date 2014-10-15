class ItemCell < Cell::ViewModel
  include ActionView::Helpers::FormHelper
  include ActionView::Helpers::FormTagHelper
  include ActionView::Helpers::FormOptionsHelper
  include ActionView::RecordIdentifier
  include Kaminari::ActionViewExtension
  def list(items = nil)
    #puts "Items #{items}".colorize(:red)
    @items = ItemPresenter.new(items)
    if @items.blank?
      puts "Nothing Found!"
    else
      render
    end
  end
  def list_mobile(items = nil)

    puts "Items #{items}".colorize(:red)

    @items = ItemPresenter.new(items)
    if @items.blank?
      puts "Nothing Found!"
    else
      render
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
