class ItemCategoryPresenter < PresenterBase
  include ActionView::Context
  include ActionView::Helpers::TagHelper
  include ActionView::Helpers::OutputSafetyHelper

  def tree(column_num = 2, &block)
    @categories = model.all.where(:locale => 'en_US')
    length = @categories.length
    per_column = length/column_num
    counter = 0
   block.call( raw("<ul>") )
     @categories.each do |category|
       if counter > per_column
         counter = 0
         block.call(raw("</ul>"))
         block.call(raw("<ul>"))
       end
       block.call( content_tag(:li,category.name))
       counter +=1
     end
    block.call( raw("</ul>") )
  end

end