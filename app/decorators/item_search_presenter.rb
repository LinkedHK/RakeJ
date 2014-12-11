class ItemSearchPresenter < ItemPresenter

  def live_search_hash
    data = []
    list_items do |item|
      res = {
          :id => item.id,
          :category_id => item.item_category.id,
          :category_name => item.category,
          :title => item.title,
      }
      data.push(res)
    end
    data

  end

end