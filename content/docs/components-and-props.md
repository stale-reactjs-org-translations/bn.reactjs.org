---
id: components-and-props
title: কম্পোনেন্ট এবং Props
permalink: docs/components-and-props.html
redirect_from:
  - "docs/reusable-components.html"
  - "docs/reusable-components-zh-CN.html"
  - "docs/transferring-props.html"
  - "docs/transferring-props-it-IT.html"
  - "docs/transferring-props-ja-JP.html"
  - "docs/transferring-props-ko-KR.html"
  - "docs/transferring-props-zh-CN.html"
  - "tips/props-in-getInitialState-as-anti-pattern.html"
  - "tips/communicate-between-components.html"
prev: rendering-elements.html
next: state-and-lifecycle.html
---

কম্পোনেন্ট আপনার UIকে স্বতন্ত্র, পুনরায় ব্যবহারযোগ্য অংশে ভাগ করে, যাতে করে আপনি প্রতিটি অংশ নিয়ে পৃথকভাবে চিন্তা করতে পারেন। এই পেইজটি কম্পোনেন্টের ধারণা নিয়ে একটি ভূমিকা দেয়। আপনি [ডিটেইল্ড কম্পোনেন্ট API রেফারেন্স এখানে](/docs/react-component.html) খুঁজে পাবেন।

মোটামুটিভাবে, কম্পোনেন্ট অনেকটা জাভাস্ক্রিপ্ট ফাংশনের মত। তারা আরবিটারি ইনপুট গ্রহণ করে (যাকে "props" বলা হয়) React elements রিটার্ন করে যা স্ক্রিনে কি দেখানো হবে তা বর্ণনা করে।

## ফাংশন এবং ক্লাস কম্পোনেন্ট {#function-and-class-components}

 সহজ উপায়ে কম্পোনেন্টের সংজ্ঞা হচ্ছে একটি জাভাস্ক্রিপ্ট ফাংশন লিখাঃ

```js
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

এই ফাংশনটি একটি ভ্যালিড React কম্পোনেন্ট কারণ এটি একটি সিঙ্গেল "props" (যাকে properties বোঝায়) অবজেক্ট ডাটাসহ আর্গুমেন্ট হিসেবে গ্রহণ করে এবং একটি React element রিটার্ন করে। আমরা এই ধরনের কম্পোনেন্টকে "ফাংশন কম্পোনেন্ট" বলে থাকি কারণ এগুলো আক্ষরিক অর্থেই জাভাস্ক্রিপ্ট ফাংশন।

আপনি একটি [ES6 ক্লাস](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes) ব্যবহার করেও একটি কম্পোনেন্টকে সংজ্ঞায়িত করতে পারেনঃ

```js
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

React এর দৃষ্টিকোণ থেকে উপরের কম্পোনেন্ট দুটি আসলে একই।

ফাংশন এবং ক্লাস উভয় কম্পোনেন্টের কিছু বাড়তি ফিচার রয়েছে যেগুলো আমরা [পরবর্তী অনুচ্ছেদে](/docs/state-and-lifecycle.html) আলোচনা করব।

## কম্পোনেন্ট রেন্ডারিং {#rendering-a-component}

পূর্বে, আমরা সেইসব React elements নিয়ে কথা বলেছি যেগুলো কেবল DOM ট্যাগকে প্রকাশ করেঃ

```js
const element = <div />;
```

যাহোক, elements ইউজার-ডিফাইন্ড কম্পোনেন্টকেও প্রকাশ করেঃ

```js
const element = <Welcome name="Sara" />;
```

React যখন একটি ইউজার-ডিফাইন্ড কম্পোনেন্ট সম্বলিত element দেখে, এটি সিঙ্গেল অবজেক্ট হিসেবে JSX attributes এবং childrenকে ওই কম্পোনেন্টে পাস করে। আমরা এই অবজেক্টকে "props" বলি।

উদাহরণস্বরূপ, এই কোডটি "Hello, Sara" লিখাটি এই পেইজে রেন্ডার করেঃ

```js{1,5}
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

const element = <Welcome name="Sara" />;
ReactDOM.render(
  element,
  document.getElementById('root')
);
```

<<<<<<< HEAD
[CodePen এ চালিয়ে দেখুন](codepen://components-and-props/rendering-a-component)
=======
**[Try it on CodePen](https://codepen.io/gaearon/pen/YGYmEG?editors=1010)**
>>>>>>> 20f0fe280f3c122df7541256b983c46e21e33b20

আসুন দেখি এই উদাহরণে কি ঘটলোঃ

১. আমরা `<Welcome name="Sara" />` element সহ `ReactDOM.render()`কে কল করি।
২. React, props হিসেবে `{name: 'Sara'}` সহ `Welcome` কম্পোনেন্টকে কল করে।
৩. আমাদের `Welcome` কম্পোনেন্টটি `<h1>Hello, Sara</h1>` element কে ফলাফল হিসেবে রিটার্ন করে।
৪. React DOM দক্ষতার সাথে `<h1>Hello, Sara</h1>` ম্যাচ করে DOM কে আপডেট করে।

>**বিঃদ্রঃ** সবসময় ক্যাপিটাল লেটার দিয়ে কম্পোনেন্টের নাম শুরু করবেন।
>
>যেসব কম্পোনেন্ট ছোট হাতের অক্ষর দিয়ে শুরু হয়, React তাদের সাথে DOM tags এর মত আচরণ করে। উদাহরণস্বরূপ, `<div />` একটি HTML div tag প্রকাশ করে, কিন্তু `<Welcome />` একটি কম্পোনেন্ট প্রকাশ করে এবং এর জন্য `Welcome`এর স্কোপের মধ্য থাকা প্রয়োজন।
>
>এই কনভেনশনের পিছনের কারণ জানতে, অনুগ্রহ করে [JSX In Depth](/docs/jsx-in-depth.html#user-defined-components-must-be-capitalized) পড়ুন।

## কম্পোনেন্ট কোম্পোজিং {#composing-components}

কম্পোনেন্ট তাদের আউটপুট হিসেবে অন্য কম্পোনেন্টদের রেফার করতে পারে। এটি আমাদের একই কম্পোনেন্টের এবস্ট্রাকশন যে কোন বিস্তারিত লেভেল পর্যন্ত ব্যবহার করতে সাহায্য করে। বাটন, ফর্ম, ডায়ালগ, স্ক্রিনঃ React অ্যাপে, এই সবগুলোই কম্পোনেন্ট হিসেবে প্রকাশিত হয়।

উদাহরণস্বরূপ, আমরা একটি `App` কম্পোনেন্ট তৈরি করতে পারি যেটি `Welcome`কে বহুবার রেন্ডার করতে পারেঃ

```js{8-10}
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

function App() {
  return (
    <div>
      <Welcome name="Sara" />
      <Welcome name="Cahal" />
      <Welcome name="Edite" />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```

<<<<<<< HEAD
[CodePen এ চালিয়ে দেখুন](codepen://components-and-props/composing-components)
=======
**[Try it on CodePen](https://codepen.io/gaearon/pen/KgQKPr?editors=1010)**
>>>>>>> 20f0fe280f3c122df7541256b983c46e21e33b20

সাধারণত, নতুন React অ্যাপে একটি সিঙ্গেল `App` কম্পোনেন্ট সবার উপরে থাকে। যাহোক, যদি আপনি বিদ্যমান অ্যাপ্লিকেশনে React সংযুক্ত করেন, আপনি নিচের অংশে ছোট্ট একটি কম্পোনেন্ট যেমন `Button` দিয়ে শুরু করুন এবং ধীরে ধীরে আপনার ভিউয়ের উপরে কাজ করুন।

## কম্পোনেন্ট পৃথকীকরণ {#extracting-components}

কম্পোনেন্টকে ছোট কম্পোনেন্টে পৃথক করতে ভয় পাবেন না।

উদাহরণস্বরূপ, এই `Comment` কম্পোনেন্টটি দেখুনঃ

```js
function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <img className="Avatar"
          src={props.author.avatarUrl}
          alt={props.author.name}
        />
        <div className="UserInfo-name">
          {props.author.name}
        </div>
      </div>
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
```

<<<<<<< HEAD
[CodePen এ চালিয়ে দেখুন](codepen://components-and-props/extracting-components)
=======
**[Try it on CodePen](https://codepen.io/gaearon/pen/VKQwEo?editors=1010)**
>>>>>>> 20f0fe280f3c122df7541256b983c46e21e33b20

এটি `author` (একটি অবজেক্ট), `text` (একটি string), এবং `date` (একটি date)কে props হিসেবে গ্রহণ করে, এবং সোশ্যাল মিডিয়া সাইটে একটি কমেন্ট বর্ণনা করে।

এই কম্পোনেন্টটি তার সব নেস্টিং অংশের জন্য পরিবর্তন করা কৌশলী হতে পারে, এবং এর প্রতিটি অংশ পুনব্যবহার করাও কঠিন। আসুন একে কিছু কম্পোনেন্টে পৃথক করি।

প্রথমে, আমরা `Avatar`কে পৃথক করবঃ

```js{3-6}
function Avatar(props) {
  return (
    <img className="Avatar"
      src={props.user.avatarUrl}
      alt={props.user.name}
    />
  );
}
```

`Avatar` জানার দরকার নেই যে এটি `Comment` এর ভিতরে রেন্ডার হচ্ছে। এইজন্য আমরা এর propকে আরও সাধারণ নাম দিয়েছিঃ `author` এর বদলে `user`।

কম্পোনেন্টটি কোন প্রসঙ্গে ব্যবহৃত হচ্ছে তার পরিবর্তে কম্পোনেন্টটির নিজস্ব দৃষ্টিকোণ থেকে তার props এর নামকরণ করতে আমরা পরামর্শ দেই।

 আমরা এখন `Comment` এর একটি ছোট অংশ সহজতর করতে পারিঃ

```js{5}
function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <Avatar user={props.author} />
        <div className="UserInfo-name">
          {props.author.name}
        </div>
      </div>
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
```

এরপর, আমরা `UserInfo` কম্পোনেন্টকে পৃথক করবো যেটি  ইউজারের নামের পরে `Avatar`কে রেন্ডার করেঃ

```js{3-8}
function UserInfo(props) {
  return (
    <div className="UserInfo">
      <Avatar user={props.user} />
      <div className="UserInfo-name">
        {props.user.name}
      </div>
    </div>
  );
}
```

এটি আমাদের `Comment`কে সহজতর করতে এক ধাপ এগিয়ে নেয়ঃ

```js{4}
function Comment(props) {
  return (
    <div className="Comment">
      <UserInfo user={props.author} />
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
```

<<<<<<< HEAD
[CodePen এ চালিয়ে দেখুন](codepen://components-and-props/extracting-components-continued)
=======
**[Try it on CodePen](https://codepen.io/gaearon/pen/rrJNJY?editors=1010)**
>>>>>>> 20f0fe280f3c122df7541256b983c46e21e33b20

কম্পোনেন্ট পৃথক করাকে শুরুতে খুব বিরক্তিকর কাজ মনে হবে, তবে পুনরায় ব্যবহারযোগ্য কম্পোনেন্টের একটি প্যালেট থাকা বড় অ্যাপ্লিকেশনগুলোর জন্য বেশ লাভজনক।  এটি বোঝার একটি সহজ উপায় হল, যদি আপনার UI এর কোন অংশ কয়েকবার ব্যবহৃত হয় (`Button`, `Panel`, `Avatar`), অথবা এটি নিজেই যথেষ্ট জটিল(`App`, `FeedStory`, `Comment`), তবে এটি আলাদা করে নিয়ে একটি ব্যবহারযোগ্য কম্পোনেন্ট হতে যোগ্য প্রার্থী।

## Propsরা কেবল রীড-অনলি {#props-are-read-only}

আপনি কোন কম্পোনেন্টকে [ফাংশন অথবা ক্লাস](#function-and-class-components) যেভাবেই সংজ্ঞায়িত করুন না কেন, এটি কখনোই নিজের propsকে পরিবর্তন করবে না। এই `sum` ফাংশনের কথাই ধরুনঃ

```js
function sum(a, b) {
  return a + b;
}
```

এই ধরনের ফাংশনকে ["pure"](https://en.wikipedia.org/wiki/Pure_function) ফাংশন বলে  কারণ তারা তাদের ইনপুট পরিবর্তন করার চেষ্টা করে না এবং সর্বদা একই ইনপুটের জন্য একই ফলাফল রিটার্ন করে।

বিপরীতে, এই ফাংশনটি অশুদ্ধ কারণ এটি নিজের ইনপুট পরিবর্তন করেঃ

```js
function withdraw(account, amount) {
  account.total -= amount;
}
```

React বেশ ফ্লেক্সিবল তবে এর একটি কঠোর নিয়ম রয়েছেঃ

**সকল React কম্পোনেন্টকে তার props এর কথা মাথায় রেখে pure ফাংশনের মত হতে হবে।**

অবশ্যই, অ্যাপ্লিকেশন UI ডাইনামিক এবং সময়ের সাথে সাথে পরিবর্তিত হয়। [পরবর্তী অনুচ্ছেদে](/docs/state-and-lifecycle.html), আমরা "state" এর একটি নতুন ধারণাকে তুলে ধরব। এই নিয়ম লঙ্ঘন না করে state সময়ের সাথে সাথে ইউজারের অ্যাকশন, নেটওয়ার্কের রেসপন্স এবং অন্য যে কোন কিছুর প্রতিক্রিয়া হিসেবে React কম্পোনেন্টকে তার আউটপুট পরিবর্তন করতে সাহায় করে।
