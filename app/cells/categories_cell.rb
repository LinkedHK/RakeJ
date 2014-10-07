class CategoriesCell <  Cell::ViewModel

  def category_list(args)

    @cat = ItemCategoryPresenter.new(CategoryDescription.all)
    @column_num = args[:columns]

    render

  end
end
