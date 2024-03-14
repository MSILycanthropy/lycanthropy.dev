class ButtonLink < Bridgetown::Component
  def initialize(href:, text:, **props)
    @href = href
    @text = text
    @props = props
  end
end
