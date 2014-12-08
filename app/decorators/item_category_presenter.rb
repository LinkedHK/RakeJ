class ItemCategoryPresenter < PresenterBase
  include ActionView::Context
  include ActionView::Helpers::TagHelper
  include ActionView::Helpers::OutputSafetyHelper
  include ActionView::Helpers::UrlHelper
  include ActionView::Helpers::ControllerHelper
  def tree(column_num = 2, &block)
    @categories = model
    length = @categories.length
    per_column = length/column_num
    counter = 0
   block.call( raw("<ul>") )
     @categories.each do |category|
       cat = category.item_category
       slug = cat.slug == "" ? cat.id : cat.slug
       if counter > per_column
         counter = 0
         block.call(raw("</ul>"))
         block.call(raw("<ul>"))
       end

       block.call( content_tag :li,link_to(category.name + " (#{cat.items_count})",
                               item_browse_path(slug)))
       counter +=1
     end
    block.call( raw("</ul>") )
  end

  protected
  def item_browse_path(slug)
    Rails.application.routes.url_helpers.item_browse_path({:slug => slug })
  end
# content_tag(:span, cat.items_count)
end