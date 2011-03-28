require "rubygems"
require "sinatra"

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