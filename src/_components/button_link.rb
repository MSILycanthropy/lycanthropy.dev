class ButtonLink < Bridgetown::Component
  def initialize(href:, text:, **props)
    @href = href
    @text = text
    @props = props
  end

  def mapped_props
    @props.map { |k, v| "#{k.to_s.dasherize}=\"#{v}\"" }.join(" ")
  end
end
