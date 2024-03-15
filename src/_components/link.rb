class Link < Bridgetown::Component
  def initialize(href:, class: nil, relative: true, **props)
    @href = ensure_trailing_slash(href)
    @relative = relative
    @class = binding.local_variable_get(:class)
    @props = props
  end

  def mapped_props
    return if @props.empty?

    @props.map { |k, v| "#{k.to_s.dasherize}=\"#{v}\"" }.join(" ")
  end

  def ensure_trailing_slash(href)
    return href if href == '/'

    href, query_string = href.split('?')

    href = if href.ends_with?('/')
      href
    else
      "#{href}/"
    end

    return "#{href}?#{query_string}" if query_string.present?

    href
  end
end
