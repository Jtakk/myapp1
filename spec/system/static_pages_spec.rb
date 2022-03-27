require 'rails_helper'

RSpec.describe "StaticPages", type: :system, js: true do
  before do
    driven_by(:rack_test)
    visit root_path
  end

  it 'click on app-logo, then go to root' do
    click_link 'app-logo'
    expect(current_path).to eq root_path
  end
end
