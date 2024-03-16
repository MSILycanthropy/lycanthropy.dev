import { Controller } from "@hotwired/stimulus";
import { separate, combine, splitPathString } from "flubber";
import { select, easeCubicInOut } from "d3";

export default class extends Controller {
  static targets = ["original", "morph", "output"]
  static values = { morphed: { type: Boolean, default: false } }

  initialize() {
    this.start = this.originalTarget.querySelector("path").getAttribute("d");
    this.ends = splitPathString(this.morphTarget.querySelector("path").getAttribute("d"))

    this.startFill = this.originalTarget.querySelector("path").getAttribute("fill");
    this.endFill = this.morphTarget.querySelector("path").getAttribute("fill");
  }

  toggle() {
    if (this.morphedValue) {
      this.unmorph()
    } else {
      this.morph()
    }
  }

  morph() {
    this.morphedValue = true

    const sel = select(this.outputTarget.querySelector("path"))

    this.#forward(sel, this.start, this.ends, this.endFill)
  }

  unmorph() {
    this.morphedValue = false

    const sel = select(this.outputTarget.querySelector("path"))

    this.#backward(sel, this.start, this.ends, this.startFill)
  }

  #forward(sel, start, ends, fill) {
    const interpolator = separate(start, ends, { single: true })

    sel
      .transition()
      .duration(750)
      .ease(easeCubicInOut)
      .attrTween('d', function () {
        return interpolator;
      })
      .style('fill', fill)
  }

  #backward(sel, start, ends, fill) {
    const interpolator = combine(ends, start, { single: true })

    sel
      .transition()
      .ease(easeCubicInOut)
      .duration(750)
      .attrTween('d', function () {
        return interpolator;
      })
      .style('fill', fill)
  }
}
