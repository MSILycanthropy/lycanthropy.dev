class Link < Bridgetown::Component
  def initialize(href:, class: nil, relative: true, **props)
    @href = href
    @relative = relative
    @class = binding.local_variable_get(:class)
    @props = props
  end

  def mapped_props
    return if @props.empty?

    @props.map { |k, v| "#{k.to_s.dasherize}=\"#{v}\"" }.join(" ")
  end
end
