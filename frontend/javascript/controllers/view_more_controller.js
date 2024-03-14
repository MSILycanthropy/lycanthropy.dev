import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["header", "more"]

  // initialize() {
  //   this.element.classList.add("overflow-hidden")
  // }

  // The element is the body
  // the more target is the main content
  go() {
    this.element.classList.remove("overflow-hidden")

    this.moreTarget.scrollIntoView({ behavior: "smooth" })
  }
}
