module Utils
  module Common
    def is_int(str)
      str.match(/\A(?=.{1,11}$)\d+\z/) == nil ? false : true
    end
  end
end