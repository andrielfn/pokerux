require "spec_helper"

describe Sinatra::Application do
	describe "GET '/'" do
		it "should exist a page" do
			get '/'
			last_response.should be_ok
		end
	end
	
	describe "GET '/timer'" do
		it "should exist a page" do
			get '/timer'
			last_response.should be_ok
		end
	end
	
	describe "GET /settings" do
		it "should exist a page" do
			get '/settings'
			last_response.should be_ok
		end
	end
end