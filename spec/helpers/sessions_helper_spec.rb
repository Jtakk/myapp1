require 'rails_helper'

RSpec.describe SessionsHelper, type: :helper do
  let(:user) { create(:user) }
  let(:mountain) { create(:mountain) }

  describe "#log_in(user)" do
    it "saves the user_id in the session" do
      log_in(user)
      expect(session[:user_id]).to eq user.id
    end
  end

  describe "#remember(user)" do
    before { remember(user) }

    it "saves the user_id in the cookies" do
      expect(cookies[:user_id]).to be_present
    end

    it "saves the remember_token in the cookies" do
      expect(cookies[:remember_token]).to eq user.remember_token
    end
  end

  describe "#current_user" do
    context "when the session has the user_id" do
      before { log_in(user) }

      it "substitutes the user for the current_user" do
        expect(current_user).to eq user
        expect(@current_user).to eq user
      end
    end

    context "when the cookies have the user_id and the remember_token" do
      before { remember(user) }

      it "substitutes the user for the current_user" do
        expect(current_user).to eq user
        expect(@current_user).to eq user
      end

      it "saves the user_id in the session" do
        current_user
        expect(session[:user_id]).to eq user.id
      end
    end

    context "when the cookies have the user_id and the remember_token,
                              but the user has a wrong remember_digest" do
      before do
        remember(user)
        user.update_attribute(:remember_digest, User.digest(User.new_token))
      end

      it "doesn't substitute the user for the current_user" do
        expect(current_user).to eq nil
      end
    end

    context "when both the session and the cookies don't have anything" do
      it "doesn't substitute the user for the current_user" do
        expect(current_user).to eq nil
      end
    end
  end

  describe "#current_user?(user)" do
    subject { current_user?(user) }

    let(:other_user) { create(:user) }

    context "when logged in as correct user" do
      it "returns true" do
        log_in(user)
        is_expected.to eq true
      end
    end

    context "when logged in as wrong user" do
      it "returns false" do
        log_in(other_user)
        is_expected.to eq false
      end
    end
  end

  describe "#logged_in?" do
    subject { logged_in? }

    context "when logged in" do
      it "returns true" do
        log_in(user)
        is_expected.to eq true
      end
    end

    context "when not logged in" do
      it "returns false" do
        is_expected.to eq false
      end
    end
  end

  describe "#forget(user)" do
    before do
      remember(user)
      forget(user)
    end

    it "deletes the user_id from the cookies" do
      expect(cookies[:user_id]).to eq nil
    end

    it "deletes the remember_token from the cookies" do
      expect(cookies[:remember_token]).to eq nil
    end
  end

  describe "#log_out" do
    before do
      log_in(user)
      remember(user)
      log_out
    end

    it "deletes the user_id from the cookies" do
      expect(cookies[:user_id]).to eq nil
    end

    it "deletes the remember_token from the cookies" do
      expect(cookies[:remember_token]).to eq nil
    end

    it "deletes the user_id from the session" do
      expect(session[:user_id]).to eq nil
    end

    it "deletes the instance variable" do
      expect(@current_user).to eq nil
    end
  end
end
