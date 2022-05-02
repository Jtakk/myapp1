require 'rails_helper'

RSpec.describe SessionsHelper, type: :helper do
  let(:user) { create(:user) }

  before do
    log_in(user)
    current_user
  end

  context "login state" do
    it "saves the user_id in the session" do
      expect(session[:user_id]).to eq user.id
    end

    it "substitutes the user for the instance variable" do
      expect(@current_user).to eq user
    end

    it "returns true" do
      expect(logged_in?).to eq true
    end
  end

  context "logout state" do
    before { log_out }

    it "deletes the user_id from the session" do
      expect(session[:user_id]).to eq nil
    end

    it "deletes the instance variable" do
      expect(@current_user).to eq nil
    end

    it "returns false" do
      expect(logged_in?).to eq false
    end
  end
end
