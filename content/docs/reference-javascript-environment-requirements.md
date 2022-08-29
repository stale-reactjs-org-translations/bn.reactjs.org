---
id: javascript-environment-requirements
title: জাভাস্ক্রিপ্ট ইনভায়রনমেন্টের প্রয়োজনীয়তাসমূহ
layout: docs
category: Reference
permalink: docs/javascript-environment-requirements.html
---

<<<<<<< HEAD
React 16 [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) এবং [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) এর মত কালেকশন টাইপের উপর নির্ভর করে। আপনি যদি পুরনো ব্রাউজারগুলো বা ডিভাইসগুলো সাপোর্ট করেন যা হয়ত এই টাইপগুলো সাপোর্ট করেনা (যেমনঃ IE < 11) অথবা যা এই টাইপগুলো সাধারণের চেয়ে ভিন্নভাবে ইমপ্লিমেন্ট করে (যেমনঃ IE 11), সেক্ষেত্রে আপনার bundled অ্যাপ্লিকেশনের সাথে [core-js](https://github.com/zloirock/core-js) এর মত একটি গ্লোবাল পলিফিল সংযুক্ত করতে পারেন।

পুরনো ব্রাউজারগুলো সাপোর্ট করার জন্য React 16 এ core-js এর মাধ্যমে পলিফিলকৃত একটি ইনভায়রনমেন্ট এমন হতে পারেঃ 
=======
React 18 supports all modern browsers (Edge, Firefox, Chrome, Safari, etc).

If you support older browsers and devices such as Internet Explorer which do not provide modern browser features natively or have non-compliant implementations, consider including a global polyfill in your bundled application.
>>>>>>> ea9e9ab2817c8b7eff5ff60e8fe9b649fd747606

Here is a list of the modern features React 18 uses:
- [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [`Symbol`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol)
- [`Object.assign`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)

<<<<<<< HEAD
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <h1>Hello, world!</h1>,
  document.getElementById('root')
);
```

React এছাড়াও `requestAnimationFrame` এর উপর নির্ভর করে (এমনকি test ইনভায়রনমেন্টেও).
আপনি [raf](https://www.npmjs.com/package/raf) package টি ব্যবহার করে `requestAnimationFrame` shim করতে পারেনঃ

```js
import 'raf/polyfill';
```
=======
The correct polyfill for these features depend on your environment. For many users, you can configure your [Browserlist](https://github.com/browserslist/browserslist) settings. For others, you may need to import polyfills like [`core-js`](https://github.com/zloirock/core-js) directly.
>>>>>>> ea9e9ab2817c8b7eff5ff60e8fe9b649fd747606
