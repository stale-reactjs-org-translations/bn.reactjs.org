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

একটি element আপনি স্ক্রিনে কী দেখতে চান তা বর্ণনা করেঃ

```js
const element = <h1>Hello, World</h1>;
```

React element গুলো সাধারণ অবজেক্ট, এবং তৈরি করতে সহজ, যা ব্রাউজারের DOM element এর মত নয়। React element এর সাথে সমকক্ষতা রেখে DOM আপডেট করে React DOM।

>**বিঃদ্রঃ**
>
>কেউ হয়ত বহুল পরিচিত "কম্পোনেন্ট" এর সাথে element গুলিয়ে ফেলতে পারে। [পরবর্তী অনুচ্ছেদ](/docs/components-and-props.html) এ আমরা কম্পোনেন্ট পরিচয় করিয়ে দেব । কম্পোনেন্ট "তৈরি" হয় element দিয়ে, এবং এগিয়ে যাওয়ার আগে আমরা আপনাকে এই বিভাগটি পড়তে উৎসাহিত করি।

## DOM এ একটি element রেন্ডার করা {#rendering-an-element-into-the-dom}

ধরা যাক আপনার HTML ফাইলে কোথাও একটি `<div>` আছে।

```html
<div id="root"></div>
```

আমরা এটি কে "root" DOM নোড বলে থাকি কারণ এটির ভেতরের সবকিছু React DOM দ্বারা নিয়ন্ত্রিত হবে।

শুধু React দ্বারা নির্মিত এপ্লিকেশন গুলোতে সাধারণত একটিমাত্র রুট DOM নোড থাকে। আপনি যদি কোন বিদ্যমান এপ্লিকেশনে React একীভূত করেন, তাহলে আপনি যত গুলা খুশী ভিন্ন রুট DOM নোড রাখতে পারেন।

<<<<<<< HEAD
একটি React element রুট DOM নোড এ রেন্ডার করতে, উভয়কে [`ReactDOM.render()`](/docs/react-dom.html#render) এ pass করতে হবেঃ
=======
To render a React element, first pass the DOM element to [`ReactDOM.createRoot()`](/docs/react-dom-client.html#createroot), then pass the React element to `root.render()`:
>>>>>>> d483aebbac6d3c8f059b52abf21240bc91d0b96e

`embed:rendering-elements/render-an-element.js`

**[Try it on CodePen](https://codepen.io/gaearon/pen/ZpvBNJ?editors=1010)**

এটি পেজ এ "Hello, world" প্রদর্শন করে।

## রেন্ডারকৃত element আপডেট করা {#updating-the-rendered-element}

React element গুলা [immutable](https://en.wikipedia.org/wiki/Immutable_object)। একবার element বানানো হয়ে গেলে, আপনি এর children অথবা attributes পরিবর্তন করতে পারবেন না। একটি element হল সিনেমার একটি একক ফ্রেমের মতঃ এটি UI এর একটি নির্দিষ্ট সময়কে উপস্থাপিত করে।

<<<<<<< HEAD
এখন পর্যন্ত আমাদের অর্জিত জ্ঞান দিয়ে, UI আপডেট করার একমাত্র উপায় হল নতুন element তৈরি করা, এবং সেটিকে [`ReactDOM.render()`](/docs/react-dom.html#render) এ pass করা।
=======
With our knowledge so far, the only way to update the UI is to create a new element, and pass it to `root.render()`.
>>>>>>> d483aebbac6d3c8f059b52abf21240bc91d0b96e

এই টিক ঘড়ির উদহারণটি বিবেচনা করুনঃ

`embed:rendering-elements/update-rendered-element.js`

**[Try it on CodePen](https://codepen.io/gaearon/pen/gwoJZk?editors=1010)**

<<<<<<< HEAD
এটি  প্রতি সেকেন্ডে [`setInterval()`](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setInterval) কলব্যাক থেকে [`ReactDOM.render()`](/docs/react-dom.html#render) কল করে।
=======
It calls [`root.render()`](/docs/react-dom.html#render) every second from a [`setInterval()`](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setInterval) callback.
>>>>>>> d483aebbac6d3c8f059b52abf21240bc91d0b96e

>**বিঃদ্রঃ**
>
<<<<<<< HEAD
>চর্চার খাতিরে, অধিকাংশ React এপ্লিকেশন শুধু একবার [`ReactDOM.render()`](/docs/react-dom.html#render) কল করে। পরবর্তী বিভাগে আমরা শিখব এই জাতীয় কোড কীভাবে  [stateful কম্পোনেন্ট](/docs/state-and-lifecycle.html) এ encapsulated হয়।
=======
>In practice, most React apps only call `root.render()` once. In the next sections we will learn how such code gets encapsulated into [stateful components](/docs/state-and-lifecycle.html).
>>>>>>> d483aebbac6d3c8f059b52abf21240bc91d0b96e
>
>আমরা আপনাকে পরামর্শ দিই যে আপনি বিষয়গুলি এড়িয়ে যাবেন না কারণ তারা একে অপরের উপর নির্ভরশীল।

## React শুধু প্রয়োজনীয় জিনিসগুলো আপডেট করে {#react-only-updates-whats-necessary}

React DOM element এবং তার children দের আগেরটির সাথে তুলনা করে, এবং DOM কে কাঙ্ক্ষিত অবস্থায় আনতে শুধু প্রয়োজনীয় DOM আপডেট গুলো প্রয়োগ করে.

<<<<<<< HEAD
আপনি ব্রাউজার সরঞ্জামগুলির সাথে [সর্বশেষ উদাহরণটি](codepen://rendering-elements/update-rendered-element)  পরীক্ষা করে যাচাই করতে পারেনঃ
=======
You can verify by inspecting the [last example](https://codepen.io/gaearon/pen/gwoJZk?editors=1010) with the browser tools:
>>>>>>> d483aebbac6d3c8f059b52abf21240bc91d0b96e

![DOM inspector showing granular updates](../images/docs/granular-dom-updates.gif)

যদিও আমরা প্রতিটি টিকের উপরে পুরো UI ট্রি বর্ণনা করে এমন একটি উপাদান তৈরি করি, React DOM দ্বারা কেবলমাত্র যেসব টেক্সট নোডের বিষয়বস্তু পরিবর্তিত হয়েছে তা আপডেট হয় ।

আমাদের অভিজ্ঞতায়, সময়ের সাথে সাথে কীভাবে এটি পরিবর্তন করা যায় চিন্তা করার থেকে, বরং কোনও নির্দিষ্ট মুহুর্তে UI দেখতে কেমন হবে চিন্তা করে, অনেক বাগ পরিহার করা যায়।
