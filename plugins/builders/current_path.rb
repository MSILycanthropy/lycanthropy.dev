class Builders::CurrentPath < SiteBuilder
  def build
    helper :current_path?
  end

  def current_path?(path, page)
    path = path.to_s.split('/').last
    current_path = page.path.to_s.split('/').last.split('.').first

    return current_path == 'index' if path.nil?

    current_path == path
  end
end
