class ItemPresenter < PresenterBase
  include ActionView::Helpers::DateHelper

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
    unless r
      return "Not specified"
    end

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

  def created
    cr_date = model.created_at
    diff_time = Time.now - cr_date.to_time
    if diff_time > 24.hours
     I18n.t("form_input.item.item_posted",{:date => cr_date.strftime("%B %d, %Y")})
    else
      I18n.t("form_input.item.item_posted_ago", {:time_ago =>  time_ago_in_words(cr_date)})
    end
  end

  def modified
    model.created_at.strftime("%B %d, %Y")
  end

  def category
    model.item_category.category_descriptions.first.name
  end

  def to_hash
    {
        :id => model.id,
        :title=> title,
        :description => description,
        :category =>  category,
        :published => created,
        :location => location,
        :rate => rate
    }
  end

  def to_hash_list
    data = []
    list_items do |item|

      res = {
          :id => item.id,
          :title => item.title,
          :city => item.city,
          :district => item.district,
          :location => item.location,
          :created => item.created
      }

      data.push(res)
    end
    data
  end

end