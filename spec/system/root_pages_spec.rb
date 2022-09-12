require 'rails_helper'

RSpec.describe "RootPages", type: :system do
  before do
    visit root_path
  end

  it 'click on app-logo, then go to root', js: true do
    click_link 'Myapp1'
    expect(current_path).to eq root_path
  end
end
