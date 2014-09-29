class ItemPresenter < PresenterBase
  include  ActionView::Helpers
  include  ActionView::Helpers::Tags
  include  ActionView::Helpers::TagHelper

  def list_items(&block)
    wrapped_enum(self,model,&block)
  end
  def title
    model.item_descriptions[0].item_title
  end

  def description
    model.item_descriptions[0].description_text
  end

  def field_rate
    model.field_rate
  end
  def salary_range
    r = field_rate
    if r.rate_max > 0
      [r.rate_min.to_i,r.rate_max.to_i].join("-")
    else
      r.rate_min
    end
  end
  def rate
    r = field_rate
    if r.negotiable == 1
      I18n.t("form_input.item.item_negotiable")
    else
      [salary_range,field_rate.currency_info].join(" ")
    end
  end

  def city
    model.item_location.s_city
  end

  def district
    model.item_location.s_district
  end


  def tags
    model.item_tags_list
  end


  def location
    data =[]
    if city
      data.append(city)
    end
    if district
      data.append(district)
    end
    data.join(", ")
  end



end