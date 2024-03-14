class Navbar < Bridgetown::Component
  def initialize(metadata:, resource:)
    @metadata, @resource = metadata, resource
  end
end
