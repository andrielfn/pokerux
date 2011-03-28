require "spec_helper"

describe Sinatra::Application do
	describe "GET '/'" do
		it "should exist a home page" do
			get '/'
			last_response.should be_ok
		end
	end
end