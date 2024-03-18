import "$styles/index.css"
import "$styles/syntax-highlighting.css"
import * as Turbo from "@hotwired/turbo"

import { Application } from "@hotwired/stimulus"

document.addEventListener("turbo:before-visit", (event) => {
  // Push to history on Turbo visit
  window.history.pushState({}, "")
})

/**
 * Adds support for declarative shadow DOM. Requires your HTML <head> to include:
 * `<meta name="turbo-cache-control" content="no-cache" />`
 */
import * as TurboShadow from "turbo-shadow"

// Import all JavaScript & CSS files from src/_components
import components from "$components/**/*.{js,jsx,js.rb,css}"

window.Stimulus = Application.start()

import controllers from "./controllers/**/*.{js,js.rb}"
import { local } from "d3"
Object.entries(controllers).forEach(([filename, controller]) => {
  if (filename.includes("_controller.") || filename.includes("-controller.")) {
    const identifier = filename.replace("./controllers/", "")
      .replace(/[_-]controller\..*$/, "")
      .replace(/_/g, "-")
      .replace(/\//g, "--")

    Stimulus.register(identifier, controller.default)
  }
})

localizeDates(true);

document.addEventListener("turbo:render", () => {
  localizeDates();
});

function localizeDates(finish = false) {
  [...document.querySelectorAll('[data-localize]')].forEach((element) => {
    const date = new Date(element.innerText);
    element.innerText = new Intl.DateTimeFormat(undefined, {
      dateStyle: "long",
    }).format(date);

    element.setAttribute("title", new Intl.DateTimeFormat(undefined, {
      dateStyle: "long",
      timeStyle: "long",
    }).format(date));

    if (finish) {
      element.setAttribute("data-localize", "done");
    } else {
      element.removeAttribute("data-localize");
    }
  });
}
