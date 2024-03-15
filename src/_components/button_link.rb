class ButtonLink < Bridgetown::Component
  def initialize(href:, text: nil, selected: false, **props)
    @href = href
    @text = text
    @props = props
    @class = @props.delete(:class)
    @bg_class = selected ? "bg-white" : "bg-accent"
  end
end
