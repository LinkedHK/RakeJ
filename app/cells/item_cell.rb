class ItemCell < Cell::ViewModel
  def list(category = nil, limit = 10)
    result = nil
    if category
      result  = ItemCategory.browse(category,limit)
    else
      result = Item.all.limit(limit)
    end
    @items = ItemPresenter.new(result)
    render
  end
  def item_li(item)
    @item = item
    render
  end

end
