class CategoriesCell <  Cell::ViewModel

  def category_list(column)

    @cat = ItemCategoryPresenter.new(CategoryDescription.all)



    render

  end
end
