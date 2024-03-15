import { Controller } from "@hotwired/stimulus";
import { interpolate } from "flubber";
import { select } from "d3";

export default class extends Controller {
  static targets = ["original", "morph"]

  initialize() {
    this.start = this.originalTarget.querySelector("path").getAttribute("d");
    this.end = this.morphTarget.querySelector("path").getAttribute("d");

    this.startFill = this.originalTarget.querySelector("path").getAttribute("fill");
    this.endFill = this.morphTarget.querySelector("path").getAttribute("fill");
  }

  morph() {
    select(this.originalTarget.querySelector("path"))
      .style('display', 'block')
      .call((sel) => {
        this.#animate(sel, this.start, this.end, this.endFill)
      })
  }

  unmorph() {
    select(this.originalTarget.querySelector("path"))
      .style('display', 'block')
      .call((sel) => {
        this.#animate(sel, this.end, this.start, this.startFill)
      })
  }

  #animate(sel, start, end, fill) {
    sel
      .datum({ start, end })
      .transition()
      .attrTween('d', function (d) {
        return interpolate(d.start, d.end)
      })
      .duration(750)
      .delay(100)
      .style('fill', fill)
  }
}
