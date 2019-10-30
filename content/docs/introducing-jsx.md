---
id: introducing-jsx
title: JSX পরিচিতি
permalink: docs/introducing-jsx.html
prev: hello-world.html
next: rendering-elements.html
---

এই ভ্যারিয়েবল ডিক্লেয়ারেশনটি দেখুনঃ

```js
const element = <h1>Hello, world!</h1>;
```

এই মজার ট্যাগ সিনট্যাক্সটি কোন স্ট্রিং ও HTML ও নয়।

একে JSX বলা হয়, এটি জাভস্ক্রিপ্টের একটি সিনট্যাক্স extension। আমরা ইউজার ইন্টারফেস দেখতে কেমন হবে তা বর্ণনা করার জন্য React এর সাথে এটি ব্যবহার করার পরামর্শ দিয়ে থাকি। JSX হয়তো আপনাকে কোন টেমপ্লেট ল্যাঙ্গুয়েজের কথা মনে করিয়ে দেয়, কিন্তু এটি জাভাস্ক্রিপ্টের পরিপূর্ণ ব্যবহার করতে পারে।

JSX React "elements" তৈরি করে। আমরা [পরের অনুচ্ছেদে](/docs/rendering-elements.html) DOM এ এদের কিভাবে রেন্ডার করা যায় এ সম্পর্কে জানব। আপনি নিচে শুরু করার জন্য দরকারী JSX সম্পর্কে জানতে পারবেন।

### JSX কেন? {#why-jsx}

React এই তথ্যকে গ্রহণ করে যে রেন্ডারিং লজিক এবং ইউজার ইন্টারফেস লজিক একইসাথে কাজ করেঃ কিভাবে ইভেন্ট হ্যান্ডেল করা হয়, কিভাবে state সময়ের সাথে পরিবর্তিত হয়, এবং কিভাবে ডাটাকে ডিসপ্লের জন্য প্রস্তুত করা হয়।

কৃত্রিমভাবে মার্কআপ এবং লজিককে আলাদা ফাইলে রাখার মাধ্যমে *টেকনোলজিগুলোকে* পৃথক করার পরিবর্তে, React "কম্পোনেন্ট" নামক loosely coupled ইউনিট যা উভয়ই ধারণ করে তার মাধ্যমে [concern গুলোকে পৃথক](https://en.wikipedia.org/wiki/Separation_of_concerns) করে। আমরা কম্পোনেন্টে পরের একটি অনুচ্ছেদে ফিরে আসব, কিন্তু আপনি যদি JS এ মার্কআপ রাখতে সুবিধাজনক মনে না করেন, [এই টক](https://www.youtube.com/watch?v=x7cQ3mrcKaY) হয়তো আপনাকে মানিয়ে নেবে।

React এর জন্য JSX [ব্যবহার প্রয়োজনীয় নয়](/docs/react-without-jsx.html), কিন্তু অধিকাংশ মানুষ জাভাস্ক্রিপ্ট কোডে ইউজার ইন্টারফেসে কাজ করার সময় এটিকে সহায়ক মনে করেন। এছাড়াও এটি React কে দরকারী error এবং warning মেসেজ দেখাতে সাহায্য করে।

JSX সম্পর্কে তো জানলাম, চলুন শুরু করা যাক!

### JSX-এ এক্সপ্রেশন এমবেড করা {#embedding-expressions-in-jsx}

নিচের উদাহরণে, আমরা `name` নামের একটি ভ্যারিয়েবল ডিক্লেয়ার করেছি এরপর একে JSX এর ভেতর ব্যবহার করেছি কার্লি ব্রেস দ্বারা আবদ্ধ করেঃ

```js{1,2}
const name = 'Josh Perez';
const element = <h1>Hello, {name}</h1>;

ReactDOM.render(
  element,
  document.getElementById('root')
);
```

আপনি JSX এর ভেতর যেকোন বৈধ [জাভাস্ক্রিপ্ট এক্সপ্রেশন](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators#Expressions) রাখতে পারেন। উদাহরণস্বরূপ, `2 + 2`, `user.firstName`, অথবা `formatName(user)` সবই বৈধ জাভাস্ক্রিপ্ট এক্সপ্রেশন।

নিচের উদাহরণে, আমরা একটি জাভাস্ক্রিপ্ট ফাংশন কলের ফলাফলকে, `formatName(user)` একটি `<h1>` element এ এমবেড করেছি।

```js{12}
function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}

const user = {
  firstName: 'Harper',
  lastName: 'Perez'
};

const element = (
  <h1>
    Hello, {formatName(user)}!
  </h1>
);

ReactDOM.render(
  element,
  document.getElementById('root')
);
```

[](codepen://introducing-jsx)

আমরা JSX কে একাধিক লাইনে বিভক্ত করেছি যাতে সহজে পড়া যায়। যদিও এটি দরকারী নয়, এটি করার সময় আমরা প্যারেনথেসেস এ আবদ্ধ করার পরামর্শ দিয়ে থাকি যাতে [automatic semicolon insertion](https://stackoverflow.com/q/2846283) এর অসুবিধাসমূহ এড়িয়ে যাওয়া যায়।

### JSX ও একটি এক্সপ্রেশন {#jsx-is-an-expression-too}

কম্পাইলেশনের পর, JSX এক্সপ্রেশনগুলো সাধারণ জাভাস্ক্রিপ্ট ফাংশন কলে রূপান্তরিত হয় এবং যা জাভাস্ক্রিপ্ট অবজেক্টে পরিণত হয়।

এর মানে আপনি চাইলে `if` স্টেটমেন্ট এবং `for` লুপের ভেতরেও JSX ব্যবহার করতে পারবেন, ভ্যারিয়েবলে এসাইন করতে পারবেন, আর্গুমেন্ট হিসেবে গ্রহণ করতে পারবেন, এবং ফাংশন থেকে রিটার্ন করতে পারবেনঃ

```js{3,5}
function getGreeting(user) {
  if (user) {
    return <h1>Hello, {formatName(user)}!</h1>;
  }
  return <h1>Hello, Stranger.</h1>;
}
```

### JSX এর মাধ্যমে এট্রিবিউট উল্লেখ করা {#specifying-attributes-with-jsx}

আপনি চাইলে quotes ব্যবহার করে স্ট্রিং লিটেরালকে এট্রিবিউট হিসেবে উল্লেখ করতে পারেনঃ

```js
const element = <div tabIndex="0"></div>;
```

আপনি চাইলে কার্লি ব্রেস ব্যবহার করে একটি এট্রিবিউটে জাভাস্ক্রিপ্ট এক্সপ্রেশন এমবেড করতে পারেনঃ 

```js
const element = <img src={user.avatarUrl}></img>;
```

জাভাস্ক্রিপ্ট এক্সপ্রেশনকে এট্রিবিউটে এমবেড করার সময় একে quotes দ্বারা আবদ্ধ করবেন না। আপনি হয় quotes ব্যবহার করবেন(স্ট্রিং ভ্যালুর জন্য) অথবা কার্লি ব্রেস (এক্সপ্রেশনের জন্য), কিন্তু কখনোই একই এট্রিবিউটে দুইটি একসাথে নয়।

>**সতর্কতাঃ**
>
>যেহেতু JSX HTML এর চেয়েও জাভাস্ক্রিপ্টের নিকটবর্তী, React DOM নামকরণের ক্ষেত্রে HTML এট্রিবিউটের পরিবর্তে `camelCase` পদ্ধতি ব্যবহার করে।
>
>উদাহরণস্বরূপ, JSX-এ `class` হয়ে যায় [`className`](https://developer.mozilla.org/en-US/docs/Web/API/Element/className), এবং `tabindex` হয়ে যায় [`tabIndex`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/tabIndex)।

### JSX এর মাধ্যমে Children উল্লেখ করা {#specifying-children-with-jsx}

যদি কোন ট্যাগ খালি হয়, আপনি চাইলে XML এর মত একে সাথে সাথে ক্লোজ করতে পারেন `/>` দিয়েঃ

```js
const element = <img src={user.avatarUrl} />;
```

JSX ট্যাগের ভেতর children থাকতে পারেঃ

```js
const element = (
  <div>
    <h1>Hello!</h1>
    <h2>Good to see you here.</h2>
  </div>
);
```

### JSX Injection Attacks প্রতিরোধ করে {#jsx-prevents-injection-attacks}

ইউজার ইনপুট JSX এ এমবেড করা নিরাপদঃ

```js
const title = response.potentiallyMaliciousInput;
// এটি নিরাপদঃ
const element = <h1>{title}</h1>;
```

ডিফল্টভাবে, React DOM যেকোন ভ্যালুকে রেন্ডার করার আগে [escape](https://stackoverflow.com/questions/7381974/which-characters-need-to-be-escaped-on-html) করে। এটি নিশ্চিত করে আপনি কোনকিছু ইনজেক্ট করতে পারবেন না যা আপনার এপ্লিকেশনে লিখা নেই। সবকিছুই রেন্ডারের আগে স্ট্রিং-এ রূপান্তরিত করা হয়। এটি [XSS (cross-site-scripting)](https://en.wikipedia.org/wiki/Cross-site_scripting) এটাক প্রতিরোধ করতে সাহায্য করে।

### JSX অবজেক্ট চিত্রিত করে {#jsx-represents-objects}

Babel JSX কে কম্পাইল করে `React.createElement()` কলে পরিণত করে।

এই দুইটি উদাহরণ একইঃ

```js
const element = (
  <h1 className="greeting">
    Hello, world!
  </h1>
);
```

```js
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);
```

`React.createElement()` কিছু জিনিস চেক করে যাতে আপনি বাগ-ফ্রি কোড লিখতে পারেন কিন্তু মূলত এটি নিচের মত একটি অবজেক্ট তৈরি করেঃ

```js
// Note: this structure is simplified
const element = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Hello, world!'
  }
};
```

এই অবজেক্টগুলোকে "React elements" বলা হয়। আপনি এগুলোকে চিন্তা করতে পারেন আপনি স্ক্রিনে কি দেখতে চান এর বিবরণ হিসেবে। React এই অবজেক্টগুলোকে ব্যবহার করে DOM তৈরি করে এবং আপডেটেড রাখে।

আমরা পরের অনুচ্ছেদে DOM এ React elements কিভাবে রেন্ডার করা যায় এ সম্পর্কে জানব।

>**পরামর্শঃ**
>
>আমরা আপনার পছন্দের এডিটরের সাথে ["Babel" language definition](https://babeljs.io/docs/editors) ব্যবহার করার পরামর্শ দিয়ে থাকি যাতে ES6 এবং JSX কোড উভয়েই সঠিকভাবে চিহ্নিত করা থাকে। এই ওয়েবসাইট [Oceanic Next](https://labs.voronianski.com/oceanic-next-color-scheme/) কালার স্কিমটি ব্যবহার করে যা এর সাথে সামঞ্জস্যপূর্ণ।
