module LogInRequestSupport
  def log_in_request_as(user, email: user.email, password: user.password, remember_me: 'on')
    post login_path,
          params: { session: { email: email, password: password, remember_me: remember_me } }
  end
end

RSpec.configure do |config|
  config.include LogInRequestSupport
end
