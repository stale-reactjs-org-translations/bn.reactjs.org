---
id: react-without-jsx
title: JSX ছাড়া React 
permalink: docs/react-without-jsx.html
---

React ব্যবহারের ক্ষেত্রে JSX আবশ্যক নয়। JSX ছাড়া React ব্যবহার করা বিশেষভাবে সুবিধাজনক যখন আপনি আপনার বিল্ড ইনভায়রনমেন্টে কম্পাইলেশন সেটআপ করতে চাননা।

প্রতিটি JSX element মূলত `React.createElement(component, props, ...children)` কল করার একটি syntactic sugar। তাই, আপনি JSX দিয়ে যা করতে পারবেন তা শুধুমাত্র জাভাস্ক্রিপ্ট ব্যবহার করেও করা সম্ভব।

উদাহরণস্বরূপ, এই কোডটি JSX সহ লিখা হয়েছেঃ

```js
class Hello extends React.Component {
  render() {
    return <div>Hello {this.props.toWhat}</div>;
  }
}

ReactDOM.render(
  <Hello toWhat="World" />,
  document.getElementById('root')
);
```

যা কম্পাইল করে এই কোড পাওয়া যায় যা JSX ব্যবহার করেনাঃ

```js
class Hello extends React.Component {
  render() {
    return React.createElement('div', null, `Hello ${this.props.toWhat}`);
  }
}

ReactDOM.render(
  React.createElement(Hello, {toWhat: 'World'}, null),
  document.getElementById('root')
);
```

আপনি যদি JSX কিভাবে জাভাস্ক্রিপ্টে রূপান্তরিত হয় এ ব্যাপারে কৌতূহলী হয়ে থাকেন, তাহলে আপনি [Babel এর অনলাইন কম্পাইলার](babel://jsx-simple-example) চালিয়ে দেখতে পারেন।

কম্পোনেন্টটি একটি স্ট্রিং, অথবা `React.Component` এর একটি সাবক্লাস, অথবা একটি সাধারণ ফাংশন হিসেবে সরবরাহ করা যায়।

আপনি যদি বারবার `React.createElement` টাইপ করতে করতে ক্লান্ত হয়ে পড়েন, এক্ষেত্রে একটি সাধারণ প্যাটার্ন হল একটি সংক্ষিপ্ত নাম এসাইন করে দেয়াঃ

```js
const e = React.createElement;

ReactDOM.render(
  e('div', null, 'Hello World'),
  document.getElementById('root')
);
```

আপনি যদি `React.createElement` এর এই সংক্ষিপ্ত নাম ব্যবহার করেন, তাহলে এটি JSX এর React ব্যবহার অনেকটাই সুবিধাজনক করে তোলে।

অন্যথায়, আপনি [`react-hyperscript`](https://github.com/mlmorg/react-hyperscript) এবং [`hyperscript-helpers`](https://github.com/ohanhi/hyperscript-helpers) যা একটি terser syntax প্রদান করে এর মত কমিউনিটি প্রজেক্টগুলো দেখতে পারেন।

