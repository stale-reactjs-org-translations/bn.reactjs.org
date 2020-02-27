---
id: composition-vs-inheritance
title: কম্পোজিশন বনাম ইনহ্যারিটেন্স
permalink: docs/composition-vs-inheritance.html
redirect_from:
  - "docs/multiple-components.html"
prev: lifting-state-up.html
next: thinking-in-react.html
---

React এর একটি শক্তিশালী কম্পোজিশন মডেল রয়েছে এবং আমরা কোড পুনরায় ব্যবহারের জন্য ইনহ্যারিট্যান্সের পরিবর্তে কম্পোজিশন ব্যবহার করার পরামর্শ দিয়ে থাকি।

যেসব ডেভেলপাররা React এ নতুন, তারা অনেকসময় ইনহ্যারিটেন্স ব্যবহার করতে গিয়ে কিছু সমস্যার সম্মুখীন হয়, এই অনুচ্ছেদে আমরা এমন কিছু সমস্যা নিয়ে আলোচনা করব এবং কিভাবে এই সমস্যাগুলো কম্পোজিশনের মাধ্যমে সমাধান করতে পারি তা দেখাব।

## নিয়ন্ত্রণ {#containment}

কিছু কিছু কম্পোনেন্ট তাদের children কি হবে তা আগে থেকে জানতে পারেনা। এটি `Sidebar` অথবা `Dialog` এর মত কম্পোনেন্টের ক্ষেত্রে সাধারণ ব্যাপার যা কিছু generic "বক্স" কে চিত্রিত করে।

আমরা এসব কম্পোনেন্টের ক্ষেত্রে `children` prop ব্যবহার করে children element গুলো সরাসরি তাদের আউটপুটে পাঠানোর পরামর্শ দেইঃ

```js{4}
function FancyBorder(props) {
  return (
    <div className={'FancyBorder FancyBorder-' + props.color}>
      {props.children}
    </div>
  );
}
```

এটি অন্যান্য কম্পোনেন্টগুলোকে JSX nesting এর মাধ্যমে ইচ্ছামত children পাস করতে সাহায্য করেঃ

```js{4-9}
function WelcomeDialog() {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        Welcome
      </h1>
      <p className="Dialog-message">
        Thank you for visiting our spacecraft!
      </p>
    </FancyBorder>
  );
}
```

**[CodePen এ চালিয়ে দেখুন](https://codepen.io/gaearon/pen/ozqNOV?editors=0010)**

`<FancyBorder>` JSX এর ভেতরের সবকিছু `FancyBorder` কম্পোনেন্টে একটি `children` prop হিসেবে পাস হয়। যেহেতু `FancyBorder` একটি `<div>` এর ভেতরে `{props.children}` রেন্ডার করে, সেহেতু পাস করা element গুলো সর্বশেষ আউটপুটে প্রদর্শিত হয়।

যদিও এটি বিরল, মাঝেমধ্যে একটি কম্পোনেন্টের ভেতর আপনার একাধিক "hole" এর প্রয়োজন হতে পারে। এসব ক্ষেত্রে আপনি `children` ব্যবহারের পরিবর্তে আপনার নিজের মত করে একটি সমাধান বের করতে পারেনঃ

```js{5,8,18,21}
function SplitPane(props) {
  return (
    <div className="SplitPane">
      <div className="SplitPane-left">
        {props.left}
      </div>
      <div className="SplitPane-right">
        {props.right}
      </div>
    </div>
  );
}

function App() {
  return (
    <SplitPane
      left={
        <Contacts />
      }
      right={
        <Chat />
      } />
  );
}
```

[**CodePen এ চালিয়ে দেখুন**](https://codepen.io/gaearon/pen/gwZOJp?editors=0010)

`<Contacts />` এবং `<Chat />` এর মত React element গুলো শুধুই অবজেক্ট, তাই আপনি এদেরকে অন্যান্য যেকোন ডাটার মতই prop হিসেবে পাস করতে পারেন। এই সমাধান আপনাকে অন্যান্য লাইব্রেরির "slots" এর কথা মনে করিয়ে দিতে পারে কিন্তু React এ আপনি prop হিসেবে কি পাস করতে পারবেন এ ব্যাপারে কোন বাঁধাধরা নিয়ম নেই।

## স্পেশিয়ালাইজেশন {#specialization}

অনেক সময় আমরা কম্পোনেন্টকে অন্যান্য কম্পোনেন্টের "special case" হিসেবে চিন্তা করি। উদাহরণস্বরূপ, আমরা বলতে পারি `WelcomeDialog` হল `Dialog` এর একটি special case।

React-এ, এটি কম্পোজিশনের মাধ্যমেও অর্জন করা যায়, যেখানে একটি অধিক "নির্দিষ্ট" কম্পোনেন্ট একটি "generic" কম্পোনেন্টকে রেন্ডার করে এবং props এর মাধ্যমে তাকে কনফিগার করেঃ

```js{5,8,16-18}
function Dialog(props) {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        {props.title}
      </h1>
      <p className="Dialog-message">
        {props.message}
      </p>
    </FancyBorder>
  );
}

function WelcomeDialog() {
  return (
    <Dialog
      title="Welcome"
      message="Thank you for visiting our spacecraft!" />
  );
}
```

[**CodePen এ চালিয়ে দেখুন**](https://codepen.io/gaearon/pen/kkEaOZ?editors=0010)

ক্লাস দ্বারা নির্ধারণকৃত কম্পোনেন্টগুলোর ক্ষেত্রেও কম্পোজিশন একইভাবে ভাল কাজ করেঃ

```js{10,27-31}
function Dialog(props) {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        {props.title}
      </h1>
      <p className="Dialog-message">
        {props.message}
      </p>
      {props.children}
    </FancyBorder>
  );
}

class SignUpDialog extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.state = {login: ''};
  }

  render() {
    return (
      <Dialog title="Mars Exploration Program"
              message="How should we refer to you?">
        <input value={this.state.login}
               onChange={this.handleChange} />
        <button onClick={this.handleSignUp}>
          Sign Me Up!
        </button>
      </Dialog>
    );
  }

  handleChange(e) {
    this.setState({login: e.target.value});
  }

  handleSignUp() {
    alert(`Welcome aboard, ${this.state.login}!`);
  }
}
```

[**CodePen এ চালিয়ে দেখুন**](https://codepen.io/gaearon/pen/gwZbYa?editors=0010)

## তাহলে ইনহ্যারিটেন্স কখন ব্যবহার করব? {#so-what-about-inheritance}

Facebook এ, আমরা হাজার হাজার কম্পোনেন্টে React ব্যবহার করি, এবং আমরা এমন কোন use case পাইনি যেখানে আমরা কম্পোনেন্ট ইনহ্যারিটেন্স ব্যবহারের পরামর্শ দেব।

Props এবং কম্পোজিশন আপনাকে স্পষ্ট এবং নিরাপদভাবে সব ধরণের flexibility প্রদান করে যা একটি কম্পোনেন্টের বাহ্যিক চেহারা অথবা আচরণ কাস্টমাইজ করতে প্রয়োজন। মনে রাখবেন, কম্পোনেন্ট মৌলিক মান, React element অথবা ফাংশন সহ ইচ্ছামত props গ্রহণ করতে পারে।

আপনি যদি কম্পোনেন্টেগুলোর মাঝে নন-ইউজার-ইন্টারফেস ফাংশন ব্যবহার করতে চান, আমরা একে একটি আলাদা জাভাস্ক্রিপ্ট মডিউলে পৃথকভাবে নিয়ে আসার পরামর্শ দেব। কম্পোনেন্টগুলো এটি extend করা ছাড়াই এই ফাংশন, অবজেক্ট অথবা ক্লাস ইম্পোর্ট করার মাধ্যমে ব্যবহার করতে পারে।
