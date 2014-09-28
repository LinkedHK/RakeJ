require 'delegate'
class DecoratorBase < SimpleDelegator


  def model
    __getobj__
  end
end