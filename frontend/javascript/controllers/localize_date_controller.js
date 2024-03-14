import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  connect() {
    document.addEventListener(
      "turbo:load",
      () => {
        this.#localizeDate();
      },
      { once: true }
    );
  }

  #localizeDate() {
    console.log(this.element.innerText);
    const date = new Date(this.element.innerText);
    this.element.innerText = new Intl.DateTimeFormat(undefined, {
      dateStyle: "long",
    }).format(date);
  }
}
