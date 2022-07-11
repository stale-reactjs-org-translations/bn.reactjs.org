---
id: shallow-renderer
title: Shallow Renderer
permalink: docs/shallow-renderer.html
layout: docs
category: Reference
---

**Importing**

```javascript
import ShallowRenderer from 'react-test-renderer/shallow'; // ES6
var ShallowRenderer = require('react-test-renderer/shallow'); // ES5 with npm
```

## সারমর্ম {#overview}

React এ unit test লেখার জন্য shallow rendering বেশ সুবিধাজনক। Shallow rendering আপনাকে "এক ধাপ নিচ পর্যন্ত" একটি কম্পোনেন্টকে রেন্ডার করতে সহায়তা করে এবং কম্পোনেন্টটির রেন্ডার মেথড কি রিটার্ন করে সেটি যাচাই করে, এক্ষেত্রে তার অভ্যন্তরীণ কম্পোনেন্টগুলো, যেগুলা এখনো তৈরি অথবা রেন্ডার হয়নি তাদের ধরণ আমলে নেওয়া হয় না। এই প্রক্রিয়ার জন্য কোন DOM এর প্রয়োজন হয় না।

উদাহরণ হিসেবে, যদি আপনি নিচের মতো একটি কম্পোনেন্ট লিখেনঃ

```javascript
function MyComponent() {
  return (
    <div>
      <span className="heading">Title</span>
      <Subcomponent foo="bar" />
    </div>
  );
}
```

তবে আপনি এভাবে সেটিকে যাচাই করতে পারেনঃ 

```javascript
import ShallowRenderer from 'react-test-renderer/shallow';

// in your test:
const renderer = new ShallowRenderer();
renderer.render(<MyComponent />);
const result = renderer.getRenderOutput();

expect(result.type).toBe('div');
expect(result.props.children).toEqual([
  <span className="heading">Title</span>,
  <Subcomponent foo="bar" />
]);
```

Shallow testing এর বর্তমানে কিছু সীমাবদ্ধতা আছে, যেমন এটি ref সমর্থন করে না।

> বিঃদ্রঃ
>
> Enzyme এর [Shallow Rendering API](https://airbnb.io/enzyme/docs/api/shallow.html) দেখার জন্য আমরা আপনাকে অনুরোধ করছি। এটি আরও সুন্দর একটি উঁচু-স্তরের API দেয়, যা দিয়ে একই কাজ করা সম্ভব। 

## রেফারেন্সে {#reference}

### `shallowRenderer.render()` {#shallowrendererrender}

আপনি যে কম্পোনেন্টটি পরীক্ষা করছেন তা রেন্ডার করার একটা "স্থান" হিসেবে shallowRenderer কে চিন্তা করতে পারেন এবং এখান থেকে আপনি আপনার কম্পোনেন্টের আউটপুটও বের করে আনতে পারেন।

<<<<<<< HEAD
`shallowRenderer.render()` অনেকটা [`ReactDOM.render()`](/docs/react-dom.html#render) এর অনুরূপ। তবে `shallowRenderer.render()` এর জন্য DOM এর প্রয়োজন হয় না এবং এটি শুধুমাত্র এক স্তর গভীর পর্যন্ত রেন্ডার করে। এর অর্থ হলো আপনি কোনো কম্পোনেন্টকে তার অভ্যন্তরীণ কম্পোনেন্টগুলো থেকে আলাদা করে পরীক্ষা করতে পারবেন।
=======
`shallowRenderer.render()` is similar to [`root.render()`](/docs/react-dom-client.html#createroot) but it doesn't require DOM and only renders a single level deep. This means you can test components isolated from how their children are implemented.
>>>>>>> f67fa22cc1faee261f9e22449d90323e26174e8e

### `shallowRenderer.getRenderOutput()` {#shallowrenderergetrenderoutput}

`shallowRenderer.render()` ব্যবহার করার পর আপনি `shallowRenderer.getRenderOutput()` ব্যবহার করে অগভীরভাবে রেন্ডারকৃত আউটপুট পেতে পারেন।

আপনি তারপর সেই আউটপুটের তথ্যগুলো যাচাই করতে পারেন।
