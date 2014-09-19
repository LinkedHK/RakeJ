class StaticController < ApplicationController

  def index

    @dumbs= DemoEditor.all.order('created_at DESC')

  end

  def new
    @editor = DemoEditor.new
  end

  def create
    @editor = DemoEditor.new(editor_params)
    respond_to do |f|
        if @editor.save
        f.html { redirect_to :back}
        f.json{ render :json => {:result => 1, :info => "Successfully created"}}
        else
          f.html { redirect_to :back}
          f.json{ render :json => {:result => 0, :info => "Failure"}}
        end
      end
  end

  def editor_params
   params.require(:demo_editor).permit(:title,:descr)
  end

  def destroy

    puts "params #{params.inspect}" .colorize(:red)
   DemoEditor.destroy(params[:id])

    redirect_to :back

  end



end