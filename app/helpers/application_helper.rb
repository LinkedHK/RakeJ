require 'sanitize'
module ApplicationHelper
  def sanitize_descr(desc)
   data = Sanitize.fragment( desc,
        :elements => ['li','ul','ol','br','h1','strong','b', 'a','span','p'],
        :attributes => { 'a' => ['href','title', 'style'],
                          'li' => ['style'],
                          'p' => ['style'],
                          'ul' => ['style'],
                          'ol' => ['style'],
                          'br' => ['style'],
                          'h1' => ['style'],
                          'strong' => ['style'],
                          'b' => ['style'],
                          'a' => ['style'],
                          'span' => ['style']

        },
        :protocols => {
            'a' => {'href' => ['http', 'https', 'mailto', 'ftp']}
        },
         :css => {
             :properties => ['text-align']
         }
    )

    raw data
  end


end
