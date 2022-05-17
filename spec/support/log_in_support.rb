module LogInSupport
  def log_in_as(user, email: user.email, password: user.password, remember_me: 'on')
    visit login_path
    fill_in "メールアドレス", with: email
    fill_in "パスワード (半角英数6文字以上)", with: password
    if remember_me == 'on'
      checkbox = find_by_id("remember-me-checkbox", visible: false)
      checkbox.check
    end
    click_button "ログインする"
  end
end

RSpec.configure do |config|
  config.include LogInSupport
end
