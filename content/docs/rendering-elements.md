---
id: rendering-elements
title: রেন্ডারিং Elements
permalink: docs/rendering-elements.html
redirect_from:
  - "docs/displaying-data.html"
prev: introducing-jsx.html
next: components-and-props.html
---

Element হল React এপ্লিকেশনের সবথেকে ছোট বিল্ডিং ব্লক।

একটি element হল আপনি স্ক্রিনে কী দেখতে চান তা বর্ণ্না করেঃ

```js
const element = <h1>হ্যালো, ওয়ার্ল্ড</h1>;
```

React element গুলো সাধারণ অবজেক্ট, এবং তৈরি করেতে সহজ, যা ব্রাউজারের DOM element এর মত নাহ। React element এর সাথে সমকক্ষতা রেখে DOM আপডেট করে React DOM।

>**বিঃদ্রঃ**
>
>কেউ হয়ত বহুল পরিচিত "কম্পোনেন্ট" এর সাথে element গুলিয়ে ফেলতে পারে। [পরবর্তী বিভাগ](/docs/components-and-props.html) এ আমরা কম্পোনেন্ট পরিচয় করিয়ে দেব । কম্পোনেন্ট "তৈরি" হয় element দিয়ে, এবং এগিয়ে যাওয়ার আগে আমরা আপনাকে এই বিভাগটি পড়তে উত্সাহিত করি.

## DOM এ একটি element রেন্ডার করা {#rendering-an-element-into-the-dom}

ধরা যাক আপনার HTML ফাইলে কোথাও একটি `<div>` আছে।

```html
<div id="root"></div>
```

আমরা এটি কে "root" DOM নোড বলে থাকি কারণ এটির ভেতরের সবকিছু React DOM দ্বারা নিয়ন্ত্রিত হবে।

<!-- Applications built with just React usually have a single root DOM node. If you are integrating React into an existing app, you may have as many isolated root DOM nodes as you like. -->
শুধু React দ্বারা নির্মিত এপ্লিকেশন গুলোতে সাধারণত একটিমাত্র রুট DOM নোড থাকে। আপনি যদি কোন বিদ্যমান এপ্লিকেশনে React একীভূত করেন, তাহলে আপনি যত গুলা খুশী ভিন্ন রুট DOM নোড রাখতে পারেন।

<!-- To render a React element into a root DOM node, pass both to  -->
একটি React element রুট DOM নোড এ রেন্ডার করতে, উভয়কে [`ReactDOM.render()`](/docs/react-dom.html#render) এ pass করতে
হবে:

`embed:rendering-elements/render-an-element.js`

[](codepen://rendering-elements/render-an-element)

<!-- It displays "Hello, world" on the page. -->
এটি পেজ এ "Hello, world" প্রদর্শন করে।

<!-- ## Updating the Rendered Element {#updating-the-rendered-element} -->
## রেন্ডারকৃত element আপডেট করা {#updating-the-rendered-element}

React element গুলা [immutable](https://en.wikipedia.org/wiki/Immutable_object)। একবার element বানান হয়ে গেলে, আপনি এর children অথবা attributes পরিবর্ত্ন করতে পারবেন না. একটি element হল সিনেমার একটি একক ফ্রেম এর মতঃ এটি UI এর একটি নির্দিষ্ট সময়কে উপস্থাপিত করে।

এখন পর্যন্ত আমাদের অর্জিত জ্ঞান দিয়ে, UI আপডেট করার একমাত্র উপায় হল নতুন element তৈরি করা, এবং সেটিকে [`ReactDOM.render()`](/docs/react-dom.html#render) এ pass করা।

এই টিক ঘড়ির উদহারণটি বিবেচনা করুনঃ

`embed:rendering-elements/update-rendered-element.js`

[](codepen://rendering-elements/update-rendered-element)

এটি  প্রতি সেকেন্ডে [`setInterval()`](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setInterval) কলব্যাক থেকে [`ReactDOM.render()`](/docs/react-dom.html#render) কল করে।

>**বিঃদ্রঃ**
>
>চর্চার খাতিরে, অধিকাংশ React এপ্লিকেশন শুধু একবার [`ReactDOM.render()`](/docs/react-dom.html#render) কল করে। পরবর্তী বিভাগে আমরা শিখব এই জাতীয় কোড কীভাবে  [স্টেটফুল কম্পোনেন্ট](/docs/state-and-lifecycle.html) এ encapsulated হয়।
>
>আমরা আপনাকে পরামর্শ দিই যে আপনি বিষয়গুলি এড়িয়ে যাবেন না কারণ তারা একে অপরকে তৈরি করে।

## React শুধু প্রয়োজনীয় জিনিসগুলো আপডেট করে {#react-only-updates-whats-necessary}

React DOM element এবং তার children দের আগেরটির সাথে তুলনা করে, এবং DOM কে কাঙ্ক্ষিত অবস্থায় আনতে শুধু প্রয়োজনীয় DOM আপডেট গুলো প্রয়োগ করে.

আপনি ব্রাউজার সরঞ্জামগুলির সাথে [সর্বশেষ উদাহরণটি](codepen://rendering-elements/update-rendered-element)  পরীক্ষা করে যাচাই করতে পারেনঃ

![DOM inspector showing granular updates](../images/docs/granular-dom-updates.gif)

যদিও আমরা প্রতিটি টিকের উপরে পুরো UI ট্রি বর্ণনা করে এমন একটি উপাদান তৈরি করি, React DOM দ্বারা কেবলমাত্র যেসব টেক্সট নোডের বিষয়বস্তু পরিবর্তিত হয়েছে তা আপডেট হয় ।

আমাদের অভিজ্ঞতায়, সময়ের সাথে সাথে কীভাবে এটি পরিবর্তন করা যায় চিন্তা করার থেকে, বরং কোনও নির্দিষ্ট মুহুর্তে UI দেখতে কেমন হবে চিন্তা করে, অনেক বাগ পরিহার করা যায়।
