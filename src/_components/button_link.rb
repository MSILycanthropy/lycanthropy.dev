class ButtonLink < Bridgetown::Component
  def initialize(href:, text:, selected: false, **props)
    @href = href
    @text = text
    @props = props
    @bg_class = selected ? "bg-white" : "bg-accent"
  end
end
