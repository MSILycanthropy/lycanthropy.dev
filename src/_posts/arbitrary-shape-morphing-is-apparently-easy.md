---
title: "Arbitrary Shape Morphing is Apparently Easy?"
date: 2024-03-16 15:53:59 -0500
published: true
categories: [ui,technical]
layout: post
---

While designing this site, I had a vision. I wanted the logos in the header to morph into different shapes when hovered.
So I started trying to figure it out, with a few requirements.

- It must work with two _arbitrary_ shapes
- It has to use SVGs, so I can use Font Awesome
- It shouldn't require me to edit the SVGs at all
- It shouldn't require any external software usage

### The Quest

I kept finding cool solutions for SVG animation, like [Lottie](https://airbnb.design/lottie/){:target="_blank"}
or [this random thing on Medium](https://codeburst.io/svg-morphing-the-easy-way-and-the-hard-way-c117a620b65f){:target="_blank"}
. All of them _could_ do what I wanted. But none of them did it in a way I found particularly
appetizing.

There were also some examples using [D3](https://d3js.org/){:target="_blank"}
. But to put it bluntly, the D3 examples all looked like garbage.

Then I finally found my saving grace, [Noah Veltman](https://noahveltman.com/){:target="_blank"} and his amazing [flubber](https://github.com/veltman/flubber){:target="_blank"} library.
Simply put, Noah is a data visualization wizard. I hightly urge you to go click around [his website](https://noahveltman.com/){:target="_blank"} a bit and see all his awesome projects. My favorites are [San Francisco Streets](http://sfstreets.noahveltman.com/){:target="_blank"}, [How to Calculate Pi](https://noahveltman.com/pi/){:target="_blank"}, and
[NYPD Complaints](https://project.wnyc.org/ccrb/){:target="_blank"}.

Poking around flubber's README revealed that it hits all my target requirements.

- Arbitrary shapes.. check.
- Renders to SVG.. check.
- Doesn't require editing.. check.
- No external software.. check.

Plus it looks amazing while doing it:

![Flubber in action](https://user-images.githubusercontent.com/2120446/27014160-e0ce7c04-4ea7-11e7-8da4-5dde839290eb.gif)

If you want to know how flubber works on a deeper level than I'll explain here, check out [Noah's talk at Open Vis Conf 2017](https://youtu.be/PLc1y-gim_0?si=FeYNHoUuRmCvzbVH){:target="_blank"}.

### Mighty Morphin' SVG Rangers
All my examples will use [D3](https://d3js.org/){:target="_blank"} to simplify the code. But flubber does work with just
plain old vanilla JS.

Check out how easy it is to use:

```javascript
import { interpolate } from "flubber";
import * as d3 from "d3";

const svgPath1 = getSvgPath1();
const svgPath2 = getSvgPath2();

const interpolator = interpolate(svgPath1, svgPath2);

d3.select("path")
  .transition()
  .attrTween("d", function() { return interpolator });
```

Dead simple. Now let's test it out:

<%= render 'examples/svg_morphing/heart_to_circle' %>

And a more advanced case:

<%= render 'examples/svg_morphing/bad_github' %>

Well that works, technically. But it merges the first Octocat into the eye of the second Octocat. Not quite what I expected. What's going on here?

### The Correspondence Problem

After watching [Noah's talk](https://youtu.be/PLc1y-gim_0?si=FeYNHoUuRmCvzbVH){:target="_blank"}, I realized the issue.
The first Octocat has 1 distinct shape, but the second has _three_, but there is only one SVG path.

So, flubber takes the one path from Octocat 1, and tries to morph it into one of the shapes it finds from Octocat 2.
But, there are really 3 shapes from Octocat 2.

The issue is that there is not a one to one correspondence between shapes in Octocat 1, and shapes in Octocat 2.

This is more widely known as [The Correspondance Problem](https://en.wikipedia.org/wiki/Correspondence_problem){:target="_blank"}

Oh no, it's got a name. That probably means it's a hard problem that people haven't solved yet right?

_Luckily_, Noah already solved this problem for our use case. Flubber comes with some awesome utilities. The ones we care about are `splitPathString`, `combine` and `separate`.

Here's what they do:
- `separate` -> Works like `interpolate` but for splitting one shape into many.
- `combine` -> Works like `interpolate` but for combining many shapes into one.
- `splitPathString` -> Takes an SVG path and does it's best to split it into many SVG paths.

Using those three utilities we can take any single-shape SVG and morph it into any multi-shape SVG.

A working example of that might look like:

```javascript
import { combine, separate, splitPathString } from "flubber";
import * as d3 from "d3";

const singleShapePath = getSvgPath1();
const multiShapePaths = splitPathString(getSvgPath2());

// single: true makes these output 1 SVG path, making it easier to use
const forward = separate(singleShapePath, multiShapePaths, { single: true });
const backward = combine(multiShapePaths, singleShapePath, { single: true });

morph(forward);
morph(backward);

function morph(interpolator) {
  d3.select("path")
    .transition()
    .attrTween('d', function() { return interpolator });
}
```

It's key to note this still works if there is only one path in the 2nd SVG. Now, let's see it in action!

<%= render 'examples/svg_morphing/x_to_bars' %>

It looks amazing! So crisp and fluid. You can see flubber dividing the original X into 3 shapes before morphing
into the bars.

Let's try that GitHub logo example again:

<%= render 'examples/svg_morphing/okay_github' %>

Looks a lot better. But it still doesn't look _quite_ right.

### Holes Holes Holes

You'll notice again the 2nd Octocat has a quirk. It's eyes kinda phase into existence at the end.
This is because it's face is one big hole! Flubber can't handle morphing into a shape that has any
bounded regions. If there are bounded regions, it just covers them, and then phases them in at the end.

Depending on what SVGs you choose, this can either look really stupid, or be unnoticable. For my use cases
this is _good enough_. It's easy enough to use that you can just try a couple different SVG combinations
until you get something that looks right.

Let's put it all together for one final demo,

<%= render 'examples/svg_morphing/good_github' %>

Perfect. A beautiful, smooth morph between two pretty complex SVGs.

### Conclusion

With a few considerations, it's _suprisingly_ simple to morph between any two SVGs.

While it's not something that you'll want to use for every single interaction, it's an amazing tool
to have in your belt.

Big shoutouts again to [Noah Veltman](https://noahveltman.com/){:target="_blank"}. Without his work, none of this would be possible.
I again urge you to go check out his stuff and show him some love.

Until the next one,

\- Ethan
