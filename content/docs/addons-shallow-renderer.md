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

React এ unit test লেখার সময় shallow rendering সুবিধাজনক হতে পারে । Shallow rendering আপনাকে একটা component render করতে দেয় "এক ধাপ নিচ পর্যন্ত" এবং  শর্ত দিয়ে নির্ধারণ করা যাবে ঐ component-টি কি ফেরত পাঠাবে । এক্ষেত্রে component টির child component এর কথা চিন্তা করতে হয় না, কেননা তা instantiate বা render করা হয় না। এরজন্য DOM এর প্রয়োজন হয় না।


উদাহরণ হিসেবে, যদি আপনি নিচের মতো একটি component লিখুন :

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

তখন আপনি শর্ত আরোপ করতে পারেন:

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

> নোট:
>
> আমরা পরামর্শ দেই, আপনি Enzyme এর  [Shallow Rendering API](https://airbnb.io/enzyme/docs/api/shallow.html) -টি দেখুন। এটি আরও সুন্দর একটি higher-level API দেয়, যা দিয়ে একই কাজ করা সম্ভব। 

## রেফারেন্স হিসেবে {#reference}

### `shallowRenderer.render()` {#shallowrendererrender}

আপনি shallowRenderer কে এমন একটা "জায়গা" হিসেবে চিন্তা করতে পারেন, যেখানে আপনি যে component নিয়ে পরীক্ষা করছেন তা ঐ  component টি  render করার স্থান এবং এখান থেকে আপনি আপনার পরীক্ষামূলক component এর output পেতে পারেন।

`shallowRenderer.render()` অনেকটা [`ReactDOM.render()`](/docs/react-dom.html#render) এর অনুরূপ। তবে `shallowRenderer.render()` এর DOM লাগে না এবং এটি শুধুমাত্র এক স্তর গভীর পর্যন্ত render করে। এর অর্থ হলো আপনি কোনো component কে তার অভ্যন্তরীণ component গুলো থেকে আলাদা করে পরীক্ষা করতে পারবেন।

### `shallowRenderer.getRenderOutput()` {#shallowrenderergetrenderoutput}

`shallowRenderer.render()` ব্যবহার করার পর আপনি `shallowRenderer.getRenderOutput()` ব্যবহার করে shallowly rendered output পেতে পারবেন।

আপনি তারপর শর্ত আরোপ করার মাধ্যমে নির্ধারণ করতে পারবেন আউটপুট কি হবে।
