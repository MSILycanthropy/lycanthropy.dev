import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["header", "more"]

  // The element is the body
  // the more target is the main content
  go() {
    this.element.classList.remove("overflow-hidden")

    this.moreTarget.scrollIntoView({ behavior: "smooth" })
  }
}
