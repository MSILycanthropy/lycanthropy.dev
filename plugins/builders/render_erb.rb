class Builders::RenderErb < SiteBuilder
  def build
    helper :render_erb
    helper :render_erb_end
  end

  def render_erb(str)
    "<%= #{str} %>".html_safe
  end

  def render_erb_end
    "<% end %>".html_safe
  end
end
