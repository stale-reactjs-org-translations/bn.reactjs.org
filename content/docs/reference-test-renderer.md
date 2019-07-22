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

মূলত, এই প্যাকেজ ব্রাউজার অথবা [jsdom](https://github.com/tmpvar/jsdom) ব্যবহার না করেই একটি React DOM অথবা React Native কম্পোনেন্টের রেন্ডারকৃত platform view hierarchy (অনেকটা DOM ট্রি এর মত) এর স্ন্যাপশট নেয়ার কাজটি সহজ করে দেয়।

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

আপনি Jest এর স্ন্যাপশট টেস্টিং ফিচার ব্যবহার করে স্বয়ংক্রিয়ভাবে JSON ট্রি এর একটি কপি সংরক্ষণ করে আপনার টেস্টে এর কোন পরিবর্তন হয়েছে কিনা দেখতে পারেনঃ [এ সম্পর্কে বিস্তারিত জানুন](https://jestjs.io/docs/en/snapshot-testing)।

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

### `testRenderer.toJSON()` {#testrenderertojson}

```javascript
testRenderer.toJSON()
```

রেন্ডার ট্রিকে উপস্থাপন করে এমন একটি অবজেক্ট রিটার্ন করে। এই ট্রিতে শুধুমাত্র প্লাটফর্ম-স্পেসিফিক নোড যেমন `<div>` অথবা `<View>` এবং এদের props গুলো থাকে কিন্তু কোন ইউজার দ্বারা তৈরিকৃত কম্পোনেন্ট থাকেনা। এটি [snapshot টেস্টিং](https://facebook.github.io/jest/docs/en/snapshot-testing.html#snapshot-testing-with-jest) এর কাজ অনেক সহজ করে দেয়।

### `testRenderer.toTree()` {#testrenderertotree}

```javascript
testRenderer.toTree()
```

রেন্ডার ট্রিকে উপস্থাপন করে এমন একটি অবজেক্ট রিটার্ন করে। কিন্তু `toJSON()` এর চেয়েও অনেক বেশি তথ্য এই অবজেক্টে থাকে,এবং ইউজার দ্বারা তৈরিকৃত কম্পোনেন্টগুলোও এখানে সংযুক্ত করা হয়। আপনার এই হয়ত এই মেথডের প্রয়োজন নাও হতে পারে যদি না আপনি টেস্ট রেন্ডারারের উপর ভিত্তি করে নিজের কোন assertion লাইব্রেরি তৈরি না করেন।

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

Return the instance corresponding to the root element, if available. This will not work if the root element is a function component because they don't have instances.

### `testRenderer.root` {#testrendererroot}

```javascript
testRenderer.root
```

Returns the root "test instance" object that is useful for making assertions about specific nodes in the tree. You can use it to find other "test instances" deeper below.

### `testInstance.find()` {#testinstancefind}

```javascript
testInstance.find(test)
```

Find a single descendant test instance for which `test(testInstance)` returns `true`. If `test(testInstance)` does not return `true` for exactly one test instance, it will throw an error.

### `testInstance.findByType()` {#testinstancefindbytype}

```javascript
testInstance.findByType(type)
```

Find a single descendant test instance with the provided `type`. If there is not exactly one test instance with the provided `type`, it will throw an error.

### `testInstance.findByProps()` {#testinstancefindbyprops}

```javascript
testInstance.findByProps(props)
```

Find a single descendant test instance with the provided `props`. If there is not exactly one test instance with the provided `props`, it will throw an error.

### `testInstance.findAll()` {#testinstancefindall}

```javascript
testInstance.findAll(test)
```

Find all descendant test instances for which `test(testInstance)` returns `true`.

### `testInstance.findAllByType()` {#testinstancefindallbytype}

```javascript
testInstance.findAllByType(type)
```

Find all descendant test instances with the provided `type`.

### `testInstance.findAllByProps()` {#testinstancefindallbyprops}

```javascript
testInstance.findAllByProps(props)
```

Find all descendant test instances with the provided `props`.

### `testInstance.instance` {#testinstanceinstance}

```javascript
testInstance.instance
```

The component instance corresponding to this test instance. It is only available for class components, as function components don't have instances. It matches the `this` value inside the given component.

### `testInstance.type` {#testinstancetype}

```javascript
testInstance.type
```

The component type corresponding to this test instance. For example, a `<Button />` component has a type of `Button`.

### `testInstance.props` {#testinstanceprops}

```javascript
testInstance.props
```

The props corresponding to this test instance. For example, a `<Button size="small" />` component has `{size: 'small'}` as props.

### `testInstance.parent` {#testinstanceparent}

```javascript
testInstance.parent
```

The parent test instance of this test instance.

### `testInstance.children` {#testinstancechildren}

```javascript
testInstance.children
```

The children test instances of this test instance.

## Ideas {#ideas}

You can pass `createNodeMock` function to `TestRenderer.create` as the option, which allows for custom mock refs.
`createNodeMock` accepts the current element and should return a mock ref object.
This is useful when you test a component that relies on refs.

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
