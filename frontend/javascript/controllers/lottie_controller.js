import { Controller } from "@hotwired/stimulus";
import lottie from "lottie-web";

export default class extends Controller {
  static targets = ["original", "morph"]
  static values = { path: String }

  initialize() {
    this.element.querySelector('svg')?.remove();

    this.animation = lottie.loadAnimation({
      container: this.element,
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "/under_construction.json"
    });
  }

  disconnect() {
    this.animation.destroy();
  }
}
