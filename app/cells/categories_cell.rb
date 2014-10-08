class CategoriesCell <  Cell::ViewModel

  def category_list(args)
    @column_num = args[:columns]
    locale = args[:locale] ?  args[:locale] : 'en_US'
    @cat = ItemCategoryPresenter.new(CategoryDescription.all.where(:locale => locale))



    render

  end
end
