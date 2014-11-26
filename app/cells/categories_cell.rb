class CategoriesCell <  Cell::ViewModel
  include ActionView::Helpers::CacheHelper
  include Kaminari::ActionViewExtension

  def category_list(args)
    @column_num = args[:columns]
    locale = args[:locale] ?  args[:locale] : 'en_US'
    @cat = ItemCategoryPresenter.new(CategoryDescription.all.where(:locale => locale))
    render
  end
  def category_list_mobile(args)
    @column_num = args[:columns]
    locale = args[:locale] ?  args[:locale] : 'en_US'
    @cat = ItemCategoryPresenter.new(CategoryDescription.all.where(:locale => locale))
    render
  end
end
