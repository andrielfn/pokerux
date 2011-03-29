require "rubygems"
require "sinatra"
require "builder"

helpers do
	def title
		if @title.nil?
			"Pokerux"
		else
			"Pokerux :: #{@title}"
		end
	end
end

get "/" do
	@title = "Home"
	erb :home
end

get "/timer" do
	@title = "Timer"
	erb :timer
end

get "/settings" do
	@title = "Setting"
	@number_of_blinds = 12
	erb :settings
end

post "/settings" do
	product_xml
end

private

def product_xml
	xml = Builder::XmlMarkup.new( :indent => 2 )
	xml.instruct! :xml, :encoding => "ASCII"
	xml.levels do |p|
		10.times do |i|
			p.i do |q|
				q.blind "x"
			end
		end
	end
end