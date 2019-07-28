---
id: react-api
title: React টপ লেভেল API
layout: docs
category: Reference
permalink: docs/react-api.html
redirect_from:
  - "docs/reference.html"
  - "docs/clone-with-props.html"
  - "docs/top-level-api.html"
  - "docs/top-level-api-ja-JP.html"
  - "docs/top-level-api-ko-KR.html"
  - "docs/top-level-api-zh-CN.html"
---

React লাইব্রেরীর একদম শুরুর API হল `React`। আপনি যদি `<script>` ট্যাগ থেকে React লোড করেন, এই টপ লেভেল APIগুলো আপনারা `React` গ্লোবালে পাবেন। আপনি যদি ES6 এর সাথে npm ব্যবহার করে থাকেন, লিখতে পারেন `import React from 'react'`। আপনি যদি ES5 এর সাথে npm ব্যবহার করে থাকেন, লিখতে পারেন `var React = require('react')`। 

## একনজরে {#overview}

### কম্পোনেন্ট {#components}

React কম্পোনেন্টসমূহ আপনার UI কে স্বাধীন পুনর্ব্যবহারযোগ্য বিভিন্ন খন্ডে ভাগ করার এবং বিচ্ছিন্নভাবে প্রতিটি খন্ড নিয়ে আলাদাভাবে ভাবার সুযোগ করে দেয়। `React.Component` বা `React.PureComponent` কে সাবক্লাস করার মাধ্যমে React কম্পোনেন্ট গুলোকে ডিফাইন করা যায়।

 - [`React.Component`](#reactcomponent)
 - [`React.PureComponent`](#reactpurecomponent)

আপনি যদি ES6 ক্লাসসমূহ ব্যবহার না করে থাকেন, তাহলে `create-react-class` মডিউলটি ব্যবহার করতে পারেন। বিস্তারিত জানবার জন্য [ES6 ব্যতীত React ব্যবহার](/docs/react-without-es6.html) লেখাটি দেখতে পারেন। 

React কম্পোনেন্টগুলোকে wrap করা যায় এমন ফাংশন হিসেবেও ডিফাইন করা সম্ভব।
 
- [`React.memo`](#reactmemo)

### React এলিমেন্ট তৈরি করা {#creating-react-elements}

আপনার UI কেমন হবে তা বর্ণনার জন্য আমরা [JSX এর ব্যবহারকে](/docs/introducing-jsx.html) সমর্থন করি। প্রতিটা JSX এলিমেন্ট [`React.createElement()`](#createelement) কে কল করার জন্য একটি ব্যবস্থা মাত্র। আপনি যদি JSX ব্যবহার করে থাকেন, তাহলে সাধারণভাবে নিচের মেথডগুলো ব্যবহার করার প্রয়োজন পড়বে না। 

- [`createElement()`](#createelement)
- [`createFactory()`](#createfactory)

আরো জানবার জন্য [JSX ব্যতীত React ব্যবহার](/docs/react-without-jsx.html) লেখাটি দেখুন।

### এলিমেন্টের ট্রান্সফর্মেশন {#transforming-elements}

`React` এলিমেন্ট বদলে ফেলবার জন্য কয়েকটি API ব্যবহারের সুযোগ দেয়: 

- [`cloneElement()`](#cloneelement)
- [`isValidElement()`](#isvalidelement)
- [`React.Children`](#reactchildren)

### ফ্র্যাগমেন্ট {#fragments}

কয়েকটি এলিমেন্টকে কোনরকম র‍্যাপার(wrapper) ছাড়াই একসাথে রেন্ডার করবার জন্য একটি কম্পোনেন্টের সুবিধা দেয়। 

- [`React.Fragment`](#reactfragment)

### রেফ {#refs}

- [`React.createRef`](#reactcreateref)
- [`React.forwardRef`](#reactforwardref)

### সাসপেন্স {#suspense}

কোন কিছু দেখাবার আগে "অপেক্ষা" করবার জন্য সাসপেন্স ব্যবহার করা যায়। এখন পর্যন্ত সাসপেন্স শুধু মাত্র একটি কাজেই ব্যবহার সম্ভব: [`React.lazy` ব্যবহার করে ডাইনামিকভাবে কম্পোনেন্ট লোড করা।](/docs/code-splitting.html#reactlazy)ভবিষ্যতে, ডেটা আনবার (data fetch) মত কাজেও এটি ব্যবহার করা যাবে।

- [`React.lazy`](#reactlazy)
- [`React.Suspense`](#reactsuspense)

### হুক {#hooks}

*হুক* হচ্ছে React 16.8 এ যোগ হওয়া নতুন ফিচার। এটি আপনাকে কোন ক্লাস না লিখেই স্টেট এবং অন্যান্য বিভিন্ন React ফিচার ব্যবহারের সুযোগ দেয়। হুকের [নিজরই একটি ডক সেকশন](/docs/hooks-intro.html)এবং আলাদা একটি API রেফারেন্স রয়েছে।

- [Basic Hooks](/docs/hooks-reference.html#basic-hooks)
  - [`useState`](/docs/hooks-reference.html#usestate)
  - [`useEffect`](/docs/hooks-reference.html#useeffect)
  - [`useContext`](/docs/hooks-reference.html#usecontext)
- [Additional Hooks](/docs/hooks-reference.html#additional-hooks)
  - [`useReducer`](/docs/hooks-reference.html#usereducer)
  - [`useCallback`](/docs/hooks-reference.html#usecallback)
  - [`useMemo`](/docs/hooks-reference.html#usememo)
  - [`useRef`](/docs/hooks-reference.html#useref)
  - [`useImperativeHandle`](/docs/hooks-reference.html#useimperativehandle)
  - [`useLayoutEffect`](/docs/hooks-reference.html#uselayouteffect)
  - [`useDebugValue`](/docs/hooks-reference.html#usedebugvalue)

* * *

## রেফারেন্স {#reference}

### `React.Component` {#reactcomponent}

React কম্পোনেন্ট যখন [ES6 ক্লাস](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes) ব্যবহার করে ডিফাইন করা হয় তখন মূল ক্লাসটি হয় `React.Component`:

```javascript
class Greeting extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

মূল ক্লাস `React.Component` এর সাথে জড়িত মেথড এবং প্রোপার্টির একটি লিস্ট পেতে [React.Component API রেফারেন্স](/docs/react-component.html) দেখুন।

* * *

### `React.PureComponent` {#reactpurecomponent}

`React.PureComponent` অনেকটা [`React.Component`](#reactcomponent) এর মতই। এদের মধ্যে পার্থক্য হচ্ছে যে, [`React.Component`](#reactcomponent) এর মাঝে [`shouldComponentUpdate()`](/docs/react-component.html#shouldcomponentupdate) কাজ করে না, কিন্তু `React.PureComponent` খুব বেশি গভীরে না এমন প্রপ আর স্টেটে তুলনা ব্যবহার করে কাজে লাগাতে পারে।  

যদি আপনার React কম্পোনেন্ট এর `render()` ফাংশন একই প্রপ এবং স্টেটে সবসময় একই ফলাফল দেখায় তবে কিছু কিছু ক্ষেত্রে অ্যাপ্লিকেশনের দক্ষতা বৃদ্ধির জন্য আপনি `React.PureComponent` ব্যবহার করতে পারেন। 

> নোট
>
> `React.PureComponent`এর `shouldComponentUpdate()` খুব অগভীরভাবে অব্জেক্টের মধ্যে তুলনা করে। যদি এদের মধ্যে জটিল ডেটা স্ট্রাকচার থাকে তবে, হায়ারার্কি ট্রির খুব গভীরে থাকা কোন অসমতার জন্য ফলস-নেগেটিভ ফলাফল দিতে পারে। যখন আপনার প্রপ এবং স্টেট একদম সরল হবে তখনই শুধুমাত্র `PureComponent` এক্সটেন্ড করবেন। আর যদি আপনি জেনে থাকেন ডেটা স্ট্রাকচারের গভীরে কিছু পরিবর্তন হয়ে আছে তবে [`forceUpdate()`](/docs/react-component.html#forceupdate) ব্যবহার করুন। অথবা, খুব দ্রুত এ ধরণের নেস্টেড ডেটা তুলনা করবার জন্য [immutable objects](https://facebook.github.io/immutable-js/) ব্যবহার করতে পারেন।
>
> এছাড়াও, `React.PureComponent` এর `shouldComponentUpdate()` পুরো কম্পোনেন্ট সাবট্রি জুড়েই প্রপ এর যেকোন পরিবর্তনকে অগ্রাহ্য করে। নিশ্চিত করুন যে প্রতিটা চাইল্ড কম্পোনেন্ট ও "পিওর"।

* * *

### `React.memo` {#reactmemo}

```javascript
const MyComponent = React.memo(function MyComponent(props) {
  /* প্রপ ব্যবহার করে রেন্ডার */
});
```

`React.memo` হচ্ছে একটি [উঁচু স্তরের কম্পোনেন্ট](/docs/higher-order-components.html). এটা [`React.PureComponent`](#reactpurecomponent) এর মতোই তবে শুধু ফাংশন কম্পোনেন্ট এর জন্য, ক্লাসের জন্য নয়। 

যদি আপনার ফাংশন কম্পোনেন্ট একই প্রপের জন্য একই ফলাফল দিয়ে থাকে, তাহলে আপনি একে `React.memo` এর জন্য একটি কল এ wrap করে ফেলতে পারেন। এটি  কিছু কিছু ক্ষেত্রে ফলাফলগুলোকে মনে রাখার মাধ্যমে(memoizing) অ্যাপ্লিকেশনের কার্যক্ষমতা বাড়িয়ে দিতে পারে। অর্থাৎ, React বার বার কম্পোনেন্টটি রেন্ডার না করে সর্বশেষ রেন্ডার করা ফলাফল মনে রাখবে। 

স্বাভাবিকভাবে, এটা অগভীরভাবে প্রপ্স অবজেক্টে জটিল অবজেক্টগুলোকে তুলনা করবে। যদি আপনি এই তুলনার উপরে কর্তৃত্ব চান, তাহলে আপনি দ্বিতীয় আর্গুমেন্ট হিসেবে আপনার নিজের বানানো একটি ফাংশন লিখে দিতে পারেন। 

```javascript
function MyComponent(props) {
  /* প্রপ ব্যবহার করে রেন্ডার */
}
function areEqual(prevProps, nextProps) {
  /*
  যদি nextProps এবং prevProps কে রেন্ডার করার জন্য পাস করা হয়
  এবং তা একই ফলাফল দেয় তবে true হবে
  অন্যথায় false হবে
  */
}
export default React.memo(MyComponent, areEqual);
```

এই মেথডটি শুধুমাত্র একটি **[পারফরমেন্স অপ্টিমাইজেশন](/docs/optimizing-performance.html)** হিসেবে রয়েছে। রেন্ডারিং থামাবার জন্য এটি ব্যবহার করবেন না। কারণ, পরবর্তীতে সেটা বিভিন্ন বাগ এর কারণ হিসেবে ধরা পড়তে পারে।

> নোট
>
> ক্লাস কম্পোনেন্টের জন্য `areEqual` ফাংশনটি [`shouldComponentUpdate()`](/docs/react-component.html#shouldcomponentupdate) ফাংশনের ঠিক উলটো। `areEqual` ফাংশনটি প্রপ সমান হলে `true` এবং অসমান হলে `false` রিটার্ন করে।

* * *

### `createElement()` {#createelement}

```javascript
React.createElement(
  type,
  [props],
  [...children]
)
```

এটা নির্দিষ্ট ধরণের একটি নতুন [React এলিমেন্ট](/docs/rendering-elements.html) বানাতে এবং রিটার্ন করতে পারে। টাইপ আর্গুমেন্টটি হতে পারে কোন ট্যাগ নেম স্ট্রিং (ক্লাস বা ফাংশন), অথবা একটি [React ফ্র্যাগমেন্ট](#reactfragment) টাইপ, অথবা একটি [React কম্পোনেন্ট](/docs/components-and-props.html) টাইপ। 

[JSX](/docs/introducing-jsx.html) দিয়ে লেখা কোড `React.createElement()` ব্যবহার করবার জন্য রূপান্তরিত হয়ে যাবে। আপনি JSX ব্যবহার করে থাকলে সাধারণত `React.createElement()` সরাসরি ব্যবহার করবেন না। আরো জানবার জন্য [JSX ব্যতীত React](/docs/react-without-jsx.html) পেইজটি দেখুন। 

* * *

### `cloneElement()` {#cloneelement}

```
React.cloneElement(
  element,
  [props],
  [...children]
)
```

এটি একটি নতুন React এলিমেন্ট তৈরি করে, যার শুরুতে `element` থাকে। এর ফলে যে এলিমেন্টটি পাওয়া যাবে, মূল এলিমেন্টের প্রপ থাকবে এবং সাথে নতুন প্রপগুলো অগভীরভাবে যুক্ত করা থাকবে। আগের চাইল্ডগুলোকে নতুন চাইল্ডগুলো প্রতিস্থাপন করবে।মূল এলিমেন্টের  `key` এবং `ref` সুরক্ষিত থাকবে।

`React.cloneElement()` অনেকটাই নিচের অংশের সমতুল্য:

```js
<element.type {...element.props} {...props}>{children}</element.type>
```

তবে এটি `ref`গুলোকেও সুরক্ষিত রাখে। অর্থাৎ, আপনি যদি একটি চাইল্ড পান যার মধ্যে `ref` আছে, তাহলে আপনি দুর্ঘটনাবশত হায়ারার্কিতে তার উপরের কোন কম্পোনেন্ট থেকে চুরি করবেন না। আপনার নতুন এলিমেন্টেও আপনি একই `ref` যুক্ত অবস্থায় পাবেন। 

নির্মাতারা যখন `React.addons.cloneWithProps()` API টি রাখতে নারাজ ছিলেন তখন এই `React.cloneElement()` API টি তার বদলি হিসেবে প্রতিষ্ঠা পায়।

* * *

### `createFactory()` {#createfactory}

```javascript
React.createFactory(type)
```

এটি এমন একটি ফাংশন রিটার্ন করে যা কোন নির্দিষ্ট React এলিমেন্ট তৈরি করে। [`React.createElement()`](#createelement) এর মত টাইপ আর্গুমেন্টটি হতে পারে কোন ট্যাগ নেম স্ট্রিং (ক্লাস বা ফাংশন), অথবা একটি [React ফ্র্যাগমেন্ট](#reactfragment) টাইপ, অথবা একটি [React কম্পোনেন্ট](/docs/components-and-props.html) টাইপ।

এই হেল্পারটিকে লেগাসি হিসেবে ধরা হয়, এবং JSX ব্যবহার করা অথবা `React.createElement()` এর মধ্যে যেকোন একটি করাকে আমরা সমর্থন করি। 

আপনি JSX ব্যবহার করে থাকলে সাধারণত `React.createFactory()` সরাসরি ব্যবহার করবেন না। আরো জানবার জন্য [JSX ব্যতীত React](/docs/react-without-jsx.html) পেইজটি দেখুন।

* * *

### `isValidElement()` {#isvalidelement}

```javascript
React.isValidElement(object)
```

কোন একটি অবজেক্ট React এলিমেন্ট কিনা তা বের করার জন্য ব্যবহার করা হয়। এটি `true` অথবা `false` রিটার্ন করে। 

* * *

### `React.Children` {#reactchildren}

`React.Children` API টি `this.props.children` এর মত অস্বচ্ছ ডেটা স্ট্রাকচারকে মোকাবেলা করবার জন্য দরকারি ফিচারসমূহ সরবরাহ করে। 

#### `React.Children.map` {#reactchildrenmap}

```javascript
React.Children.map(children, function[(thisArg)])
```

এটি হায়ারার্কিতে ঠিক পরের ধাপের প্রতিটি চাইল্ড যার `this` এর মান `thisArg` ঠিক করা আছে, সেগুলোর উপরে ফাংশন ইনভোক করে। যদি `children` একটা অ্যারে হয়, তাহলে এটি পুরো অ্যারের উপর প্রতিটি চাইল্ড এর জন্য চলবে। যদি চিল্ড্রেন `null` বা `undefined` হয় তাহলে এই মেথডটি অ্যারে রিটার্ন না করে `null` বা `undefined` রিটার্ন পাঠাবে। 

> নোট
>
> যদি `children` একটি `Fragment` হয়, তাহলে একে একটি সিংগল চাইল্ড হিসেবে ধরা হবে। এবং, এর উপরে ট্রাভার্স করা হবে না। 

#### `React.Children.forEach` {#reactchildrenforeach}

```javascript
React.Children.forEach(children, function[(thisArg)])
```

এটি [`React.Children.map()`](#reactchildrenmap) এর মতোই, তবে কোন অ্যারে রিটার্ন করে না। 

#### `React.Children.count` {#reactchildrencount}

```javascript
React.Children.count(children)
```

`children` এ থাকা কম্পোনেন্ট এর সংখ্যা রিটার্ন করে যা মূলত `map` বা `forEach` এ পাঠানো কলব্যাকগুলোর ইনভোক হবার সংখ্যার সমান।  

#### `React.Children.only` {#reactchildrenonly}

```javascript
React.Children.only(children)
```

Verifies that `children` has only one child (a React element) and returns it. Otherwise this method throws an error. `children` এর শুধুমাত্র একটি চাইল্ড(একটি React এলিমেন্ট) আছে কি না দেখে, এবং থাকলে তা রিটার্ন করে। না থাকলে এরর দেখায়।  

> নোট:
>
> [`React.Children.map()`](#reactchildrenmap) এর রিটার্ন করা মান `React.Children.only()` গ্রহণ করে না কারণ এটি একটি আরে। এটি কোন React এলিমেন্ট নয়।

#### `React.Children.toArray` {#reactchildrentoarray}

```javascript
React.Children.toArray(children)
```

এটি অস্বচ্ছ ডেটা স্ট্রাকচার `children` কে ফ্ল্যাট অ্যারে হিসেবে রিটার্ন করে। যেখানে প্রতিটা চাইল্ড এর সাথে key যুক্ত করা থাকে। এটি তখন কাজে লাগে যখন আপনি আপনার রেন্ডার মেথডে চিল্ড্রেন এর কালেকশনে পরিবর্তন ঘটাতে চান। আরো বিশেষভাবে তখন, যখন   `this.props.children` কে ট্রিতে নিচের দিকে পাঠিয়ে দেবার আগে আবার সাজাতে চান বা স্লাইস করতে চান।  

> নোট:
>
> যখন চিল্ড্রেন এর লিস্ট ফ্ল্যাট করে ফেলে, তখন নেস্টেড (nested) অ্যারেগুলোর ভাষা ঠিক রাখবার জন্য key গুলো সুরক্ষিত রাখে। অর্থাৎ, যে অ্যারেটা রিটার্ন করা হয়, তার প্রতিটা কি এর আগে `toArray` প্রিফিক্স হিসেবে থাকে। এর ফলে প্রতিটা এলিমেন্ট যেই ইনপুট অ্যারেতে আছে, ওই এলিমেন্ট এর কি তার সাথেই সংযুক্ত থাকে। 

* * *

### `React.Fragment` {#reactfragment}

`React.Fragment` কম্পোনেন্টটি কোনরকম DOM এলিমেন্ট তৈরি না করেই একটি `render()` মেথডে একাধিক এলিমেন্ট রিটার্ন করার সুযোগ দেয়। 

```javascript
render() {
  return (
    <React.Fragment>
      Some text.
      <h2>A heading</h2>
    </React.Fragment>
  );
}
```

আপনি একই কাজ `<></>` শর্টহ্যান্ড (shorthand) ব্যবহার করেও করতে পারেন। এ বিষয়ে আরো জানতে [React v16.2.0: ফ্র্যাগমেন্টের জন্য উন্নততর সাপোর্ট](/blog/2017/11/28/react-v16.2.0-fragment-support.html) পৃষ্ঠাটি দেখুন। 


### `React.createRef` {#reactcreateref}

`React.createRef` একটি [ref](/docs/refs-and-the-dom.html) তৈরি করে যা রেফ এট্ট্রিবিউট ব্যবহার করে বিভিন্ন React এলিমেন্টের সাথে যুক্ত করা যায়। 
`embed:16-3-release-blog-post/create-ref-example.js`

### `React.forwardRef` {#reactforwardref}

`React.forwardRef` যে [রেফ](/docs/refs-and-the-dom.html) এট্ট্রিবিউট পায় (recieve করে), সেটাকে ট্রি এর ন্নিচের অন্য একটি কম্পোনেন্ট এ পাঠাবার জন্য একটি কম্পোনেন্ট তৈরি করে। এই বুদ্ধিটা খুব একটা ব্যবহৃত হয় না, তবে দুইটা বিশেষ দৃশ্যকল্পের জন্য এটি খুব কাজের:  

* [DOM কম্পোনেন্ট এ রেফ পাঠানো](/docs/forwarding-refs.html#forwarding-refs-to-dom-components)
* [হায়ার-অর্ডার-কম্পোনেন্ট এ রেফ পাঠানো ](/docs/forwarding-refs.html#forwarding-refs-in-higher-order-components)

`React.forwardRef` রেন্ডারিং ফাংশনকে একটা আর্গুমেন্ট হিসেবে গ্রহণ করে। React `props` এবং `ref` কে দুইটি আর্গুমেন্ট হিসেবে ব্যবহার করে এই ফাংশনকে কল করবে। সেক্ষেত্রে এই ফাংশনের একটি React নোড রিটার্ন করবার কথা। 

`embed:reference-react-forward-ref.js`

উপরের এই উদাহরণে, React`React.forwardRef` এর মধ্যে থাকা রেন্ডারিং ফাংশনের দ্বিতীয় আর্গুমেন্ট হিসেবে একটি `ref` পাঠায় যা `<FancyButton ref={ref}>` এলিমেন্টে দেওয়া আছে। আবার এই রেন্ডারিং ফাংশনটি `<button ref={ref}>` এলিমেন্টে `ref` টি পাঠিয়ে দেয়। 

As a result, after React attaches the ref, `ref.current` will point directly to the `<button>` DOM element instance. ফলস্বরূপ, React রেফ যুক্ত করলে `ref.current` সরাসরি `<button>` DOM এলিমেন্টটিকে নির্দেশ করবে। 

For more information, see [forwarding refs](/docs/forwarding-refs.html). আরো তথ্যের জন্য [রেফ ফরোয়ার্ড](/docs/forwarding-refs.html) প 

### `React.lazy` {#reactlazy}

`React.lazy()` আপনাকে একটি কম্পোনেন্ট ডিফাইন করতে দিবে যা ডাইনামিকভাবে লোড হয়। প্রথম রেন্ডার এর সময় কিছু কম্পোনেন্ট ব্যবহৃত হয় না। কিন্তু এগুলো লোড করতে কিছু সময় নষ্ট হয়। `React.lazy()` এই বান্ডলের আকারটি কমিয়ে এনে লোড আরো দ্রুততর করে। 

এটা ব্যবহার করা আপনি আমাদের [কোড স্প্লিটিং ডকুমেন্টেশন](/docs/code-splitting.html#reactlazy) থেকে শিখে নিতে পারেন। আরো বিস্তারিত জানবার জন্য [এই আর্টিকেলটি](https://medium.com/@pomber/lazy-loading-and-preloading-components-in-react-16-6-804de091c82d) পড়ে দেখতে পারেন। 

```js
// এই কম্পোনেন্ট ডাইনামিকভাবে লোড হয়েছে।
const SomeComponent = React.lazy(() => import('./SomeComponent'));
```

খেয়াল করে দেখবেন, `lazy` কম্পোনেন্ট ব্যবহার করবার জন্য রেন্ডারিং ট্রিতে উপরের দিকে কোথাও এক জায়গায়  `<React.Suspense>` কম্পোনেন্টটি থাকা দরকার। এর সাহায্যে আপনি লোড করা হচ্ছে কি না তার একটা নির্দেশক ঠিক করে ফেলতে পারেন।

> **নোট**
>
> ডাইনামিক ইম্পোর্ট এর সাথে `React.lazy` ব্যবহারের জন্য আপনার জাভাস্ক্রিপ্ট এনভায়রনমেন্টে Promises থাকা জরুরী। IE11 বা তার নিচে কোথাও একটি polyfill থাকতে হবে। 

### `React.Suspense` {#reactsuspense}

`React.Suspense` আপনাকে লোডিং এর একটি নির্দেশক(loading indicator) ঠিক করে দেবার সুযোগ দিবে। এর প্রয়োজন পড়বে যদি এর নিচে ট্রিতে কোথাও এমন একটি কম্পোনেন্ট থাকে যা রেন্ডারিং এর জন্য তৈরি না। এখন পর্যন্ত, `<React.Suspense>` সমর্থিত একমাত্র ব্যবহারযোগ্য অবস্থা হল এই lazy loading components:

```js
// এই কম্পোনেন্ট ডাইনামিকভাবে লোড হয়েছে।
const OtherComponent = React.lazy(() => import('./OtherComponent'));

function MyComponent() {
  return (
    // যতক্ষণ না OtherComponent লোড হচ্ছে ডিস্প্লেতে <Spinner> দেখায়।
    <React.Suspense fallback={<Spinner />}>
      <div>
        <OtherComponent />
      </div>
    </React.Suspense>
  );
}
```

আমাদের [কোড স্প্লিটিং ডকুমেন্টেশন](/docs/code-splitting.html#reactlazy) এ এটি ব্যখ্যা করা আছে। লক্ষ্য করুন, `lazy` কম্পোনেন্টগুলো `Suspense` ট্রি এর খুব গভীরে অবস্থান করে থাকতে পারে। এদের প্রত্যেকটাকে wrap করবার কোন প্রয়োজন নেই। সবচেয়ে ভাল অভ্যাস হচ্ছে, লোড হবার নির্দেশক (loading indicator) যেখানে দরকার সেখানে `<Suspense>` ব্যবহার করা এবং যেখানে কোড স্প্লিটিং করা দরকার সেখানে `lazy()` ব্যবহার করা। 

ভবিষ্যতে আমরা `Suspense` এর সাহায্যে ডাটা ফেচ করবার মত বিভিন্ন অবস্থা নিয়ন্ত্রণ করার ব্যবস্থা করতে চাই, যা এখনো সম্ভব নয়। আমাদের পরিকল্পনা সম্বন্ধে আরো জানতে [আমাদের রোডম্যাপ](/blog/2018/11/27/react-16-roadmap.html) দেখুন।

>নোট:
>
>`ReactDOMServer` এখনো পর্যন্ত `React.lazy()` এবং `<React.Suspense>` কে সমর্থন করে না। এটি একটি পরিচিত সীমাবদ্ধতা যেখান থেকে ভবিষ্যতে আমরা বেরিয়া আসতে পারব বলে বিশ্বাস করি। 
