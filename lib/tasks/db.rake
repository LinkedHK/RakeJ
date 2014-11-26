task 'db:custom_seed' do
  mutex = Mutex.new
  q = Queue.new
   raw =  Thread.new{
       if q.pop
           Rake::Task["db:raw_seed"].invoke
           q.push({:raw => true})
         end
    }
  seed_fu = Thread.new{
        mutex.synchronize do
          puts "Task Seeding seed_fu " .colorize(:red)
          Rake::Task["db:seed_fu"].invoke
          puts "Task Seeding seed_fu finished  " .colorize(:red)
          q.push(true)
        end
  }
  seed_fu.join
  raw.join
end

task 'db:raw_seed' do
  puts "Task Seeding raw_seed " .colorize(:red)
  # http://stackoverflow.com/questions/19872271/adding-a-custom-seed-file
  Dir[File.join(Rails.root,'db','raw_seeds', '*.rb')].sort.each do |filename|
    #task_name = File.basename(filename,'.rb').intern
    #task task_name => :environment do
      load(filename) if File.exist?(filename)
    #end
  end
  puts "Task Seeding raw_seed finished" .colorize(:red)
end

