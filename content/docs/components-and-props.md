---
id: components-and-props
title: Components and Props
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

কম্পোনেন্ট আপনার UI কে স্বাধীন, পুনরায় ব্যবহারযোগ্য খন্ডে ভাগ করতে এবং প্রতিটি খন্ডকে আলাদাভাবে চিন্তা করতে সাহায্য করে। এই পৃষ্ঠায় কম্পোনেন্ট এর বিষয়ে কিছুটা ধারণা দেওয়া আছে। আপনি [এখানে বিস্তারিত কম্পোনেন্ট API রেফারেন্স](/docs/react-component.html) পাবেন। 

ধারণাগতভাবে, কম্পোনেন্ট অনেকটা জাভাস্ক্রিপ্ট ফাংশনের মত। তারা যেকোন রকম ইনপুট (যাদেরকে প্রপ বলে) গ্রহণ করে এবং স্ক্রিনে যেমন দেখা যাওয়া উচিত সে হিসেবে React এলিমেন্ট ফেরত পাঠায়।

## ফাংশন এবং ক্লাস কম্পোনেন্ট {#function-and-class-components}

একটি কম্পোনেন্ট তৈরি করবার সবচেয়ে সোজাসাপ্টা পদ্ধতি হচ্ছে একটি জাভাস্ক্রিপ্ট ফাংশন লেখা। 

```js
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

এটি একটি যথাযোগ্য React কম্পোনেন্ট কারণ এটি একটিমাত্র "props" (যা properties থেকে এসেছে) ডেটা সহ অবজেক্ট আর্গুমেন্ট গ্রহণ করে এবং একটি React এলিমেন্ট ফেরত পাঠায়। আমরা এই ধরণের কম্পোনেন্টকে ফাংশন কম্পোনেন্ট বলি, কারণ এরা একদম সত্যিকার অর্থে জাভাস্ক্রিপ্ট ফাংশন।  

কম্পোনেন্ট ডিফাইন করবার জন্য আপনি [ES6 class](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes)ও ব্যবহার করতে পারেন:

```js
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

উপরের এই দুইটি কম্পোনেন্ট React এর দৃষ্টিকোণ থেকে সমকক্ষ।

ক্লাসগুলোর কিছু অতিরিক্ত সুবিধা আছে যা আমরা [পরবর্তী অংশে](/docs/state-and-lifecycle.html) আলোচনা করব। ততক্ষণ আমরা ফাংশন কম্পোনেন্ট ব্যবহার করব, কারণ তারা অপেক্ষাকৃত সংক্ষিপ্ত।

## একটি কম্পোনেন্ট এর প্রদর্শন বা রেন্ডারিং {#rendering-a-component}

এর আগে আমরা শুধু সেইসব React এলিমেন্ট দেখেছি যেগুলোর সাথে DOM ট্যাগ আছে।

```js
const element = <div />;
```

তবে, এলিমেন্টগুলো ব্যবহারকারীর নিজের ডিফাইন করা কম্পোনেন্টও দেখাতে পারে। যেমন:

```js
const element = <Welcome name="Sara" />;
```

যখন React দেখে কোন একটি এলিমেন্ট ইউজার এর নিজের বানানো একটি কম্পোনেন্টকে প্রদর্শন করছে, তখন JSX এট্রিবিউটগুলোকে একটিমাত্র অবজেক্ট হিসেবে এই কম্পোনেন্টে পাঠিয়ে দেয়। এই অবজেক্টকে আমরা প্রপ্স (props) বলি। 

উদাহরণস্বরূপ, নিচের এই কোডটি পেইজে "Hello, Sara" প্রদর্শন(render) করে:

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

[](codepen://components-and-props/rendering-a-component)

এই উদাহরণটিতে আসলে কি হচ্ছে তা আমরা একটু পিছনে ফিরে দেখি:

1. আমরা `<Welcome name="Sara" />` এলিমেন্টটির সাহায্যে `ReactDOM.render()` কে কল(call) করি। 
2. React `{name: 'Sara'}` কে প্রপ হিসেবে ব্যবহার করে `Welcome` কম্পোনেন্টটিকে কল করে।
3. ফলস্বরূপ আমাদের `Welcome` কম্পোনেন্ট `<h1>Hello, Sara</h1>` এলিমেন্টটিকে রিটার্ন করে।
4. React DOM খুব কার্যকরীভাবে `<h1>Hello, Sara</h1>` এর সাথে মিলাবার জন্য DOM কে আপডেট করে ফেলে। 

>**নোট:** সবসময় কম্পোনেন্টের নাম বড় হাতের হরফে শুরু করবেন।
>
>React ছোট হাতের হরফে দিয়ে শুরু করা নামবিশিষ্ট কম্পোনেন্টগুলোকে DOM ট্যাগ হিসেবে বিবেচনা করে। যেমন, `<div />` দিয়ে বুঝায় একটি HTML div tag। অন্যদিকে, `<Welcome />` দিয়ে একটি কম্পোনেন্ট বুঝায় যার স্কোপের মধ্যে অবশ্যই `Welcome` থাকা জরুরী।
>
>এই রীতির পেছনের কারণ আরো বিস্তারিতভাবে জানার জন্য [JSX নিয়ে বিস্তারিত](/docs/jsx-in-depth.html#user-defined-components-must-be-capitalized) পৃষ্ঠাটি দেখতে পারেন।

## কম্পোনেন্ট এর কম্পোজিং {#composing-components}

কোন একটি কম্পোনেন্ট তার আউটপুটে অন্য কোন একটি বা একাধিক কম্পোনেন্টকে রেফার(refer) করতে পারে। এই ব্যবস্থাটি আমাদেরকে একই কম্পোনেন্ট এবস্ট্রাকশনকে(component abstraction) যেকোন স্তরের ডিটেইল এ ব্যবহারের সুবিধা দেয়। বাটন, ফর্ম, ডায়লগ, স্ক্রিন এই সবকিছুই React অ্যাপগুলোতে সাধারণভাবে কম্পোনেন্ট হিসেবে ব্যবহৃত হয়।  
 
নিচের উদাহরণটিতে আমরা দেখতে পাব, কিভাবে আমরা একটি `App` কম্পোনেন্ট তৈরি করতে পারি যা অনেক বার `Welcome` দেখাবে:

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

[](codepen://components-and-props/composing-components)

সাধারণত নতুন React অ্যাপগুলোতে একদম উপরের দিকে একটিমাত্র `App` কম্পোনেন্ট থাকে। তবে আপনি যদি আগে থেকে তৈরি করা একটি অ্যাপ্লিকেশনে React যোগ করতে চান, তাহলে আপনি `Button` নামে একটি ছোট কম্পোনেন্ট দিয়ে শুরু করতে পারেন। পরবর্তীতে, এখান থেকে একটু একটু করে ভিউ হায়ারার্কি এর একদম উপরে পৌছাতে পারেন।

## কম্পোনেন্ট ভেঙ্গে ফেলা {#extracting-components}

কোন একটি কম্পোনেন্টকে ছোট ছোট কম্পোনেন্ট এ ভেঙ্গে ফেলতে ভয় পাবেন না।

উদাহরণস্বরূপ, নিচের `Comment` কম্পোনেন্টটি দেখতে পারেন:

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

[](codepen://components-and-props/extracting-components)

এটি `author` (অবজেক্ট), `text` (স্ট্রিং), and `date` (তারিখ) কে প্রপ হিসেবে গ্রহণ করে এবং একটি সোশ্যাল মিডিয়া ওয়েবসাইটে একটি কমেন্ট বর্ণনা করে। 

অনেক নেস্টিং(nesting) এর কারণে এই কম্পোনেন্ট এ পরিবর্তন ঘটানো একটু জটিল হবে। এছাড়াও, এর ভিতরকার অংশগুলো আলাদাভাবে ব্যবহার করাও কঠিন। আমরা এখানে থেকে কিছু কম্পোনেন্ট বের করে আনতে পারি।

আমরা প্রথমে `Avatar` বের করে আনব:

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

`Avatar` এর কাছে তথ্য থাকবার দরকার নেই যে এটি `Comment` এর মধ্যে রেন্ডার করা হচ্ছে। এ কারণেই আমরা এর প্রপকে `author` এর বদলে `user` এর মত সাধারণীকৃত(generic) একটি নাম দিয়েছি। 

আমরা কোন একটি প্রপ এর নাম দেবার সময় কোন কনটেক্সট এ এটি ব্যবহার হচ্ছে সেটা না দেখে বরং ওই কম্পোনেন্ট এর নিজের দৃষ্টিকোণ থেকে দেখার উপদেশ দিব। 

এখন আমরা `Comment`কে আরেকটু সরলভাবে লিখতে পারি।

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

এখন, আমরা একটি কম্পোনেন্ট `UserInfo` বের করে আনব যা ইউজার এর নাম এর পাশে `Avatar` দেখাবে:

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

এই কাজটা কম্পোনেন্টকে আরো একটু সোজাসাপ্টা করার পথ খুলে দেয়:

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

[](codepen://components-and-props/extracting-components-continued)

কম্পোনেন্ট বের করে আনা শুরুর দিকে একটু কষ্টকর কাজ বলে মনে হতে পারে। কিন্তু, বড় বড় অ্যাপ্লিকেশনে পুনরায় ব্যবহার করা যায় এমন অনেকগুলো কম্পোনেন্ট এর একটি লাইব্রেরী খুবই কাজে দেয়। ভাল একটি রুল অফ থাম্ব হচ্ছে, যদি আপনার UI এর কোন একটি অংশ(`Button`, `Panel`, `Avatar`) বার বার ব্যবহৃত হয়, অথবা নিজেই যথেষ্ট জটিল(`App`, `FeedStory`, `Comment`) হয়, তাহলে ওই কম্পোনেন্টটি পুনর্ব্যবহারযোগ্য একটি কম্পোনেন্ট হবার জন্য আদর্শ। 

## প্রপ্সগুলো সবসময় হওয়া উচিত রিড-ওনলি {#props-are-read-only}

আপনি একটি কম্পোনেন্টকে [ফাংশন বা ক্লাস যে হিসেবেই ডিক্লেয়ার করেন](#function-and-class-components), তার নিজের প্রপ্সগুলো নিজের পরিবর্তন করার সামর্থ্য কোনভাবেই থাকা যাবে না। নিচের `sum` ফাংশনটি খেয়াল করুন:

```js
function sum(a, b) {
  return a + b;
}
```

এই ফাংশনগুলোকে ["pure"](https://en.wikipedia.org/wiki/Pure_function) বা বিশুদ্ধ ফাংশন বলা হয়। কারণ, এরা নিজেরা নিজেদের ইনপুটকে বদলাতে পারে না। একইসাথে, একটি ইনপুটের আউটপুট সবসময় একই দেয়।

অপরদিকে, নিচের এই ফাংশনটি impure বা অবিশুদ্ধ। কারণ এটি নিজের ইনপুট নিজেই বদলে ফেলে:

```js
function withdraw(account, amount) {
  account.total -= amount;
}
```

React যথেষ্টই নমনীয় কিন্তু এর খুবই শক্ত একটা নীতি আছে:

**প্রতিটি React কম্পোনেন্টকে তাদের প্রপ এর হিসেবে অবশ্যই একটি পিওর ফাংশন হিসেবে কাজ করতে হবে।**

নিঃসন্দেহে অ্যাপ্লিকেশনের UI খুবই পরিবর্তনশীল হয় এবং সময়ের সাথে সাথে অনেক পরিবর্তন আসে। [পরের সেকশনে](/docs/state-and-lifecycle.html) আমরা একটি নতুন ধারণার অবতারণা করব, যার নাম "state"। স্টেট এর কারণে React কম্পোনেন্টগুলো কোন ধরণের নিয়ম না ভেঙ্গেই তাদের ইউজার এর বিভিন্ন কাজ, নেটওয়ার্ক রেসপন্স বা অন্য যেকোনকিছুর কারণে তাদের আউটপুট বদলানোর সুযোগ পায়। 
