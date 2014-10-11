require 'delegate'
class PresenterBase < SimpleDelegator

  attr_accessor :session
  attr_accessor :view


  def initialize(obj, session = nil,view = nil)
    super(obj)
    session = session
    view = view
  end

  def wrapped_enum(presenter_class,enumerable, &block)
 #   puts "Presenter Class #{presenter_class.inspect}" .colorize(:red)
    presenter = presenter_class
    enumerable.each do |obj|
      presenter_class.__setobj__(obj)
      block.call(presenter)
    end
  end

  def model
    __getobj__
  end
end