---
id: rendering-elements
title: রেনডারিং এলিমেন্টস
permalink: docs/rendering-elements.html
redirect_from:
  - "docs/displaying-data.html"
prev: introducing-jsx.html
next: components-and-props.html
---

<!-- Elements are the smallest building blocks of React apps. -->
এলিমেন্ট হল React এপ্লিকেশনের সবথেকে ছোট বিল্ডিং ব্লক।

<!-- An element describes what you want to see on the screen: -->
একটি এলিমেন্ট আপনি স্ক্রিনে কী দেখতে চান তা বর্ণ্না করেঃ

```js
const element = <h1>হ্যালো, ওয়ার্ল্ড</h1>;
```

React এলিমেন্ট গুলো সাধারণ অবজেক্ট, এবং তৈরি করেতে সহজ, যা ব্রাউজারের DOM এলিমেন্ট এর মত নাহ। React এলিমেন্ট এর সাথে সমকক্ষতা রেখে DOM আপডেট করে React DOM।

>**নোটঃ**
>
>কেউ হয়ত বহুল পরিচিত "কম্পনেন্ট" এর সাথে এলিমেন্ট গুলিয়ে ফেলতে পারে। 
আমরা কম্পনেন্ট পরিচয় করিয়ে দেব [পরবর্তী বিভাগ](/docs/components-and-props.html) এ. কম্পনেন্ট "তৈরি" হয় এলিমেন্ট দিয়ে, এবং আমরা আপনাকে এগিয়ে যাওয়ার আগে এই বিভাগটি পড়তে উত্সাহিত করি.

<!-- ## Rendering an Element into the DOM {#rendering-an-element-into-the-dom} -->
## DOM এ একটি এলিমেন্ট রেনডার করা {#rendering-an-element-into-the-dom}

<!-- Let's say there is a `<div>` somewhere in your HTML file: -->
ধরা যাক আপনার HTML ফাইলে কোথাও একটি `<div>` আছে।

```html
<div id="root"></div>
```

<!-- We call this a "root" DOM node because everything inside it will be managed by React DOM. -->
আমরা এটি কে "root" DOM নোড বলে থাকি কারণ এটির ভেতরের সবকিছু React DOM দ্বারা নিয়ন্ত্রিত হবে।

<!-- Applications built with just React usually have a single root DOM node. If you are integrating React into an existing app, you may have as many isolated root DOM nodes as you like. -->
শুধু React দ্বারা নির্মিত এপ্লিকেশন গুলোতে সাধারণত একটিমাত্র রুট DOM নোড থাকে। আপনি যদি কোন বিদ্যমান এপ্লিকেশনে React একীভূত করেন, তাহলে আপনি যত গুলা খুশী ভিন্ন রুট DOM নোড রাখতে পারেন।

<!-- To render a React element into a root DOM node, pass both to  -->
একটি React এলিমেন্ট রুট DOM নোড এ রেনডার করতে, উভয়কে [`ReactDOM.render()`](/docs/react-dom.html#render) এ পাস করতে
হবে:

`embed:rendering-elements/render-an-element.js`

[](codepen://rendering-elements/render-an-element)

<!-- It displays "Hello, world" on the page. -->
এটি পেজ এ "Hello, world" প্রদর্শন করে।

<!-- ## Updating the Rendered Element {#updating-the-rendered-element} -->
## রেনডারকৃত এলিমেন্ট আপডেট করা {#updating-the-rendered-element}

React এলিমেন্ট গুলা [immutable](https://en.wikipedia.org/wiki/Immutable_object). একবার এলিমেন্ট বানান হয়ে গেলে, আপনি এর সন্তান অথবা বৈশিষ্ট্যাবলী পরিবর্ত্ন করতে পারবেন না. একটি এলিমেন্ট হল সিনেমার একটি একক ফ্রেম এর মত: এটি UI এর একটি নির্দিষ্ট সময়কে উপস্থাপিত করে।

এখন পর্যন্ত আমাদের অর্জিত জ্ঞান দিয়ে, UI আপডেট করার একমাত্র উপায় হল নতুন এলিমেন্ট তৈরি করা, এবং সেটিকে [`ReactDOM.render()`](/docs/react-dom.html#render) এ পাস করা।

এই ঘড়ির উদহারণটি বিবেচনা করুনঃ

`embed:rendering-elements/update-rendered-element.js`

[](codepen://rendering-elements/update-rendered-element)

এটি  প্রতি সেকেন্ডে [`setInterval()`](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setInterval) কলব্যাক থেকে [`ReactDOM.render()`](/docs/react-dom.html#render) কল করে।

>**নোটঃ**
>
>চর্চার খাতিরে, অধিকাংশ React এপ্লিকেশন শুধু একবার [`ReactDOM.render()`](/docs/react-dom.html#render) কল করে। পরবর্তী বিভাগে আমরা শিখব এই জাতীয় কোড কীভাবে  [স্টেটফুল কম্পনেন্ট](/docs/state-and-lifecycle.html) এ সংক্ষিপ্ত করা হয়।
>
>আমরা আপনাকে পরামর্শ দিই যে আপনি বিষয়গুলি এড়িয়ে যাবেন না কারণ তারা একে অপরকে তৈরি করে।

## React শুধু প্রয়োজনীয় জিনিসগুলো আপডেট করে {#react-only-updates-whats-necessary}

React DOM এলিমেন্ট এবং তার শিশুদের আগেরটির সাথে তুলনা করে, এবং শুধু প্রয়োজনীয় DOM আপডেট গুলো প্রয়োগ করে DOM কে কাঙ্ক্ষিত অবস্থায় আনতে.

আপনি ব্রাউজার সরঞ্জামগুলির সাথে [সর্বশেষ উদাহরণটি](codepen://rendering-elements/update-rendered-element)  পরীক্ষা করে যাচাই করতে পারেনঃ

![DOM inspector showing granular updates](../images/docs/granular-dom-updates.gif)

যদিও আমরা প্রতিটি টিকের উপরে পুরো UI ট্রি বর্ণনা করে এমন একটি উপাদান তৈরি করি, কেবলমাত্র টেক্সট নোড যার বিষয়বস্তু পরিবর্তিত হয়েছে তা আপডেট হয় React DOM দ্বারা।

আমাদের অভিজ্ঞতায়, সময়ের সাথে সাথে কীভাবে এটি পরিবর্তন করা যায় চিন্তা করার থেকে, বরং কোনও নির্দিষ্ট মুহুর্তে UI দেখতে কেমন হবে চিন্তা করে, অনেক বাগ পরিহার করা যায়।
