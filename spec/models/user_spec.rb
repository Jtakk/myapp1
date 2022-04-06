require 'rails_helper'

RSpec.describe User, type: :model do
  let(:user) { build(:user) }
  let(:name_less_user) { build(:user, name: "") }
  let(:email_less_user) { build(:user, email: "") }
  let(:long_name_user) { build(:user, name: "a" * 31) }
  let(:long_email_user) { build(:user, email: "a" * 244 + "@example.com") }
  let(:blank_password_user) { build(:user, password: "" * 6, password_confirmation: "" * 6) }
  let(:short_password_user) { build(:user, password: "a" * 5, password_confirmation: "a" * 5) }
  let(:valid_addresses_user_list) { build_list(:user, 5) }
  let(:invalid_addresses_user_list) { build_list(:user, 6) }

  it "has a valid value" do
    expect(user).to be_valid
  end

  describe "name validation" do
    it "is invalid without a name" do
      expect(name_less_user).not_to be_valid
      name_less_user.valid?
      expect(name_less_user.errors.messages[:name]).to include("can't be blank")
    end

    it "is invalid with a too long name" do
      expect(long_name_user).not_to be_valid
      long_name_user.valid?
      expect(long_name_user.errors.messages[:name]).
        to include("is too long (maximum is 30 characters)")
    end
  end

  describe "email validation" do
    let(:valid_addresses) do
      %w(foo@bar.com FOO@bar.COM F_O-O@bar.baz.org foo.bar@baz.jp foo+bar@baz.cn)
    end
    let(:invalid_addresses) do
      %w(foo@bar,com foo_bar.org foo.bar@baz foo@bar_baz.com foo@bar+baz.com foo@bar..com)
    end

    before do
      valid_addresses_user_list.map.with_index { |user, i| user.email = valid_addresses[i] }
      invalid_addresses_user_list.map.with_index { |user, i| user.email = invalid_addresses[i] }
    end

    it "is invalid without a email" do
      expect(email_less_user).not_to be_valid
      email_less_user.valid?
      expect(email_less_user.errors.messages[:email]).to include("can't be blank")
    end

    it "is invalid with a too long email" do
      expect(long_email_user).not_to be_valid
      long_email_user.valid?
      expect(long_email_user.errors.messages[:email]).
        to include("is too long (maximum is 255 characters)")
    end

    it "is valid with a email formatted correctly" do
      valid_addresses_user_list.each do |user|
        expect(user).to be_valid
      end
    end

    it "is invalid with a email formatted incorrectly" do
      invalid_addresses_user_list.each do |user|
        expect(user).not_to be_valid
      end
    end

    it "is invalid with a duplicated email" do
      duplicated_user = user.dup
      duplicated_user.email.upcase!
      user.save
      expect(duplicated_user).not_to be_valid
    end

    it "converts email to lower-case before save" do
      mixed_case_email = "TesT@eXamPle.CoM"
      user.email = mixed_case_email
      user.save
      expect(user.email).to eq mixed_case_email.downcase
    end
  end

  describe "password validation" do
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
