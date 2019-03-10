---
id: state-and-lifecycle
title: State এবং Lifecycle
permalink: docs/state-and-lifecycle.html
redirect_from:
  - "docs/interactivity-and-dynamic-uis.html"
prev: components-and-props.html
next: handling-events.html
---

এই পৃষ্ঠায় আমরা React কম্পোনেন্টের state এবং lifecycle এর সাথে পরিচিত হব। আপনি [কম্পোনেন্ট API রেফারেন্স এর বিস্তারিত এখানে](/docs/react-component.html) জানতে পারবেন।

[আগের অনুচ্ছেদে আলোচিত](/docs/rendering-elements.html#updating-the-rendered-element) ticking clock এর উদাহরণটির কথাই ধরি। [Rendering Elements](/docs/rendering-elements.html#rendering-an-element-into-the-dom) অনুচ্ছেদে আমরা UI আপডেট করার শুধু একটি উপায় সম্পর্কেই জেনেছি। আমরা `ReactDOM.render()` মেথড কল করে রেন্ডারকৃত আউটপুট পরিবর্তন করেছি।

```js{8-11}
function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  ReactDOM.render(
    element,
    document.getElementById('root')
  );
}

setInterval(tick, 1000);
```

[**CodePen এ চালিয়ে দেখুন**](https://codepen.io/gaearon/pen/gwoJZk?editors=0010)

এই অনুচ্ছেদে আমরা শিখব কিভাবে `Clock` কম্পোনেন্টটিকে সত্যিকার অর্থে পুনঃব্যবহারযোগ্য এবং encapsulated করা যায়। এটি এর নিজের টাইমার সেট-আপ করে নেবে এবং প্রতি সেকেন্ডেই নিজেকে আপডেট করবে।

আমরা clock টি দেখতে কেমন হবে তা encapsulate করার মাধ্যমে শুরু করতে পারিঃ

```js{3-6,12}
function Clock(props) {
  return (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {props.date.toLocaleTimeString()}.</h2>
    </div>
  );
}

function tick() {
  ReactDOM.render(
    <Clock date={new Date()} />,
    document.getElementById('root')
  );
}

setInterval(tick, 1000);
```

[**CodePen এ চালিয়ে দেখুন**](https://codepen.io/gaearon/pen/dpdoYR?editors=0010)

যাহোক, এটি একটি অত্যন্ত গুরুত্বপূর্ণ প্রয়োজন মেটাতে ব্যর্থ হয়ঃ `Clock` এক্ষেত্রে যেভাবে একটি টাইমার সেট-আপ করে এবং প্রতি সেকেন্ড অন্তর UI আপডেট করছে এটা `Clock` কম্পোনেন্টের ভিতরেই সম্পাদন করা উচিত।

আদর্শভাবে আমরা চাইব যাতে এটা একবার লিখার পর `Clock` নিজে নিজে আপডেট হয়ঃ

```js{2}
ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

এটা বাস্তবায়ন করার জন্য `Clock` কম্পোনেন্টে আমরা "state" সংযুক্ত করব।

State অনেকটা props এর মতই, কিন্তু এটি প্রাইভেট এবং কম্পোনেন্ট এটিকে সম্পূর্ণভাবে নিয়ন্ত্রণ করে।

আমরা [আগেও বলেছিলাম](/docs/components-and-props.html#functional-and-class-components), যে কম্পোনেন্টগুলো class হিসেবে ডিক্লেয়ার করা হয় তাদের কিছু বাড়তি ফিচার থাকে। Local state হল এমনি একটি ফিচার যেটি শুধু class কম্পোনেন্টেই থাকে।

## ফাংশনকে ক্লাসে রূপান্তর করা {#converting-a-function-to-a-class}

আপনি `Clock` এর মত একটি ফাংশন কম্পোনেন্টকে পাঁচটি ধাপ অনুসরণ করে ক্লাস কম্পোনেন্টে রূপান্তর করতে পারেনঃ

১. একই নামে একটি [ES6 class](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes) তৈরি করুন যা `React.Component` কে extend করে।

২. এটিতে `render()` নামের একটি খালি মেথড যুক্ত করুন।

৩. ফাংশনের ভেতরের সব কোড এই `render()` মেথডের ভেতরে নিয়ে আসুন।

৪. `render()` মেথডে অবস্থিত সকল `props` কে `this.props` দ্বারা প্রতিস্থাপিত করুন।

৫. আগের ফাংশন কম্পোনেন্টটি মুছে ফেলুন।

```js
class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.props.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

[**CodePen এ চালিয়ে দেখুন**](https://codepen.io/gaearon/pen/zKRGpo?editors=0010)

`Clock` কম্পোনেন্টটি এখন ফাংশন এর পরিবর্তে একটি ক্লাস দ্বারা নির্ধারণ করা হয়েছে।

যতক্ষণ পর্যন্ত আমরা একই নোডে `<Clock />` রেন্ডার করব ততক্ষণ পর্যন্ত প্রতিবার যেকোন ধরণের আপডেটের পর `render` মেথডটি কল করা হবে এবং `Clock` ক্লাসের শুধুমাত্র একটি ইন্সট্যান্স ব্যবহার করা হবে। এটি আমাদেরকে local state এবং lifecycle মেথডের মত কিছু বাড়তি ফিচার ব্যবহার করার সুযোগ করে দেয়।

## ক্লাসে Local State যুক্ত করুন {#adding-local-state-to-a-class}

আমরা `date` কে ৩ ধাপে props থেকে সরিয়ে state এ নিয়ে আসবঃ

১) `render()` মেথডের সকল `this.props.date` কে `this.state.date` দ্বারা প্রতিস্থাপিত করুনঃ

```js{6}
class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

২) একটি [ক্লাস constructor](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes#Constructor) সংযুক্ত করুন যা `this.state` এর প্রাথমিক মান নির্ধারণ করে দেবেঃ

```js{4}
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

খেয়াল করে দেখুন আমরা কিভাবে `props` কে constructor এ পাঠাচ্ছিঃ

```js{2}
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }
```

ক্লাস কম্পোনেন্টগুলোর সবসময়ই base constructor কে `props` সহ কল করা উচিতঃ

৩) `<Clock />` element থেকে `date` prop টি মুছে ফেলুনঃ

```js{2}
ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

আমরা পরে কম্পোনেন্টের মধ্যেই টাইমারের কোডগুলো সংযুক্ত করব।

আমাদের কোড এখন এরকম দেখায়ঃ

```js{2-5,11,18}
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

[**CodePen এ চালিয়ে দেখুন**](https://codepen.io/gaearon/pen/KgQpJd?editors=0010)

এখন আমরা `Clock` কম্পোনেন্ট কে এমনভাবে পরিবর্তন করব যাতে তা নিজের টাইমার নিজে সেট-আপ করতে পারে এবং নিজেকে প্রতি সেকেন্ডে আপডেট করতে পারে।

## ক্লাসে Lifecycle মেথডগুলো সংযুক্ত করা {#adding-lifecycle-methods-to-a-class}

যেসব অ্যাপ্লিকেশনে অনেক কম্পোনেন্ট থাকে, সেগুলোতে কম্পোনেন্ট দ্বারা দখলকৃত রিসোর্স গুলো কম্পোনেন্ট মুছে ফেলার সময় ছেড়ে দেয়া অত্যন্ত গুরুত্বপূর্ণ।

আমরা একটি [টাইমার সেট-আপ](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setInterval) করতে চাই যখন `Clock` কম্পোনেন্টটি DOM এ প্রথমবারের মত রেন্ডার হবে। এই ধাপকে React এর ভাষায় "mounting" বলা হয়।

আবার আমরা এই টাইমারটি ক্লিয়ার করে দিতে চাই যখন `Clock` দ্বারা তৈরিকৃত DOM মুছে ফেলা হবে। এই ধাপকে React এর ভাষায় "unmounting" বলা হয়।

আমরা কম্পোনেন্ট ক্লাসে কিছু স্পেশাল মেথড ডিক্লেয়ার করে কম্পোনেন্ট মাউন্ট এবং আনমাউন্টের সময় কিছু কোড রান করাতে পারিঃ

```js{7-9,11-13}
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

এই মেথডগুলোকে বলা হয় "lifecycle methods"।

componentDidMount() মেথডটি কম্পোনেন্টের আউটপুট DOM এ রেন্ডার করার পর কাজ করে। এটি টাইমার সেট-আপ করার জন্য একটি উপযুক্ত জায়গাঃ

```js{2-5}
  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }
```

খেয়াল করুন কিভাবে আমরা টাইমার এর আইডিকে `this` এর মাধ্যমে সেইভ করে রাখছি। 

`this.props` React নিজেই সেট-আপ করে নেয় এবং `this.state` এর একটি আলাদা অর্থ আছে, আপনার যদি এমন কিছু সংরক্ষণ করে রাখতে হয় যা আপনার ডাটা ফ্লোতে অংশগ্রহণ করবেনা (যেমনঃ একটি টাইমার আইডি), তবে আপনি সেগুলোকে অতিরিক্ত ফিল্ড হিসেবে  ক্লাসে সংযুক্ত করতে পারেন।

আমরা টাইমারটি `componentWillUnmount()` lifecycle মেথডে মুছে ফেলবঃ

```js{2}
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
```

সবশেষে, আমরা `tick()` নামের একটি মেথড `Clock` কম্পোনেন্টে সংযুক্ত করব যা প্রতি সেকেন্ড অন্তর কাজ করে।

এটি `this.setState()` ব্যবহার করে কম্পোনেন্টের local state কে আপডেট করবেঃ

```js{18-22}
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

[**CodePen এ চালিয়ে দেখুন**](https://codepen.io/gaearon/pen/amqdNA?editors=0010)

এখন clock প্রতি সেকেন্ডে নিজে নিজে আপডেট হয়।

আমরা সংক্ষেপে আরেকবার দেখে নেই এখানে কি হচ্ছে এবং মেথডগুলো কোনটার পর কোনটা কল হচ্ছেঃ

১) যখন `ReactDOM.render()` এ `<Clock />` পাস করা হয়, React `Clock` কম্পোনেন্টের constructor কে কল করে। যেহেতু `Clock` এর বর্তমান সময় দেখাতে হবে, এটি `this.state` কে একটি অবজেক্ট এর মাধ্যমে ইনিশিয়ালাইজ করে যা বর্তমান সময় ধারণ করে। আমরা পরে এই state টি আপডেট করব।

২) React এরপর `Clock` কম্পোনেন্টের `render()` মেথডকে কল করে। এটির মাধ্যমেই React জানতে পারে স্ক্রিনে কি দেখাতে হবে। React এরপর DOM আপডেট করে যাতে তা `Clock` এর রেন্ডার আউটপুটের মত হয়।

৩) যখন `Clock` এর আউটপুট DOM এ প্রবেশ করানো হয়, React তখন `componentDidMount()` lifecycle মেথডটি কল করে। এর ভেতরে, `Clock` কম্পোনেন্টটি ব্রাউজারকে নির্দেশ দেয় যাতে তা একটি টাইমার সেট-আপ করে এবং প্রতি সেকেন্ড অন্তর `tick()` মেথডকে কল করে।

৪) প্রতি সেকেন্ডেই ব্রাউজার `tick()` মেথডটিকে কল করে। এর ভেতরে, `Clock` কম্পোনেন্টটি  `setState()` মেথডে বর্তমান সময় ধারণ করে এমন একটি অবজেক্ট এর মাধ্যমে UI আপডেট করে। `setState()` মেথড কল করার কারণে React জানতে পারে যে কম্পোনেন্টটির state পরিবর্তন হয়েছে এবং `render()` মেথডকে আবার কল করে জানতে চায় এরপর স্ক্রিনে কি দেখানো উচিত। এবার, `render()` মেথডের ভেতরের `this.state.date` ভিন্ন হবে, তাই রেন্ডারের আউটপুট নতুন সময়টি দেখাবে। React এই আউটপুট অনুযায়ী DOM আপডেট করে।

৫) যদি `Clock` কম্পোনেন্টটি কখনো DOM থেকে মুছে ফেলা হয়, React `componentWillUnmount()` lifecycle মেথডটি কল করে তাতে টাইমারটি বন্ধ হয়ে যায়।

## State কে সঠিকভাবে ব্যবহার করা {#using-state-correctly}

`setState()` সম্পর্কে ৩টি জিনিস আপনার জানা উচিত।

### State কে সরাসরি পরিবর্তন করবেন না {#do-not-modify-state-directly}

উদাহরণ হিসেবে, এটি একটি কম্পোনেন্টকে রি-রেন্ডার করবেনাঃ

```js
// ভুল
this.state.comment = 'Hello';
```

পরিবর্তে, `setState()` ব্যবহার করুনঃ

```js
// সঠিক
this.setState({comment: 'Hello'});
```

আপনি শুধুমাত্র constructor এই `this.state` সরাসরি পরিবর্তন করতে পারবেন।

### State এর আপডেটগুলো Asynchronous হতে পারে {#state-updates-may-be-asynchronous}

React এর দক্ষতা বাড়ানোর জন্য অনেকগুলো `setState()` কলকে একীভূত করে কম্পোনেন্ট আপডেট করতে পারে।

যেহেতু `this.props` এবং `this.state` asynchronously আপডেট হতে পারে, আপনার এ দুটো মানের উপর নির্ভর করে পরবর্তী state নির্ধারণ করা থেকে বিরত থাকা উচিত।

উদাহরণস্বরূপ, নিচের কোড কাউন্টার আপডেট করতে ব্যর্থ হতে পারেঃ

```js
// ভুল
this.setState({
  counter: this.state.counter + this.props.increment,
});
```

এটিকে শুধরানোর জন্য, আপনি `setState()` ভিন্নভাবে ব্যবহার করতে পারেন যাতে তা একটি অবজেক্ট আর্গুমেন্ট হিসেবে না নিয়ে একটি ফাংশন আর্গুমেন্ট হিসেবে নেয়। এই ফাংশনটি আগের state কে প্রথম আর্গুমেন্ট হিসেবে গ্রহণ করে, এবং আপডেটের সময়কার prop গুলোকে দ্বিতীয় আর্গুমেন্ট হিসেবে নেয়ঃ

```js
// সঠিক
this.setState((state, props) => ({
  counter: state.counter + props.increment
}));
```

আমরা উপরে [এরো ফাংশন](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/Arrow_functions) ব্যবহার করেছি, কিন্তু এটি সাধারণ ফাংশনগুলোর সাথেও কাজ করেঃ

```js
// সঠিক
this.setState(function(state, props) {
  return {
    counter: state.counter + props.increment
  };
});
```

### State এর আপডেটগুলো একীভূত করা হয় {#state-updates-are-merged}

যখন আপনি `setState()` কল করেন, React আপনার দেয়া অবজেক্ট কে বর্তমান state এর সাথে একীভূত করে।

উদাহরণস্বরূপ, আপনার state অনেকগুলো ভ্যরিয়েবল ধারণ করতে পারেঃ

```js{4,5}
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      comments: []
    };
  }
```

আপনি এক্ষেত্রে এগুলোকে আলাদাভাবে `setState()` কল করে আপডেট করতে পারেনঃ

```js{4,10}
  componentDidMount() {
    fetchPosts().then(response => {
      this.setState({
        posts: response.posts
      });
    });

    fetchComments().then(response => {
      this.setState({
        comments: response.comments
      });
    });
  }
```

এই একীভূতকরণ অগভীর, তাই `this.setState({comments})` `this.state.posts` এর কোন পরিবর্তন করেনা, কিন্তু `this.state.comments` কে সম্পূর্ণভাবে প্রতিস্থাপিত করে।

## ডাটা নিচের দিকে যায় {#the-data-flows-down}

কোন কম্পোনেন্ট stateful নাকি stateless তা parent অথবা child কম্পোনেন্টগুলো জানতে পারেনা, এবং কম্পোনেন্টটি ক্লাস হিসেবে নাকি ফাংশন হিসাবে ডিক্লেয়ার করা হয়েছে এটি নিয়ে তাদের চিন্তা করার প্রয়োজন নেই।

এজন্যই অনেকসময় state কে local অথবা encapsulated বলা হয়। এটি শুধুমাত্র ঐ কম্পোনেন্টটি ছাড়া আর অন্য কোন কম্পোনেন্ট দ্বারা পরিবর্তন করা বা পড়া যায়না।

একটি কম্পোনেন্ট তার state কে props হিসেবে এর child কম্পোনেন্টগুলোতে পাস করতে পারেঃ

```js
<h2>It is {this.state.date.toLocaleTimeString()}.</h2>
```

ইউজার-ডিফাইনড কম্পোনেন্টগুলোর ক্ষেত্রেও এটি কাজ করেঃ

```js
<FormattedDate date={this.state.date} />
```

`FormattedDate` কম্পোনেন্টটি props এর মাধ্যমে `date` টি পাবে এবং এটি আদৌ `Clock` এর state থেকে এসেছে, নাকি `Clock` এর props থেকে এসেছে, নাকি সরাসরি হাতে লিখা হয়েছে এ সম্পর্কে এর কোন ধারণা থাকবেনাঃ

```js
function FormattedDate(props) {
  return <h2>It is {props.date.toLocaleTimeString()}.</h2>;
}
```

[**CodePen এ চালিয়ে দেখুন**](https://codepen.io/gaearon/pen/zKRqNB?editors=0010)

এই পদ্ধতিকে সাধারণত "top-down" অথবা "unidirectional" ডাটা ফ্লো বলা হয়। যেকোন state ই কোন না কোন নির্দিষ্ট কম্পোনেন্টের ভেতরে থাকে, এবং state থেকে আসা যেকোন ডাটা অথবা UI শুধুমাত্র ঐ কম্পোনেন্টগুলিতে প্রভাব ফেলতে পারে যেগুলো ট্রিতে ঐ কম্পোনেন্টের "নিচে" অবস্থান করে।

আপনি যদি কম্পোনেন্ট ট্রিকে একটি props এর ঝর্ণার সাথে তুলনা করেন, তাহলে প্রতিটি কম্পোনেন্টের state গুলো হল অনেকটা অতিরিক্ত পানির উৎসের মত যা এই ঝর্ণার সাথে ইচ্ছামত কোন বিন্দুতে মিলিত হয় এবং নিচের দিকে বয়ে যেতে থাকে।

প্রতিটি কম্পোনেন্ট একে অপর থেকে আলাদা এটি দেখানোর জন্য আমরা একটি `App` কম্পোনেন্ট তৈরি করব যা তিনটি `<Clock>` রেন্ডার করেঃ

```js{4-6}
function App() {
  return (
    <div>
      <Clock />
      <Clock />
      <Clock />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```

[**CodePen এ চালিয়ে দেখুন**](https://codepen.io/gaearon/pen/vXdGmd?editors=0010)

প্রতিটি `Clock` নিজের টাইমার সেট-আপ করে এবং নিজে নিজে আপডেট হয়।

React অ্যাপে, একটি কম্পোনেন্ট stateful হবে নাকি stateless হবে তা কম্পোনেন্টটি কিভাবে লিখা হয়েছে তার উপর নির্ভর করে এবং এটি সময়ের সাথে বদলাতেও পারে। আপনি যেমন stateful কম্পোনেন্টের ভেতরে stateless কম্পোনেন্ট ব্যবহার করতে পারেন, তেমনি এর উল্টোটাও করতে পারেন।
