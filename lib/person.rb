class Person
  include Subject
  def say_hi
    name = "John"
    notify_say_hi(name)
  end

end