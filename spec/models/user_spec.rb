require 'rails_helper'

RSpec.describe User, type: :model do
  let(:user) { build(:user) }

  it "has a valid value" do
    expect(user).to be_valid
  end

  describe "name validation" do
    let(:blank_name_user) { build(:user, name: "") }
    let(:long_name_user) { build(:user, name: "a" * 31) }

    it "is invalid with a blank name" do
      expect(blank_name_user).not_to be_valid
      blank_name_user.valid?
      expect(blank_name_user.errors.messages[:name]).to include("can't be blank")
    end

    it "is invalid with a too long name" do
      expect(long_name_user).not_to be_valid
      long_name_user.valid?
      expect(long_name_user.errors.messages[:name]).
        to include("is too long (maximum is 30 characters)")
    end
  end

  describe "email validation" do
    let(:blank_email_user) { build(:user, email: "") }
    let(:long_email_user) { build(:user, email: "a" * 244 + "@example.com") }
    let(:valid_email_user_list) { build_list(:user, 5) }
    let(:valid_emails) do
      %w(foo@bar.com FOO@bar.COM F_O-O@bar.baz.org foo.bar@baz.jp foo+bar@baz.cn)
    end
    let(:invalid_email_user_list) { build_list(:user, 6) }
    let(:invalid_emails) do
      %w(foo@bar,com foo_bar.org foo.bar@baz foo@bar_baz.com foo@bar+baz.com foo@bar..com)
    end

    it "is invalid with a blank email" do
      expect(blank_email_user).not_to be_valid
      blank_email_user.valid?
      expect(blank_email_user.errors.messages[:email]).to include("can't be blank")
    end

    it "is invalid with a too long email" do
      expect(long_email_user).not_to be_valid
      long_email_user.valid?
      expect(long_email_user.errors.messages[:email]).
        to include("is too long (maximum is 255 characters)")
    end

    it "is valid with a email formatted correctly" do
      valid_email_user_list.map.with_index { |user, i| user.email = valid_emails[i] }
      valid_email_user_list.each do |user|
        expect(user).to be_valid
      end
    end

    it "is invalid with a email formatted incorrectly" do
      invalid_email_user_list.map.with_index { |user, i| user.email = invalid_emails[i] }
      invalid_email_user_list.each do |user|
        expect(user).not_to be_valid
      end
    end

    it "is invalid with a duplicated email" do
      duplicated_user = user.dup
      duplicated_user.email.upcase!
      user.save
      expect(duplicated_user).not_to be_valid
    end

    it "converts a email to lower-case before save" do
      mixed_case_email = "TesT@eXamPle.CoM"
      user.email = mixed_case_email
      user.save
      expect(user.email).to eq mixed_case_email.downcase
    end
  end

  describe "password validation" do
    let(:blank_password_user) { build(:user, password: "" * 6, password_confirmation: "" * 6) }
    let(:short_password_user) { build(:user, password: "a" * 5, password_confirmation: "a" * 5) }

    it "is invalid with a blank password" do
      expect(blank_password_user).not_to be_valid
      blank_password_user.valid?
      expect(blank_password_user.errors.messages[:password]).to include("can't be blank")
    end

    it "is invalid with a too short password" do
      expect(short_password_user).not_to be_valid
      short_password_user.valid?
      expect(short_password_user.errors.messages[:password]).
        to include("is too short (minimum is 6 characters)")
    end
  end
end