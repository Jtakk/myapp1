Capybara.register_driver :selenium_chrome_headless do |app|
  url = 'http://chrome:4444/wd/hub'
  capabilities = Selenium::WebDriver::Remote::Capabilities.chrome(
    'goog:chromeOptions' => {
      'args' => ['headless', 'disable-gpu', 'no-sandbox', 'disable-dev-shm-usage'],
    }
  )
  client = Selenium::WebDriver::Remote::Http::Default.new
  client.read_timeout = 180
  Capybara::Selenium::Driver.new(
    app,
    browser: :remote,
    url: url,
    capabilities: capabilities,
    http_client: client
  )
end
