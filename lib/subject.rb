module Subject

  attr_reader :observers

  def initialize
    @observers = []
  end

  def add_observer(name, *args)
    args.each {  |arg| @observers[name] <<  arg }
  end

  def delete_observer(name, *args)
      args.each{ |arg| @observers[name].delete(arg) }
  end

  def notify_say_hi(name)
    observers['say_hi'].each { |o| o.on_say(name) }
  end


end