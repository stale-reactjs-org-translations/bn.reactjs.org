---
id: test-renderer
title: টেস্ট রেন্ডারার
permalink: docs/test-renderer.html
layout: docs
category: Reference
---

**ইম্পোর্ট করা**

```javascript
import TestRenderer from 'react-test-renderer'; // ES6
const TestRenderer = require('react-test-renderer'); // ES5 with npm
```

## সারমর্ম {#overview}

এই প্যাকেজ একটি React রেন্ডারার সরবরাহ করে যার মাধ্যমে DOM অথবা কোন নেটিভ মোবাইল ইনভায়রনমেন্টের উপর নির্ভর না করেই React কম্পোনেন্টগুলোকে বিশুদ্ধ জাভাস্ক্রিপ্ট অবজেক্টে রেন্ডার করা যায়।

মূলত, এই প্যাকেজ ব্রাউজার অথবা [jsdom](https://github.com/tmpvar/jsdom) ব্যবহার না করেই একটি React DOM অথবা React Native কম্পোনেন্টের রেন্ডারকৃত platform view hierarchy (অনেকটা DOM ট্রি এর মত) এর snapshot নেয়ার কাজটি সহজ করে দেয়।

উদাহরণঃ

```javascript
import TestRenderer from 'react-test-renderer';

function Link(props) {
  return <a href={props.page}>{props.children}</a>;
}

const testRenderer = TestRenderer.create(
  <Link page="https://www.facebook.com/">Facebook</Link>
);

console.log(testRenderer.toJSON());
// { type: 'a',
//   props: { href: 'https://www.facebook.com/' },
//   children: [ 'Facebook' ] }
```

আপনি Jest এর snapshot টেস্টিং ফিচার ব্যবহার করে স্বয়ংক্রিয়ভাবে JSON ট্রি এর একটি কপি সংরক্ষণ করে আপনার টেস্টে এর কোন পরিবর্তন হয়েছে কিনা দেখতে পারেনঃ [এ সম্পর্কে বিস্তারিত জানুন](https://jestjs.io/docs/en/snapshot-testing)।

আপনি এছাড়াও আউটপুট ট্রাভার্স করে নির্দিষ্ট নোড খুঁজে বের করতে পারেন এবং এদের মধ্যে assertions করতে পারেন।

```javascript
import TestRenderer from 'react-test-renderer';

function MyComponent() {
  return (
    <div>
      <SubComponent foo="bar" />
      <p className="my">Hello</p>
    </div>
  )
}

function SubComponent() {
  return (
    <p className="sub">Sub</p>
  );
}

const testRenderer = TestRenderer.create(<MyComponent />);
const testInstance = testRenderer.root;

expect(testInstance.findByType(SubComponent).props.foo).toBe('bar');
expect(testInstance.findByProps({className: "sub"}).children).toEqual(['Sub']);
```

### TestRenderer {#testrenderer}

* [`TestRenderer.create()`](#testrenderercreate)
* [`TestRenderer.act()`](#testrendereract)

### TestRenderer ইন্সট্যান্স {#testrenderer-instance}

* [`testRenderer.toJSON()`](#testrenderertojson)
* [`testRenderer.toTree()`](#testrenderertotree)
* [`testRenderer.update()`](#testrendererupdate)
* [`testRenderer.unmount()`](#testrendererunmount)
* [`testRenderer.getInstance()`](#testrenderergetinstance)
* [`testRenderer.root`](#testrendererroot)

### TestInstance {#testinstance}

* [`testInstance.find()`](#testinstancefind)
* [`testInstance.findByType()`](#testinstancefindbytype)
* [`testInstance.findByProps()`](#testinstancefindbyprops)
* [`testInstance.findAll()`](#testinstancefindall)
* [`testInstance.findAllByType()`](#testinstancefindallbytype)
* [`testInstance.findAllByProps()`](#testinstancefindallbyprops)
* [`testInstance.instance`](#testinstanceinstance)
* [`testInstance.type`](#testinstancetype)
* [`testInstance.props`](#testinstanceprops)
* [`testInstance.parent`](#testinstanceparent)
* [`testInstance.children`](#testinstancechildren)

## রেফারেন্স {#reference}

### `TestRenderer.create()` {#testrenderercreate}

```javascript
TestRenderer.create(element, options);
```

পাসকৃত React element এর সাথে একটি `TestRenderer` ইন্সট্যান্স তৈরি করুন। এটি আসল DOM ব্যবহার করেনা কিন্তু মেমোরিতে পুরো কম্পোনেন্ট-ট্রিটিকে রেন্ডার করে যাতে করে আপনি এটি সম্পর্কে assertions করতে পারেন। রিটার্নকৃত ইন্সট্যান্সে নিম্নোক্ত মেথড এবং প্রপার্টিসমূহ থাকে।

### `TestRenderer.act()` {#testrendereract}

```javascript
TestRenderer.act(callback);
```

[`react-dom/test-utils` এর `act()` হেল্পারের](/docs/test-utils.html#act) মতই, `TestRenderer.act` একটি কম্পোনেন্টকে assertions এর জন্য প্রস্তুত করে। `act()` এর এই ভার্সনকে `TestRenderer.create` এবং `testRenderer.update` কলকে wrap করতে ব্যবহার করুন।

```javascript
import {create, act} from 'react-test-renderer';
import App from './app.js'; // The component being tested

// render the component
let root; 
act(() => {
  root = create(<App value={1}/>)
});

// make assertions on root 
expect(root.toJSON()).toMatchSnapshot();

// update with some different props
act(() => {
  root = root.update(<App value={2}/>);
})

// make assertions on root 
expect(root.toJSON()).toMatchSnapshot();
```

### `testRenderer.toJSON()` {#testrenderertojson}

```javascript
testRenderer.toJSON()
```

রেন্ডার ট্রিকে উপস্থাপন করে এমন একটি অবজেক্ট রিটার্ন করে। এই ট্রিতে শুধুমাত্র প্লাটফর্ম-স্পেসিফিক নোড যেমন `<div>` অথবা `<View>` এবং এদের props গুলো থাকে কিন্তু কোন ইউজার দ্বারা তৈরিকৃত কম্পোনেন্ট থাকেনা। এটি [snapshot টেস্টিং](https://facebook.github.io/jest/docs/en/snapshot-testing.html#snapshot-testing-with-jest) এর কাজ অনেক সহজ করে দেয়।

### `testRenderer.toTree()` {#testrenderertotree}

```javascript
testRenderer.toTree()
```

রেন্ডার ট্রিকে উপস্থাপন করে এমন একটি অবজেক্ট রিটার্ন করে। কিন্তু `toJSON()` এর চেয়েও অনেক বেশি তথ্য এই অবজেক্টে থাকে,এবং ইউজার দ্বারা তৈরিকৃত কম্পোনেন্টগুলোও এখানে সংযুক্ত করা হয়। আপনার হয়ত এই মেথডের প্রয়োজন নাও হতে পারে যদি না আপনি টেস্ট রেন্ডারারের উপর ভিত্তি করে নিজের কোন assertion লাইব্রেরি তৈরি না করেন।

### `testRenderer.update()` {#testrendererupdate}

```javascript
testRenderer.update(element)
```

মেমোরিতে থাকা ট্রিকে নতুন একটি root element এ রি-রেন্ডার করে। এটি root এ React আপডেটকে নকল করে। যদি নতুন element এর টাইপ এবং key আগের element এর মতই হয় তাহলে ট্রিটি আপডেট হবে; অন্যথায় এটি নতুন একটি ট্রিকে রি-মাউন্ট করবে।

### `testRenderer.unmount()` {#testrendererunmount}

```javascript
testRenderer.unmount()
```

মেমোরিতে থাকা ট্রিকে এর সাথে সংযুক্ত lifecycle ইভেন্টগুলোসহ আনমাউন্ট করে।

### `testRenderer.getInstance()` {#testrenderergetinstance}

```javascript
testRenderer.getInstance()
```

যদি পাওয়া যায় তাহলে root element এর সাথে সম্পর্কিত ইন্সট্যান্সটি রিটার্ন করে। এটি কাজ করবেনা যদি root element একটি ফাংশন কম্পোনেন্ট হয় কারণ এই কম্পোনেন্টের কোন ইন্সট্যান্স থাকেনা।

### `testRenderer.root` {#testrendererroot}

```javascript
testRenderer.root
```

ট্রি এর নির্দিষ্ট নোডের সম্পর্কে প্রয়োজনীয় assertions এ সাহায্যকারী root "টেস্ট ইন্সট্যান্স" অবজেক্ট রিটার্ন করে। আপনি এটি ব্যবহার করে অন্য ভেতরের আরও "টেস্ট ইন্সট্যান্স" খুঁজে বের করতে পারেন।

### `testInstance.find()` {#testinstancefind}

```javascript
testInstance.find(test)
```

এমন একটি descendant টেস্ট ইন্সট্যান্স খুঁজে বের করুন যার জন্য `test(testInstance)` ফাংশন কল `true` রিটার্ন করে। যদি `test(testInstance)` শুধুমাত্র একটি টেস্ট ইন্সট্যান্সের জন্য `true` রিটার্ন না করে, তাহলে এটি একটি এরর থ্রো করবে।

### `testInstance.findByType()` {#testinstancefindbytype}

```javascript
testInstance.findByType(type)
```

সরবরাহকৃত `type` এর সাথে মিলে যায় এমন একটি descendant টেস্ট ইন্সট্যান্স খুঁজে বের করুন। যদি সরবরাহকৃত `type` এর শুধু একটি টেস্ট ইন্সট্যান্স না থাকে, তাহলে এটি একটি এরর থ্রো করবে।

### `testInstance.findByProps()` {#testinstancefindbyprops}

```javascript
testInstance.findByProps(props)
```

সরবরাহকৃত `props` এর সাথে মিলে যায় এমন একটি descendant টেস্ট ইন্সট্যান্স খুঁজে বের করুন। যদি সরবরাহকৃত `props` এর শুধু একটি টেস্ট ইন্সট্যান্স না থাকে, তাহলে এটি একটি এরর থ্রো করবে।

### `testInstance.findAll()` {#testinstancefindall}

```javascript
testInstance.findAll(test)
```

সকল descendant টেস্ট ইন্সট্যান্স খুঁজে বের করুন যাদের জন্য `test(testInstance)` ফাংশন কল `true` রিটার্ন করে।

### `testInstance.findAllByType()` {#testinstancefindallbytype}

```javascript
testInstance.findAllByType(type)
```

সরবরাহকৃত `type` এর সাথে মিলে যায় এমন সকল descendant টেস্ট ইন্সট্যান্স খুঁজে বের করুন।

### `testInstance.findAllByProps()` {#testinstancefindallbyprops}

```javascript
testInstance.findAllByProps(props)
```

সরবরাহকৃত `props` এর সাথে মিলে যায় এমন সকল descendant টেস্ট ইন্সট্যান্স খুঁজে বের করুন।

### `testInstance.instance` {#testinstanceinstance}

```javascript
testInstance.instance
```

কম্পোনেন্ট ইন্সট্যান্সের সাথে সম্পৃক্ত টেস্ট ইন্সট্যান্স। এটি শুধুমাত্র ক্লাস কম্পোনেন্টেই ব্যবহারযোগ্য, যেহেতু ফাংশন কম্পোনেন্টের কোন ইন্সট্যান্স থাকেনা। এটি সরবরাহকৃত কম্পোনেন্টের অভ্যন্তরীণ `this` এর মানের সাথে তুলনা করে।

### `testInstance.type` {#testinstancetype}

```javascript
testInstance.type
```

এই টেস্ট ইন্সট্যান্সের সাথে সম্পৃক্ত কম্পোনেন্ট টাইপ। উদাহরণস্বরূপ, একটি `<Button />` কম্পোনেন্ট এর টাইপ হল `Button`।

### `testInstance.props` {#testinstanceprops}

```javascript
testInstance.props
```

এই টেস্টে ইন্সট্যান্সের সাথে সম্পৃক্ত props। উদাহরণস্বরূপ, একটি `<Button size="small" />` কম্পোনেন্টে props হিসেবে `{size: 'small'}` থাকে।

### `testInstance.parent` {#testinstanceparent}

```javascript
testInstance.parent
```

এই টেস্ট ইন্সট্যান্সের parent টেস্ট ইন্সট্যান্স।

### `testInstance.children` {#testinstancechildren}

```javascript
testInstance.children
```

এই টেস্ট ইন্সট্যান্সের children টেস্ট ইন্সট্যান্সগুলো।

## কিছু ভাবনা {#ideas}

আপনি `TestRenderer.create` এর অপশন হিসেবে `createNodeMock` ফাংশন পাস করতে পারেন, যা আপনাকে custom mock refs তৈরি করার সুযোগ করে দেয়।
`createNodeMock` বর্তমান element গ্রহণ করে এবং এটির একটি mock ref অবজেক্ট রিটার্ন করা উচিত।
এটি দরকারী যখন আপনি একটি refs এর উপর নির্ভরশীল কম্পোনেন্ট টেস্ট করবেন।

```javascript
import TestRenderer from 'react-test-renderer';

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.input = null;
  }
  componentDidMount() {
    this.input.focus();
  }
  render() {
    return <input type="text" ref={el => this.input = el} />
  }
}

let focused = false;
TestRenderer.create(
  <MyComponent />,
  {
    createNodeMock: (element) => {
      if (element.type === 'input') {
        // mock a focus function
        return {
          focus: () => {
            focused = true;
          }
        };
      }
      return null;
    }
  }
);
expect(focused).toBe(true);
```
