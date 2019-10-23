---
id: add-react-to-a-website
title: একটি ওয়েবসাইটে React সংযুক্ত করুন
permalink: docs/add-react-to-a-website.html
redirect_from:
  - "docs/add-react-to-an-existing-app.html"
prev: getting-started.html
next: create-a-new-react-app.html
---

আপনার প্রয়োজনের অনুপাতে React ব্যবহার করুন।

React ডিজাইন করা হয়েছে এমন ভাবে যাতে করে আপনি গ্রাজুয়ালি অ্যাডাপট করতে পারেন এবং **আপনার প্রয়োজন মত যতটুকু দরকার ঠিক ততটুকু React ব্যবহার করতে পারেন।** আপনি যদি শুধুমাত্র আপনার বর্তমান কোন ওয়েবপেজে সামান্য কিছু নজরকাঁড়া ইন্টার‌্যাক্টিভিটি যোগ করতে চান তবে React কম্পোনেন্ট আপনার জন্য অন্যতম সমাধান।

বেশির ভাগ ওয়েবসাইটের ক্ষেত্রেই সেগুলো সিঙ্গেল পেজ অ্যাপ্লিকেশান হওয়া জরুরী নয়। শুধুমাত্র **কয়েক লাইন কোড লিখে এবং বিশাল টুল চেইন ছাড়ায়** আপনার ওয়েবসাইটের ছোট্ট কোন অংশ হিসেবেও React ব্যবহার করতে পারেন। অতঃপর আপনার প্রয়োজন মত ধীরে ধীরে এর ব্যবহার বৃদ্ধি করতে পারেন অথবা অল্প কিছু উইজেট হিসেবেই এর ব্যবহার সীমাবদ্ধ রাখতে পারেন।

---

- [এক মিনিটে React সংযুক্ত করুন](#add-react-in-one-minute)
- [অপশনালঃ JSX সহ React চেষ্টা করে দেখুন](#optional-try-react-with-jsx) (কোন বান্ডেলারের প্রয়োজন নাই)

## এক মিনিটে React সংযুক্ত করুন {#add-react-in-one-minute}

এই পরিচ্ছেদে আমরা আপনাকে দেখাবো যে কিভাবে একটি HTML ডকুমেন্টে React  কম্পোনেন্ট সংযুক্ত করা যায়। আপনি চাইলে আপনার বর্তমান ওয়েবসাইট টিতেই আমাদের কে অনুসরণ করে প্র্যাকটিস করতে পারেন অথবা একটি নতুন HTML ডকুমেন্ট তৈরি করে প্র্যাকটিস করতে পারেন।

এক্ষেত্রে কোন জটিল টুলস বা ইন্সটল করার ঝামেলা নাই -- **এই পরিচ্ছেদটি সম্পূর্ণ করতে প্রয়োজন শুধুমাত্র একটি ইন্টারনেট কানেকশন এবং আপনার মূল্যবান এক মিনিট সময়।**

অপশনালঃ [সম্পূর্ণ উদাহারনটি ডাউনলোড করুন (২কেবি জিপ ফাইল)](https://gist.github.com/gaearon/6668a1f6986742109c00a581ce704605/archive/f6c882b6ae18bde42dcf6fdb751aae93495a2275.zip)

### ধাপ-১: HTML ডকুমেন্টে একটি DOM কন্টেইনার সংযুক্ত করুন {#step-1-add-a-dom-container-to-the-html}

প্রথমত, যে HTML ডকুমেন্টটি পরিবর্তন করতে চান সেটি ওপেন করুন। একটি খালি `<div>` ট্যাগ সংযুক্ত করুন, যেখানে আপনার React এর কার্যকারিতা প্রদর্শন করতে চান। উদাহরণস্বরূপঃ -

```html{3}
<!-- ... existing HTML ... -->

<div id="like_button_container"></div>

<!-- ... existing HTML ... -->
```

আমরা এখানে `<div>` টিকে একটি ইউনিক HTML `id` অ্যাট্রিবিউট দিয়েছি। এই আইডি টি পরবর্তীতে জাভাস্ক্রিপ্ট কোডের ভেতর থেকেও `<div>` টিকে অ্যাক্সেস করতে সাহায্য করবে এবং React কম্পোনেন্ট প্রদর্শন করার কাজে ব্যবহার করা যাবে।

>পরামর্শ
>
>আপনি `<body>` ট্যাগের ভিতর যেকোনো জায়গায় একটি "কন্টেইনার" `<div>` ব্যবহার করতে পারেন। আপনার একটি পেজের মধ্যে যতগুলো ইন্ডিপেন্ডেন্ট DOM কন্টেইনার প্রয়োজন ততগুলো ব্যবহার করতে পারেন। এইগুলো প্রাথমিক ভাবে খালি থাকে, পরবর্তীতে React এই DOM কন্টেইনার গুলোর কন্টেন্ট পরিবর্তন করে থাকে।

### ধাপ-২ঃ স্ক্রিপ্ট ট্যাগস সংযুক্ত করুন {#step-2-add-the-script-tags}

এখন আপনার HTML পেজের মধ্যে তিনটি `<script>` ট্যাগ যুক্ত করুন `</body>` ট্যাগ বন্ধ করার পূর্বেঃ 

```html{5,6,9}
  <!-- ... other HTML ... -->

  <!-- Load React. -->
  <!-- Note: when deploying, replace "development.js" with "production.min.js". -->
  <script src="https://unpkg.com/react@16/umd/react.development.js" crossorigin></script>
  <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js" crossorigin></script>

  <!-- Load our React component. -->
  <script src="like_button.js"></script>

</body>
```

এখানে প্রথম দুইটি ট্যাগ React ও React DOM লোড করছে। তৃতীয়টি আমাদের তৈরি করা React কম্পোনেন্ট লোড করছে।

### ধাপ-৩ঃ একটি React কম্পোনেন্ট তৈরি করুন {#step-3-create-a-react-component}

আপনার HTML পেজের ওই একই ডিরেক্টরিতে `like_button.js` নামে একটি ফাইল তৈরি করুন।

ওপেন করুন **[এই স্টারটার কোডটি](https://cdn.rawgit.com/gaearon/0b180827c190fe4fd98b4c7f570ea4a8/raw/b9157ce933c79a4559d2aa9ff3372668cce48de7/LikeButton.js)** এবং কপি করে আপনার সদ্য তৈরি করা `like_button.js` ফাইলে পেস্ট করুন।

>টিপস
>
>এই কোডটি তে একটি `LikeButton` তৈরি করা আছে। আপনি যদি এই মুহূর্তে কোডটি বুঝতে না পারেন, তবে ভয় পাওয়ার কোন কারণ নাই। আমরা React এর কম্পোনেন্ট কিভাবে তৈরি করা হয় তা [হাতে কলমে টিউটোরিয়াল সিরিজে](/tutorial/tutorial.html) এবং [মেইন কনসেপ্ট গাইডে](/docs/hello-world.html) শিখাবো। এই মুহূর্তে চলুন দেখি আসি স্ক্রিনে কেমন দেখায়।

এখন **[এই স্টারটার কোডটি]** এর সাথে `like_button.js` ফাইলের শেষে নিচের দুই লাইন কোড যুক্ত করুনঃ

```js{3,4}
// ... the starter code you pasted ...

const domContainer = document.querySelector('#like_button_container');
ReactDOM.render(e(LikeButton), domContainer);
```

এই দুই লাইন কোড HTML পেজের কাঙ্ক্ষিত `<div>` ট্যাগটি খুঁজে বের করবে এবং সেখানে আমাদের Like বাটনের জন্য তৈরি React কম্পোনেন্ট টি দেখবে।

### কাজ শেষ! {#thats-it}

আর কোন ধাপ বাকি নাই। **আপনি আপনার প্রথম React কম্পোনেন্ট টি সফল ভাবে আপনার ওয়েবসাইটে সংযুক্ত করেছেন।**

পরবর্তী পরিচ্ছেদে ভিজিট করুন কিভাবে React ইনটিগ্রেট করতে হয় তা দেখার জন্য।

**[উদাহরণের সম্পূর্ণ সোর্স কোডটি দেখুন এখানে](https://gist.github.com/gaearon/6668a1f6986742109c00a581ce704605)**

**[উদাহরণের সম্পূর্ণ কোডটি ডাউনলোড করুন এখান থেকে (2KB জিপড)](https://gist.github.com/gaearon/6668a1f6986742109c00a581ce704605/archive/f6c882b6ae18bde42dcf6fdb751aae93495a2275.zip)**

### টিপ: একটি কম্পোনেন্টকে একাধিকবার ব্যবহার করুন {#tip-reuse-a-component}

প্রায় সময়, একই কম্পোনেন্ট একাধিক জায়গায় প্রদর্শন করার প্রয়োজন পড়ে সেক্ষেত্রে বার বার নতুন করে সব কিছু লেখার দরকার নাই। আমরা নিচের উদাহরণে দেখবো কিভাবে আমাদের পূর্বে তৈরি করা "Like" বাটনটি তিনটি আলাদা আলাদা জায়গায় আলাদা আলাদা ডাটা সহ প্রদর্শন করতে পারিঃ 

[উদাহরণের সম্পূর্ণ সোর্স কোডটি দেখুন এখানে](https://gist.github.com/gaearon/faa67b76a6c47adbab04f739cba7ceda)

[উদাহরণের সম্পূর্ণ কোডটি ডাউনলোড করুন এখান থেকে (2KB zipped)](https://gist.github.com/gaearon/faa67b76a6c47adbab04f739cba7ceda/archive/9d0dd0ee941fea05fd1357502e5aa348abb84c12.zip)

>নোট
>
>এই পদ্ধতিটি খুব ভালভাবে কাজ করবে যখন আমরা একটি React ইকোসিস্টেমে কাজ করবেন, যেখানে একটি কম্পোনেন্ট আরেকটির সাথে আইসোলেটেড অবস্থায় থাকবে। React কোডের ভিতরে [কম্পোনেন্ট কম্পোজিশন](/docs/components-and-props.html#composing-components) ব্যবহার করা খুবই সাচ্ছন্দের বিষয়।

### টিপ: প্রোডাকশনের জন্য জাভাস্ক্রিপ্টকে মিনিফাই করুন {#tip-minify-javascript-for-production}

আপনার ওয়েবসাইটের প্রোডাকশন ডেপলয় এর আগে অবশ্যয় আপনার জাভাস্ক্রিপ্ট কোড সমূহ মিনিফাই করে ফেলুন। কারণ আনমিনিফাইড জাভাস্ক্রিপ্ট আপনার পেজকে ইউজারের নিকট ধীর গতির সেবা দিতে পারে।

আপনি যদি আলরেডি অ্যাপ্লিকেশন স্ক্রিপ্ট সমূহ মিনিফাই করে থাকেন **তাহলে আপনার সাইট এখন প্রোডাকশন রেডি**। আপনি যদি নির্দিষ্ট করতে চান যে আপনার প্রোডাকশন HTML পেজ React লোড করবে `production.min.js` এই স্ক্রিপ্ট, তাহলে নিচের মত স্ক্রিপ্ট অ্যাড করুন।

```js
<script src="https://unpkg.com/react@16/umd/react.production.min.js" crossorigin></script>
<script src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js" crossorigin></script>
```

আপনার যদি স্ক্রিপ্ট সমুহকে মিনিফাই করার বাবস্থা না থাকে তবে [এই পথ অনুসরন করতে পারেন](https://gist.github.com/gaearon/42a2ffa41b8319948f9be4076286e1f3)।

## অপশনাল: React এ JSX ব্যবহার করে দেখুন {#optional-try-react-with-jsx}

উপরের উদাহরণ সমুহে আমরা শুধুমাত্র ব্রাওজারে আগে থেকেই সাপোর্ট করে এমন কোড নিয়ে কথা বলেছি। এই জন্য আমরা জাভাস্ক্রিপ্ট ফাংসন ব্যবহার করেছি React কে কাজ করানোর জন্য।

```js
const e = React.createElement;

// Display a "Like" <button>
return e(
  'button',
  { onClick: () => this.setState({ liked: true }) },
  'Like'
);
```

যায়হোক, আরও একটি উপায়ে React ব্যবহার করা যায়, তা হলো - [JSX](/docs/introducing-jsx.html):

```js
// Display a "Like" <button>
return (
  <button onClick={() => this.setState({ liked: true })}>
    Like
  </button>
);
```

উপরের কোড দুইটি একে অপরের সমতুল্য। এখানে **JSX একটি [সম্পূর্ণ অপশনাল ফিচার](/docs/react-without-jsx.html)**, অনেকেই ইউআই কোড লেখার জন্য JSX কে হেল্পফুল মনে করেন এবং এই সাচ্ছন্দ React ও অন্যান্য লাইব্রেরির ক্ষেত্রেও।

আপনি [অনলাইনেও JSX চেষ্টা করে দেখতে পারেন এই কনভার্টার টির মাধ্যমে](https://babeljs.io/en/repl#?babili=false&browsers=&build=&builtIns=false&spec=false&loose=false&code_lz=DwIwrgLhD2B2AEcDCAbAlgYwNYF4DeAFAJTw4B88EAFmgM4B0tAphAMoQCGETBe86WJgBMAXJQBOYJvAC-RGWQBQ8FfAAyaQYuAB6cFDhkgA&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&timeTravel=false&sourceType=module&lineWrap=true&presets=es2015%2Creact%2Cstage-2&prettier=false&targets=&version=7.4.3).

### দ্রুত JSX চেষ্টা করে দেখুন {#quickly-try-jsx}

সবচেয়ে সহজে JSX ব্যবহার করার অন্যতম উপায় হচ্ছে নিচের মত করে আপনার পেজে একটি `<script>` ট্যাগ সংযুক্ত করুনঃ 

```html
<script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
```

এখন আপনি আপনার যেকোনো `<script>` ট্যাগে `type="text/babel"` অ্যাট্রিবিউটটি যুক্ত করে খুব সহজেই JSX লিখতে পারবেন। [এখানে একটি উদাহরণের কোড দেয়া আছে](https://raw.githubusercontent.com/reactjs/reactjs.org/master/static/html/single-file-example.html)।

এই অ্যাপ্রচটি লার্নিং ও ছোট ছোট ডেমো প্রোজেক্ট করার জন্য ঠিক আছে। তবে, এই পদ্ধতি আপনার ওয়েবসাইট কে স্লো করে দিবে **ইহা প্রোডাকশনের জন্য মটেও সুইটেবল নয়**। আপনি যখন সামনে আগাতে প্রস্তুত তখন শেষের `<script>` ট্যাগটি সরিয়ে ফেলুন যার অ্যাট্রিবিউট হিসেবে `type="text/babel"` ব্যবহার করেছিলেন। নিচের পরিচ্ছেদে আমরা দেখবো কিভাবে JSX প্রিপ্রসেসর ব্যবহার করে সকল `<script>` ট্যাগ সমুহকে একসাথে স্বয়ংক্রিয় ভাবে কনভার্ট করতে পারি।

### একটি প্রোজেক্টে JSX যুক্ত করুন {#add-jsx-to-a-project}

কোন প্রোজেক্টে JSX যুক্ত করার জন্য তেমন কোন জটিল বান্ডেলার বা ডেভেলপমেন্ট সার্ভারের প্রয়োজন নাই। আসলে, JSX যুক্ত করা অনেকটা **CSS প্রিপ্রসেসর যুক্ত করার মত**। শুধুমাত্র আপনার কম্পিউটারে [নোড জেএস](https://nodejs.org/) ইন্সটল করা থাকতে হবে।

টার্মিনাল থেকে আপনার প্রোজেক্ট ফোল্ডারের লোকেশনে যান এবং নিচের কমান্ড দুইটি রান করুনঃ

1. **ধাপ-১:** Run `npm init -y` (যদি এটা ফেল করে, [তাহলে এখানে একটু দেখুন](https://gist.github.com/gaearon/246f6380610e262f8a648e3e51cad40d))
2. **ধাপ-২:** Run `npm install babel-cli@6 babel-preset-react-app@3`

>পরামর্শ
>
>আমরা এখানে **npm ব্যবহার করেছি শুধুমাত্র JSX প্রিপ্রসেসর ইন্সটল করার জন্য** এছাড়া অন্য কিছু আপনার দরকার নাই আপাতত। React ও অ্যাপলিকেশনের কোড আগের মতই `<script>` ট্যাগসহ আছে, কোন পরিবর্তন ছাড়ায়।

অভিনন্দন! আপনি এই মাত্র **প্রোডাকশন উপযোগী JSX সেটআপ** আপনার প্রোজেক্টে সংযুক্ত করেছেন।


### JSX প্রিপ্রসেসর রান করুন {#run-jsx-preprocessor}

একটি ফোল্ডার তৈরি করুন `src` নামে এবং নিচের কমান্ড গুলো টার্মিনালে রান করুনঃ

```
npx babel --watch src --out-dir . --presets react-app/prod 
```

> পরামর্শ
>
> `npx` কোন ভুল কমান্ড নয় - এটি একটি [প্যাকেজ রানার টুল, যা npm এর ৫.২+ ভার্শনগুলোতে আছে](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b).
>
> আপনি যদি এরকম একটা এরর ম্যাসেজ পান যে- "আপনি ভুল করে `babel` প্যাকেজ ইন্সটল করেছেন", আপনি মনে হয় [আগের স্টেপটি](#add-jsx-to-a-project) ছেড়ে এসেছেন। আগের অংশটি একই ফোল্ডারে চালিয়ে দেখুন, অতঃপর আবার চেষ্টা করুন।

এই কাজ শেষ হবার অপেক্ষায় থাকার প্রয়োজন নাই -- এই কমান্ডটি একটি স্বয়ংক্রিয় ওয়াচার চালু করে দেবে JSX এর জন্য।

আপনি যদি এখন `src/like_button.js` নামে একটি ফাইল তৈরি করেন এই **[JSX স্টারটার কোডটি](https://cdn.rawgit.com/gaearon/c8e112dc74ac44aac4f673f2c39d19d1/raw/09b951c86c1bf1116af741fa4664511f2f179f0a/like_button.js)**, দিয়ে। ওয়াচারটি একটি প্রিপ্রসেসড `like_button.js` নামে একটা ফাইল তৈরি করবে যাতে সাধারন জাভাস্ক্রিপ্ট কোড লেখা থাকবে, যেন ব্রাউজার গুলো সহজে বুঝতে পারে। আপনি যদি সোর্স ফাইলে কোন কিছু পরিবর্তন করেন, তবে টা স্বয়ংক্রিয় ভাবে পুনরায় চালু হবে।

As a bonus, this also lets you use modern JavaScript syntax features like classes without worrying about breaking older browsers. The tool we just used is called Babel, and you can learn more about it from [its documentation](https://babeljs.io/docs/en/babel-cli/).
এক্ষেত্রে বোনাস হচ্ছে, এই পদ্ধতিতে আপনি কোন রকম শঙ্কা ছাড়ায় যেকোন পুরাতন ব্রাউজারের জন্যও মডার্ন জাভাস্ক্রিপ্ট এর সিনট্যাক্স ও ফিচারসমূহ ব্যবহার করতে পারবেন। আমরা এখানে যে টুলটি ব্যবহার করছি তাকে `Babel` বলা হয়। আপনি এ বিষয়ে বিস্তারিত জানতে চাইলে [এই ডকুমেন্টটি পড়তে পারেন](https://babeljs.io/docs/en/babel-cli/)।

আপনি যদি মনে করেন, এখন আপনি মোটামুটি বিলড টুলস গুলোতে কমফোর্টেবল ফিল করছেন এবং নিজের প্রোজেক্টের প্রয়োজনে ব্যবহার করতে পারবেন। [পরবর্তী পরিচ্ছেদে](/docs/create-a-new-react-app.html) বেশ কিছু জনপ্রিয় টুলচেইন নিয়ে আলোচনা করা হয়েছে। এছাড়াও `<script>` ট্যাগ ব্যবহার করেও ছোটখাটো কাজ গুলো করতে পারবেন।