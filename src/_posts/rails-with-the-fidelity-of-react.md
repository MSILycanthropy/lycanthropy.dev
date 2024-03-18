---
title: "Modern Rails: Stealing from the SPA"
date: 2024-03-17 15:06:08 -0500
categories: [rails,ui,hotwire]
layout: post
---

Rails allows for the swift development of complex apps. But it's often
relegated to something used purely on the backend. People seem to think you can't use Rails to build
high fidelity frontends rendered purely on the server.

And honestly, until a few years ago, that was pretty much true. The tools just weren't there.
Recently though, the Rails community has started to borrow some of the techniques pioneered
by single-page application frameworks.

The result is that it's easier than ever to build beautiful frontends with Rails.
Let's take a look at how we can use [Turbo Morphing](https://turbo.hotwired.dev/handbook/page_refreshes){:target="_blank"}
and [View Component](https://viewcomponent.org/){:target="_blank"}
to build maintable high fidelity server-driven UIs.

### Make your MPA feel like an SPA
The glory of the SPA is that when a page is updated, only the changes are rendered. This means
that you keep all the other state like CSS transitions, scroll position, text selections, etc. This
makes your SPA feel _great_ to use out of the box.

Losses of state are incredible frustrating to the user. Interupted CSS transitions
make your app look bad. Unmaintained scroll position makes your app unintuitive. When your app
loses state, it feels shitty to use.
SPAs are _built_ to make those state losses never happen.

In constrast, a multi-page app reloads the whole page after doing _anything_. This means the entire state
gets tossed in the garbage and a completely new state is loaded in.

Initially this seems like the problem [Turbo](https://turbo.hotwired.dev/){:target="_blank"} was built to solve. But,
when Turbo visits the same page it's already on, it still reloads the entire `body` of the page. Which suffers from the
same issues as fully reloading the page. Whereas in a SPA framework, like SvelteKit, only the changes are rendered.

Turbo has concepts that solve this problem, like Frames and Streams, but those require the developer to
actively use them. And they require you to slightly modify how your backend works.
They're great tools that can add a ton of fidelity to your app.
But in most SPA frameworks, that fidelity just comes out of the box. You do nothing and it's there.

With Turbo's latest release, we get that same out of the box fidelity with the new [morphing](https://turbo.hotwired.dev/handbook/page_refreshes){:target="_blank"} feature.
It uses [idiomorph](https://github.com/bigskysoftware/idiomorph){:target="_blank"} under the hood to only render the updates to the DOM tree.

Here's a practical example from [Basecamp](https://basecamp.com/) showing the difference,

<video poster controls type="video/mp4" width="1280" height="780" src="https://d2biiyjlsh52uh.cloudfront.net/dev/assets/videos/a-happier-happy-path-in-turbo-with-morphing/refresh-comparison.mp4"></video>

This means your Rails app functions almost identically to an SPA. State is kept when you update the page,
and you get that snappy navigation when going to another page. And you get it all with the same core design philosophies
Rails has always had. You don't have to change how you design your backend at all.

#### View Transitions
The final piece of the fidelity puzzle is transition animations. Animations bring your app to the next level of interactivity.
Transition animations are what make native mobile apps feel so damn good to use.

SPA frameworks have amazing libraries like React's [Framer Motion](https://www.framer.com/motion/){:target="_blank"}, which makes it
almost trivial to add beautiful animations to your apps.

Until recently, there just wasn't an equivilant in the Rails world. You could hook into Turbo's rendering lifecycle
and add some animations that way. But, that was pretty hacky and didn't work very well. It was frankly, not a real solution.

But now there's the [View Transitions API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API){:target="_blank"}. This is a
new web standard that can be used by _anything_ on the web.

It let's you create wonderful transition animations with just a little bit of good ol' CSS.

Currently it's only supported in Chromium browsers. Other browsers will probably jump on the trains soon,
but let's be honest, Chromium is what most people are using anyways. And your app will still work without it.

To enable it in a Rails app simply put `<meta name="view-transition" content="same-origin" />` in your head tag. And Turbo will take care of the rest.
```html
<head>
  ...
  <meta name="view-transition" content="same-origin" />
</head>
```

By default, a nice crossfade animation is used. But the animations are _fully_ customizable with CSS.

If you'd like to see View Transitions in action, just click around on this site or check out the [original demo site](https://http203-playlist.netlify.app/){:target="_blank"} in Chrome 111+.

### Components
Okay so yeah, we can make our Rails apps _work_ and _feel_ like SPAs. But how can we _build_ them like SPAs.
React's brilliant [component model](https://react.dev/learn/thinking-in-react){:target="_blank"}
completly revolutionized the way frontends are built.

In a modern application, it makes way more sense
to describe the pieces of your UI _semantically_ rather than the with the elements that make them up.
```html
<button onclick="doSubscribe()"> Subscribe </button>
```
becomes
```jsx
<SubscribeButton />
```
Whenever you use the `SubscribeButton` component you don't have to think about the styles, functionality or markup at all.

All you care about as a developer is the semantics of using the
component. You know you're getting a `SubscribeButton` component regardless of how the design or functionality
changes down the road. That makes working with components _amazing_.

Thanks to the awesome [View Component](https://viewcomponent.org/){:target="_blank"} library, you can use this
right now in your Rails apps. It's what they use [at GitHub](https://viewcomponent.org/viewcomponents-at-github.html){:target="_blank"}.

This allows us to encapsulate the pieces of our UIs into single responsibility classes
that we can easily reuse and test. Just like a React component.

#### Your first View Component
So.. what's a view component look like? Well, it's just a class. Let's consider the `SubscribeButton` example from before,
with View Component, that would look something like this
```rb
class SubscribeButton < ViewComponent::Base
  erb_template <<~ERB
    <%= render_erb("form_with(url: subscribe_path(@youtuber)) do |f|") %>
      <%= render_erb("f.submit(\"Subscribe\")") %>
    <%= render_erb_end %>
  ERB

  def initialize(youtuber:)
    @youtuber = youtuber
  end
end
```

This wraps wraps all of our functionality, and markup in one easy to access place. We can then use it in
any partial or helper like so,

```erb
<%= render_erb("render SubscribeButton.new(youtuber: youtuber)") %>
```

If we want to add some styling to our `SubscribeButton`, we can put a `.css` file next to the `.rb` file.
That way our styles and markup are in one place. Better yet, we can use [TailwindCSS](https://tailwindcss.com/){:target="_blank"}
to put our styles _in_ our markup.

The case for JavaScript is similar, we could create a [Stimulus](https://stimulus.hotwired.dev/){:target="_blank"}
controller and place it next to our component's `.rb` file. Tightly coupling all it's functionality in one place.

View Component let's us get all the benefits of Reacts component model. We can build our UI as a set of reusable components
and flow data through them.

### UI Frameworks
The final thing you'll find when bulding an SPA are these beautiful, fully accessible, and easy to use
UI frameworks. There's a laundry list of them, and they just keep getting better and better.

A few popular ones are
[Mantine](https://mantine.dev/){:target="_blank"}, [Chakra](https://chakra-ui.com/){:target="_blank"} and
[shadcn/ui](https://ui.shadcn.com/){:target="_blank"}.
Go take a look at them, they are truly spectacular. You'll really learn a thing or two just clicking around their docs.

These frameworks make building awesome UIs, trivial. Someone smart has already ironed out all the kinks
in the components, and made them work well. So you don't have to spend time doing it.

Many of them even let you slap your own styles on top of them without overriding any CSS. Making it
easy to get craft fully functional, branded, unique UIs.

Right now, Rails just doesn't have that. There just aren't any good, mature UI frameworks for Rails.

Which to me is a big travesty. We've got all the tools to do it, it seems just no one has yet.
I've currently got something in the works in regards to that.. but more to come later.

### Conclusion
This post might come off as very anti-SPA/anti-JavaScript Framework. It's not. If anything,
I am really glad they exist. They continue pushing the web forward.

JavaScript frameworks pretty much revolutionized the web. And they've still got tons of
benefits for many applications.

But Rails is, for me, the most productive way of building apps. And part of that is
thanks to JavaScript frameworks for pushing the fidelity bar incredibly high.

Without that push, it probably wouldn't be so simple to build Rails apps
that have such great UIs/UXs. As long as the web keeps improving, Rails will be
here integrating the best parts of all the new stuff.

And that's why I'll stick with Rails. The community keeps making it easier
and easier to build better apps, faster.

Until the next one,

\- Ethan
