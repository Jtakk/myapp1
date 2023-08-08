require "rails_helper"

RSpec.describe UserMailer, type: :mailer do
  describe "#password_reset(user)" do
    let(:user) { create(:user) }
    let(:mail) { UserMailer.password_reset(user) }

    before { user.reset_token = User.new_token }

    it "renders the headers" do
      expect(mail.subject).to eq "パスワード再設定のご案内"
      expect(mail.to).to eq [user.email]
      expect(mail.from).to eq ["no-reply@trekkers-view.com"]
    end

    it "renders the body" do
      expect(mail.text_part.body.encoded).to match user.reset_token
      expect(mail.html_part.body.encoded).to match user.reset_token
      expect(mail.text_part.body.encoded).to match CGI.escape(user.email)
      expect(mail.html_part.body.encoded).to match CGI.escape(user.email)
    end
  end
end
