import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  connect() {
    this.#localizeDate()
  }

  #localizeDate() {
    const date = new Date(this.element.textContent)
    this.element.textContent = new Intl.DateTimeFormat('en-US', {
      dateStyle: 'long',
    }).format(date)
  }
}
