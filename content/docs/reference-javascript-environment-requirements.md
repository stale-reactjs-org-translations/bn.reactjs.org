---
id: javascript-environment-requirements
title: জাভাস্ক্রিপ্ট Environment এর প্রয়োজনীয়তাসমূহ
layout: docs
category: Reference
permalink: docs/javascript-environment-requirements.html
---

React ১৬ [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) এবং [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) এর মত কালেকশন টাইপের উপর নির্ভর করে। আপনি যদি পুরনো ব্রাউজারগুলো বা ডিভাইসগুলো সাপোর্ট করেন যা হয়ত এই টাইপগুলো সাপোর্ট করেনা (যেমনঃ IE < 11) অথবা যা এই টাইপগুলো সাধারণের চেয়ে ভিন্নভাবে ইমপ্লিমেন্ট করে (যেমনঃ IE 11), সেক্ষেত্রে আপনার bundled অ্যাপ্লিকেশনের সাথে [core-js](https://github.com/zloirock/core-js) অথবা [babel-polyfill](https://babeljs.io/docs/usage/polyfill/) এর মত একটি গ্লোবাল পলিফিল সংযুক্ত করতে পারেন।

পুরনো ব্রাউজারগুলো সাপোর্ট করার জন্য React ১৬ এ core-js এর মাধ্যমে পলিফিলকৃত একটি environment এমন হতে পারেঃ 

```js
import 'core-js/es6/map';
import 'core-js/es6/set';

import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <h1>Hello, world!</h1>,
  document.getElementById('root')
);
```

React এছাড়াও `requestAnimationFrame` এর উপর নির্ভর করে (এমনকি test environment এও).
আপনি [raf](https://www.npmjs.com/package/raf) প্যাকেজটি ব্যবহার করে `requestAnimationFrame` shim করতে পারেনঃ

```js
import 'raf/polyfill';
```
