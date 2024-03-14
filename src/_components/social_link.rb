class SocialLink < Bridgetown::Component
  def initialize(href:, title:)
    @href = href
    @title = title
  end
end
