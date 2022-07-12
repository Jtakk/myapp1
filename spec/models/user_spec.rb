require 'rails_helper'

RSpec.describe User, type: :model do
  let(:new_user) { build(:user) }
  let(:user) { create(:user) }
  let(:other_user) { create(:user) }
  let(:mountain) { create(:mountain) }
  let(:my_post) { create(:post, user_id: user.id, mountain_id: mountain.id) }
  let(:other_post) { create(:post, user_id: other_user.id, mountain_id: mountain.id) }
  let(:like) { create(:like, user_id: user.id, post_id: other_post.id) }

  it "has a valid value" do
    expect(new_user).to be_valid
  end

  it "is depended on by posts" do
    my_post
    expect { user.destroy }.to change(Post, :count).by(-1)
  end

  it "is depended on by likes" do
    like
    expect { user.destroy }.to change(Like, :count).by(-1)
  end

  describe "name validation" do
    let(:blank_name_user) { build(:user, name: "") }
    let(:long_name_user) { build(:user, name: "a" * 31) }

    it "rejects attributes with a blank name" do
      expect(blank_name_user).not_to be_valid
      blank_name_user.valid?
      expect(blank_name_user.errors.messages[:name]).to include("を入力してください")
    end

    it "rejects attributes with a too long name" do
      expect(long_name_user).not_to be_valid
      long_name_user.valid?
      expect(long_name_user.errors.messages[:name]).
        to include("は30文字以内で入力してください")
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

    it "rejects attributes with a blank email" do
      expect(blank_email_user).not_to be_valid
      blank_email_user.valid?
      expect(blank_email_user.errors.messages[:email]).to include("を入力してください")
    end

    it "rejects attributes with a too long email" do
      expect(long_email_user).not_to be_valid
      long_email_user.valid?
      expect(long_email_user.errors.messages[:email]).
        to include("は255文字以内で入力してください")
    end

    it "accepts attributes with a email formatted correctly" do
      valid_email_user_list.map.with_index { |user, i| user.email = valid_emails[i] }
      valid_email_user_list.each do |user|
        expect(user).to be_valid
      end
    end

    it "rejects attributes with a email formatted incorrectly" do
      invalid_email_user_list.map.with_index { |user, i| user.email = invalid_emails[i] }
      invalid_email_user_list.each do |user|
        expect(user).not_to be_valid
        user.valid?
        expect(user.errors.messages[:email]).to include("は不正な値です")
      end
    end

    it "rejects attributes with a duplicated email" do
      duplicated_user = new_user.dup
      duplicated_user.email.upcase!
      new_user.save
      expect(duplicated_user).not_to be_valid
      duplicated_user.valid?
      expect(duplicated_user.errors.messages[:email]).to include("はすでに存在します")
    end

    it "converts a email to lower-case before save" do
      mixed_case_email = "TesT@eXamPle.CoM"
      new_user.email = mixed_case_email
      new_user.save
      expect(new_user.email).to eq mixed_case_email.downcase
    end
  end

  describe "password validation" do
    let(:blank_password_user) { build(:user, password: "" * 6, password_confirmation: "" * 6) }
    let(:short_password_user) { build(:user, password: "a" * 5, password_confirmation: "a" * 5) }

    it "rejects attributes with a blank password" do
      expect(blank_password_user).not_to be_valid
      blank_password_user.valid?
      expect(blank_password_user.errors.messages[:password]).to include("を入力してください")
    end

    it "rejects attributes with a too short password" do
      expect(short_password_user).not_to be_valid
      short_password_user.valid?
      expect(short_password_user.errors.messages[:password]).
        to include("は6文字以上で入力してください")
    end
  end

  describe "#remember" do
    it "saves a remember_digest" do
      user.remember
      expect(user.remember_digest).to be_present
    end
  end

  describe "#authenticated?(attribute, token)" do
    context "with a remember_digest" do
      before { user.remember }

      it "returns true when a remember_token is correct" do
        expect(user.authenticated?(:remember, user.remember_token)).to eq true
      end

      it "returns false when a remember_token is incorrect" do
        expect(user.authenticated?(:remember, '')).to eq false
      end
    end

    context "with a reset_digest" do
      before { user.create_reset_digest }

      it "returns true when a reset_token is correct" do
        expect(user.authenticated?(:reset, user.reset_token)).to eq true
      end

      it "returns false when a reset_token is incorrect" do
        expect(user.authenticated?(:reset, '')).to eq false
      end
    end

    context "without a remember_digest or a reset_digest" do
      it "doesn't raise an error" do
        expect(user.authenticated?(:remember, '')).to eq false
        expect(user.authenticated?(:reset, '')).to eq false
      end
    end
  end

  describe "#forget" do
    it "deletes the remember_digest" do
      user.remember
      user.forget
      expect(user.remember_digest).to eq nil
    end
  end

  describe "#create_reset_digest" do
    before { user.create_reset_digest }

    it "saves a reset_digest" do
      expect(user.reset_digest).to be_present
    end

    it "saves a reset_sent_at" do
      expect(user.reset_sent_at).to be_present
    end
  end

  describe "#password_reset_expired?" do
    subject { user.password_reset_expired? }

    before { user.create_reset_digest }

    it "returns false just after #create_reset_digest" do
      is_expected.to eq false
    end

    it "returns true more than 2 hours after #create_reset_digest" do
      travel_to 3.hours.after
      is_expected.to eq true
    end
  end

  describe "#own?(post)" do
    it "returns true when the user owns the post" do
      expect(user.own?(my_post)).to eq true
    end

    it "returns false when the user doesn't own the post" do
      expect(user.own?(other_post)).to eq false
    end
  end

  describe "#like?(post)" do
    let!(:liked_post) { create(:post, user_id: other_user.id, mountain_id: mountain.id) }
    let!(:disliked_post) { create(:post, user_id: other_user.id, mountain_id: mountain.id) }
    let!(:like) { create(:like, user_id: user.id, post_id: liked_post.id) }

    it "returns true when the user likes the post" do
      expect(user.like?(liked_post)).to eq true
    end

    it "returns false when the user doesn't like the post" do
      expect(user.like?(disliked_post)).to eq false
    end
  end

  describe "#like(post)" do
    it "succeeds in creating the relation" do
      expect { user.like(other_post) }.to change(Like, :count).by(1)
    end
  end
end
