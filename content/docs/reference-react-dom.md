---
id: react-dom
title: ReactDOM
layout: docs
category: Reference
permalink: docs/react-dom.html
---

<<<<<<< HEAD
আপনি যদি `<script>` ট্যাগ দিয়ে React লোড করেন, তাহলে গ্লোবাল ভ্যারিয়েবল `ReactDOM` এ নিচের top-level API গুলো পাওয়া যাবে। আপনি যদি npm এর মাধ্যমে ES6 ব্যবহার করতে চান তাহলে আপনি এভাবে লিখতে পারেন `import ReactDOM from 'react-dom'`। অথবা আপনি যদি npm এর মাধ্যমে ES5 ব্যবহার করতে চান তাহলে আপনি এভাবে লিখতে পারেন `var ReactDOM = require('react-dom')`।
=======
The `react-dom` package provides DOM-specific methods that can be used at the top level of your app and as an escape hatch to get outside the React model if you need to.

```js
import * as ReactDOM from 'react-dom';
```

If you use ES5 with npm, you can write:

```js
var ReactDOM = require('react-dom');
```

The `react-dom` package also provides modules specific to client and server apps:
- [`react-dom/client`](/docs/react-dom-client.html)
- [`react-dom/server`](/docs/react-dom-server.html)
>>>>>>> c7d858947f832d1ba4e78caebc391fd964ff6de6

## সারমর্ম {#overview}

<<<<<<< HEAD
`react-dom` package আপনাকে DOM সম্পর্কিত কিছু মেথড প্রদান করে যা আপনি আপনার অ্যাপের top-level এ ব্যবহার করতে পারেন এবং যে কোন পরিস্থিতিতে আপনি দরকার মত React মডেল থেকে বেরিয়ে আসতে পারবেন। আপনার অধিকাংশ কম্পোনেন্ট এরই এই মডিউল এর প্রয়োজন হবেনা।
=======
The `react-dom` package exports these methods:
- [`createPortal()`](#createportal)
- [`flushSync()`](#flushsync)
>>>>>>> c7d858947f832d1ba4e78caebc391fd964ff6de6

These `react-dom` methods are also exported, but are considered legacy:
- [`render()`](#render)
- [`hydrate()`](#hydrate)
- [`findDOMNode()`](#finddomnode)
- [`unmountComponentAtNode()`](#unmountcomponentatnode)

> Note: 
> 
> Both `render` and `hydrate` have been replaced with new [client methods](/docs/react-dom-client.html) in React 18. These methods will warn that your app will behave as if it's running React 17 (learn more [here](https://reactjs.org/link/switch-to-createroot)).

### ব্রাউজার সাপোর্ট {#browser-support}

<<<<<<< HEAD
React ইন্টারনেট এক্সপ্লোরার ৯ সহ সব জনপ্রিয় ব্রাউজারই সাপোর্ট করে, যদিও ইন্টারনেট এক্সপ্লোরার ৯ এবং ইন্টারনেট এক্সপ্লোরার ১০ এর জন্য [কিছু পলিফিল এর প্রয়োজন](/docs/javascript-environment-requirements.html)।
=======
React supports all modern browsers, although [some polyfills are required](/docs/javascript-environment-requirements.html) for older versions.
>>>>>>> c7d858947f832d1ba4e78caebc391fd964ff6de6

> বিঃদ্রঃ
>
<<<<<<< HEAD
> আমরা পুরনো ব্রাউজার গুলো সাপোর্ট করিনা যাতে ES5 মেথড এর সাপোর্ট নেই, কিন্তু আপনি হয়তো দেখবেন আপনার অ্যাপটি পুরনো ব্রাউজারেও ঠিকমতই চলছে যদি আপনি [es5-shim এবং es5-sham](https://github.com/es-shims/es5-shim) এর মত পলিফিল গুলো আপনার পৃষ্ঠায় সংযুক্ত করেন। আপনি এই পথ বেছে নিতে চান কিনা তা আপনার উপর নির্ভর করছে।

* * *
=======
> We do not support older browsers that don't support ES5 methods or microtasks such as Internet Explorer. You may find that your apps do work in older browsers if polyfills such as [es5-shim and es5-sham](https://github.com/es-shims/es5-shim) are included in the page, but you're on your own if you choose to take this path.
>>>>>>> c7d858947f832d1ba4e78caebc391fd964ff6de6

## রেফারেন্স {#reference}

### `createPortal()` {#createportal}

```javascript
createPortal(child, container)
```

<<<<<<< HEAD
এই মেথড React element কে সরবরাহকৃত DOM এর `container` এ রেন্ডার করে এবং এবং তার একটি [রেফারেন্স](/docs/more-about-refs.html) কম্পোনেন্টে রিটার্ন করে(অথবা [stateless কম্পোনেন্ট](/docs/components-and-props.html#function-and-class-components) এর জন্য `null` রিটার্ন করে)।
=======
Creates a portal. Portals provide a way to [render children into a DOM node that exists outside the hierarchy of the DOM component](/docs/portals.html).

### `flushSync()` {#flushsync}

```javascript
flushSync(callback)
```

Force React to flush any updates inside the provided callback synchronously. This ensures that the DOM is updated immediately.

```javascript
// Force this state update to be synchronous.
flushSync(() => {
  setCount(count + 1);
});
// By this point, DOM is updated.
```

> Note:
> 
> `flushSync` can significantly hurt performance. Use sparingly.
> 
> `flushSync` may force pending Suspense boundaries to show their `fallback` state.
> 
> `flushSync` may also run pending effects and synchronously apply any updates they contain before returning.
> 
> `flushSync` may also flush updates outside the callback when necessary to flush the updates inside the callback. For example, if there are pending updates from a click, React may flush those before flushing the updates inside the callback.

## Legacy Reference {#legacy-reference}
### `render()` {#render}
```javascript
render(element, container[, callback])
```

> Note:
>
> `render` has been replaced with `createRoot` in React 18. See [createRoot](/docs/react-dom-client.html#createroot) for more info.

Render a React element into the DOM in the supplied `container` and return a [reference](/docs/more-about-refs.html) to the component (or returns `null` for [stateless components](/docs/components-and-props.html#function-and-class-components)).
>>>>>>> c7d858947f832d1ba4e78caebc391fd964ff6de6

যদি React element টি আগেই `container` এ রেন্ডার করা হয়ে থাকে তাহলে `render` মেথড কম্পোনেন্ট টি আপডেট করে এবং শুধু DOM এর প্রয়োজনীয় জায়গাগুলো আপডেট করে যাতে React element এর সর্বশেষ অবস্থা দেখা যায়।

যদি অপশনাল `callback` আর্গুমেন্ট টি পাস করা হয়, তাহলে এই callback ফাংশনটি কম্পোনেন্ট রেন্ডার অথবা আপডেট হওয়ার পর কল করা হয়।

> বিঃদ্রঃ
>
<<<<<<< HEAD
> `ReactDOM.render()` কন্টেইনার নোড এর সব কন্টেন্ট নিয়ন্ত্রণ করে। প্রথমবার কলের সময় কন্টেইনার এর অভ্যন্তরীণ সকল DOM element গুলো প্রতিস্থাপন করে নেয়া হয়। পরবর্তী কলগুলোতে React এর DOM পার্থক্যকারী এলগরিদম ব্যবহার করা হয় যাতে সুদক্ষভাবে আপডেট করা যায়।
>
> `ReactDOM.render()` কন্টেইনার নোড কে কোনভাবে পরিবর্তন করেনা(শুধুমাত্র কন্টেইনার এর অভ্যন্তরীণ নোড গুলো পরিবর্তন করে)। কোন একটি উপস্থিত DOM নোডের অভ্যন্তরীণ উপাদানগুলোকে না বদলিয়েও নতুন কম্পোনেন্ট সংযুক্ত করা সম্ভব।
>
> `ReactDOM.render()` বর্তমানে মূল `ReactComponent` ইন্সট্যান্স এর একটি রেফারেন্স রিটার্ন করে। কিন্তু এই রিটার্ন ভ্যালু যথাসম্ভব এড়িয়ে যাওয়া উচিত কারণ সামনের React ভার্সন গুলোতে কিছু কিছু ক্ষেত্রে হয়ত কম্পোনেন্ট গুলো asynchronous ভাবে রেন্ডার করা হবে। যদি আপনার `ReactComponent` ইন্সট্যান্স এর রেফারেন্স দরকার হয়, তাহলে ভাল উপায় হল মূল উপাদান এর সাথে একটি [callback ref](/docs/more-about-refs.html#the-ref-callback-attribute) সংযুক্ত করে দেয়া।
>
> `ReactDOM.render()` ব্যবহার করে কোন সার্ভার দ্বারা রেন্ডারকৃত কন্টেইনার hydrate করা এড়িয়ে চলা উচিত কারণ এটি React 17 এ বাদ দেয়া হবে।
=======
> `render()` controls the contents of the container node you pass in. Any existing DOM elements inside are replaced when first called. Later calls use React’s DOM diffing algorithm for efficient updates.
>
> `render()` does not modify the container node (only modifies the children of the container). It may be possible to insert a component to an existing DOM node without overwriting the existing children.
>
> `render()` currently returns a reference to the root `ReactComponent` instance. However, using this return value is legacy
> and should be avoided because future versions of React may render components asynchronously in some cases. If you need a reference to the root `ReactComponent` instance, the preferred solution is to attach a
> [callback ref](/docs/refs-and-the-dom.html#callback-refs) to the root element.
>
> Using `render()` to hydrate a server-rendered container is deprecated. Use [`hydrateRoot()`](/docs/react-dom-client.html#hydrateroot) instead.
>>>>>>> c7d858947f832d1ba4e78caebc391fd964ff6de6

* * *

### `hydrate()` {#hydrate}

```javascript
hydrate(element, container[, callback])
```

<<<<<<< HEAD
[`render()`](#render) এর মতই, কিন্তু একটি কন্টেইনার কে hydrate করার জন্য ব্যবহার করা হয় যার HTML [`ReactDOMServer`](/docs/react-dom-server.html) এর মাধ্যমে রেন্ডার করা হয়েছিল। React এক্ষেত্রে উপস্থিত markup এর সাথে event listeners সংযুক্ত করার চেষ্টা করবে।
=======
> Note:
>
> `hydrate` has been replaced with `hydrateRoot` in React 18. See [hydrateRoot](/docs/react-dom-client.html#hydrateroot) for more info.

Same as [`render()`](#render), but is used to hydrate a container whose HTML contents were rendered by [`ReactDOMServer`](/docs/react-dom-server.html). React will attempt to attach event listeners to the existing markup.
>>>>>>> c7d858947f832d1ba4e78caebc391fd964ff6de6

React আশা করে রেন্ডারকৃত content সার্ভার এবং ক্লায়েন্ট এর মধ্যে দেখতে অনুরূপ হবে। এটি text content এর ক্ষেত্রে কোন ভিন্নতা থাকলে তা সাময়িকভাবে সমাধান করতে পারে, কিন্তু আপনার এরকম ভিন্নতা কে বাগ হিসেবে গণ্য করে এগুলো সমাধান করা উচিত। ডেভেলপমেন্ট মোডে React এরকম ভিন্নতা গুলো সম্পর্কে hydration এর সময় আপনাকে সতর্ক করে। এরকম কোন গ্যারান্টি নেই যে attribute এর মধ্যে ভিন্নতা দেখা দিলে তা আপনা-আপনি সমাধান হয়ে যাবে। এটি আপনার অ্যাপের দক্ষতার জন্য অত্যন্ত গুরুত্বপূর্ণ কারণ অধিকাংশ অ্যাপে এমন ভিন্নতা খুবই বিরল এবং সব markup validate করা অ্যাপের দক্ষতা অনেকাংশে কমিয়ে দেয়।

যদি কোন একটি element এর attribute অথবা text অনিবার্য কারণবশত সার্ভার এবং ক্লায়েন্ট এর মাঝে ভিন্ন হয়(যেমনঃ timestamp), সেক্ষেত্রে আপনি warning গুলো চুপ করিয়ে দিতে পারেন `suppressHydrationWarning={true}` এই অংশটি element এর সাথে যুক্ত করে। এটি শুধু element এর এক ধাপ নিচ পর্যন্ত কাজ করে এবং একেবারে সর্বশেষ পথ হিসেবে ব্যবহার করা উচিত। এর অতিরিক্ত ব্যবহার এড়িয়ে চলবেন। যদি এটি text content না হয়, React তবুও এটি নিজে নিজে সাময়িকভাবে সমাধান করার চেষ্টা করবেনা, তাই এটি ভবিষ্যৎ আপডেট না দেয়া পর্যন্ত পরিবর্তনশীল থাকতে পারে।

যদি আপনি ইচ্ছাকৃতভাবে সার্ভার এবং ক্লায়েন্ট এ ভিন্নভাবে রেন্ডার করতে চান তাহলে আপনি two-pass রেন্ডারিং করতে পারেন। যেসব কম্পোনেন্ট ক্লায়েন্ট এর ক্ষেত্রে ভিন্ন কিছু রেন্ডার করে সেগুলো একটি state ভ্যারিয়েবল পড়তে পারে যেমনঃ `this.state.isClient` যা আপনি চাইলে `true` সেট করে দিতে পারেন `componentDidMount()` মেথডের মাধ্যমে। এই পথ অবলম্বন করলে প্রথম রেন্ডার পাসে ক্লায়েন্ট এবং সার্ভার একই content রেন্ডার করবে, এতে markup mismatch পরিহার করা যাবে এবং synchronously একটি অতিরিক্ত পাস hydration এর পরপরই হবে। মনে রাখবেন এই পথ অবলম্বন করলে আপনার কম্পোনেন্ট কিছুটা ধীরগতির হয়ে যাবে কারণ আপনার দু'বার রেন্ডার করতে হবে, তাই এটি ব্যবহারের সময় সতর্ক থাকবেন।  

আপনার ধীরগতির ইন্টারনেট ব্যবহারকারীদের কথাও মনে রাখতে হবে। জাভাস্ক্রিপ্ট কোডগুলো লোড হতে প্রথমবার HTML রেন্ডার হওয়ার পরও কিছুটা সময় লাগতে পারে, তাই আপনি যদি শুধু ক্লায়েন্ট এর জন্য ভিন্ন কিছু রেন্ডার করেন তাহলে রূপান্তরটি কিছুটা দৃষ্টিকটু হবে। যাহোক, যদি ঠিকমত execute করা হয়, তাহলে আপনার এপ্লিকেশন এর একটি "shell" সার্ভারে রেন্ডার করে রাখা এবং শুধু কিছু অতিরিক্ত widget ক্লায়েন্টে দেখানো উপকারী হতে পারে। markup mismatch এড়িয়ে কিভাবে এটি করতে হয় এ ব্যাপারে জানতে আগের অনুচ্ছেদ এর এর ব্যাখ্যা দেখুন। 

* * *

### `unmountComponentAtNode()` {#unmountcomponentatnode}

```javascript
unmountComponentAtNode(container)
```

<<<<<<< HEAD
একটি মাউন্টকৃত React কম্পোনেন্ট এবং এর সাথে সংযুক্ত সকল event handler এবং state কে DOM থেকে মুছে দেয়। যদি কোন কম্পোনেন্ট ওই কন্টেইনার এ মাউন্ট করা না থাকে সেক্ষেত্রে এই ফাংশন কল করলে কিছুই হয়না। `true` রিটার্ন করে যখন কম্পোনেন্ট সফলভাবে আন মাউন্ট করা হয় এবং `false` রিটার্ন করে যদি আনমাউন্ট করার জন্য কোন কম্পোনেন্ট না থাকে।
=======
> Note:
>
> `unmountComponentAtNode` has been replaced with `root.unmount()` in React 18. See [createRoot](/docs/react-dom-client.html#createroot) for more info.

Remove a mounted React component from the DOM and clean up its event handlers and state. If no component was mounted in the container, calling this function does nothing. Returns `true` if a component was unmounted and `false` if there was no component to unmount.
>>>>>>> c7d858947f832d1ba4e78caebc391fd964ff6de6

* * *

### `findDOMNode()` {#finddomnode}

> বিঃদ্রঃ
>
> `findDOMNode` নিম্নাবস্থিত DOM নোডে প্রবেশ করার একটি সর্বশেষ পথ। অধিকাংশ ক্ষেত্রে, এটি ব্যবহার করা থেকে নিরুৎসাহিত করা হয় কারণ এটি কম্পোনেন্ট abstraction কে ভেদ করে। [এটি `StrictMode` এ ব্যবহার করার অনুমোদন নেই।](/docs/strict-mode.html#warning-about-deprecated-finddomnode-usage)

```javascript
findDOMNode(component)
```
যদি এই কম্পোনেন্টটি DOM এ মাউন্ট করা হয়ে থাকে তাহলে এই মেথডটি ব্রাউজার এর নিজস্ব অনুরূপ DOM element টি রিটার্ন করে। এই মেথডটি DOM থেকে কোন মান যেমন, কোন ফর্ম ফিল্ড এর মান অথবা DOM element এর মাপ নেয়ার জন্য ব্যবহার করা হয়। **অধিকাংশ ক্ষেত্রে, আপনি DOM node এর সাথে একটি ref সংযুক্ত করে `findDOMNode` ব্যবহার করা সম্পূর্ণভাবে এড়িয়ে চলতে পারেন।**

যখন কোন কম্পোনেন্ট `null` অথবা `false` রেন্ডার করে, `findDOMNode` ঐ ক্ষেত্রে `null` রিটার্ন করে। যখন কোন কম্পোনেন্ট একটি string রেন্ডার করে, `findDOMNode` তখন একটি text DOM নোড রিটার্ন করে যা ঐ ভ্যালু ধারণ করে। React 16 থেকে, একটি কম্পোনেন্ট একটি fragment রিটার্ন করতে পারে যা একাধিক children ধারণ করে, এ ক্ষেত্রে `findDOMNode` প্রথম খালি-না-থাকা child এর DOM নোডটি রিটার্ন করবে।

> বিঃদ্রঃ
>
> `findDOMNode` শুধু মাউন্ট করা কম্পোনেন্টেই কাজ করে (যেই কম্পোনেন্ট গুলো DOM এ প্রবেশ করানো হয়েছে)। যদি আপনি এমন কোন কম্পোনেন্টে এই মেথড কল করেন যেই কম্পোনেন্ট এখনো মাউন্ট করা হয়নি (যেমনঃ একটি কম্পোনেন্ট এর `render()` মেথডে `findDOMNode()` কল করা যা এখনো তৈরি হয়নি) একটি exception throw করা হবে।
>
> `findDOMNode` ফাংশন কম্পোনেন্টে ব্যবহার করা যায়না।

* * *
<<<<<<< HEAD

### `createPortal()` {#createportal}

```javascript
ReactDOM.createPortal(child, container)
```

এটি একটি portal বা পথ তৈরি করে। এই portal গুলো [DOM কম্পোনেন্ট এর বাইরে থাকা কোন DOM নোডে children রেন্ডার করার](/docs/portals.html) একটা সমাধান প্রদান করে।
=======
>>>>>>> c7d858947f832d1ba4e78caebc391fd964ff6de6
