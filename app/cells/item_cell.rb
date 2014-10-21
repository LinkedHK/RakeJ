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
      @p_list = paginate(items, {:theme => 'mobile'})
      @page_entity = page_entries_info items, :entry_name => 'jobs'
      render
      else
        puts "Nothing Found!"
    end
  end

  def main_search(query = nil, mobile = false)
    if query
      @item = Item.new(query)
    else
      @item = Item.build
    end
    if mobile
      render 'main_search_form_mobile'
    else
      render 'main_search_form'
    end

  end




end
