import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  connect() {
    console.log("Hello, Stimulus!", this.element)
    this.#localizeDate()
  }

  #localizeDate() {
    const date = new Date(this.element.textContent)
    this.element.textContent = new Intl.DateTimeFormat('en-US', {
      dateStyle: 'long',
    }).format(date)
  }
}
