class ItemCell < Cell::ViewModel
  include ActionView::Helpers::FormHelper
  include ActionView::Helpers::FormTagHelper
  include ActionView::Helpers::FormOptionsHelper
  include ActionView::RecordIdentifier

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



  def item_li(item)
    @item = item
    render
  end

  def main_search
    @item = Item.new
    @item.build_item_category
    @item.build_item_location
    @item.build_field_rate
    render 'main_search_form'
  end


end
