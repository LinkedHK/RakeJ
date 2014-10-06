class ItemCell < Cell::ViewModel
  def list
    @items = ItemPresenter.new(Item.all.limit(10))
    render
  end
  def item_li(item)
    @item = item
    render
  end

end
