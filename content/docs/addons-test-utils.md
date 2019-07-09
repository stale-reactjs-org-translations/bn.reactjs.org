---
id: test-utils
title: Test ইউটিলিটি
permalink: docs/test-utils.html
layout: docs
category: Reference
---

**Importing**

```javascript
import ReactTestUtils from 'react-dom/test-utils'; // ES6
var ReactTestUtils = require('react-dom/test-utils'); // ES5 with npm
```

## সারমর্ম {#overview}

`ReactTestUtils` React কম্পোনেন্টগুলোকে আপনার পছন্দের টেস্টিং ফ্রেমওয়ার্কে টেস্ট করার কাজটি সহজ করে দেয়। ফেসবুকে আমরা সহজ জাভস্ক্রিপ্ট টেস্টিং এর জন্য [Jest](https://facebook.github.io/jest/) ব্যবহার করে থাকি। Jest দিয়ে কিভাবে শুরু করবেন তা Jest ওয়েবসাইটের [React টিউটোরিয়াল](https://jestjs.io/docs/tutorial-react) অংশে শিখতে পারবেন।

> বিঃদ্রঃ
>
> আমরা [React Testing Library](https://testing-library.com/react) ব্যবহার করার পরামর্শ দেই যেটা এমনভাবে ডিজাইন করা হয়েছে যাতে আপনি আপনার কম্পোনেন্টগুলোকে এদের ব্যবহারকারীদের মত টেস্ট করতে পারবেন।
>
> অন্যথায়, Airbnb [Enzyme](https://airbnb.io/enzyme/) নামের একটি টেস্টিং ইউটিলিটি প্রকাশ করেছে, যেটা আপনার React কম্পোনেন্টের আউটপুট assert, manipulate এবং traverse করার কাজগুলো সহজ করে দেয়।

 - [`act()`](#act)
 - [`mockComponent()`](#mockcomponent)
 - [`isElement()`](#iselement)
 - [`isElementOfType()`](#iselementoftype)
 - [`isDOMComponent()`](#isdomcomponent)
 - [`isCompositeComponent()`](#iscompositecomponent)
 - [`isCompositeComponentWithType()`](#iscompositecomponentwithtype)
 - [`findAllInRenderedTree()`](#findallinrenderedtree)
 - [`scryRenderedDOMComponentsWithClass()`](#scryrendereddomcomponentswithclass)
 - [`findRenderedDOMComponentWithClass()`](#findrendereddomcomponentwithclass)
 - [`scryRenderedDOMComponentsWithTag()`](#scryrendereddomcomponentswithtag)
 - [`findRenderedDOMComponentWithTag()`](#findrendereddomcomponentwithtag)
 - [`scryRenderedComponentsWithType()`](#scryrenderedcomponentswithtype)
 - [`findRenderedComponentWithType()`](#findrenderedcomponentwithtype)
 - [`renderIntoDocument()`](#renderintodocument)
 - [`Simulate`](#simulate)

## রেফারেন্স {#reference}

### `act()` {#act}

একটি কম্পোনেন্টকে assertions এর জন্য প্রস্তুত করতে ঐ কম্পোনেন্টের রেন্ডারিং এবং আপডেটের জন্য লিখা সকল কোডকে একটি `act()` কলের মধ্যে অন্তর্ভুক্ত করুন। এটি আপনার টেস্টগুলো React ব্রাউজারে যেভাবে কাজ করে তার অনেকটা কাছাকাছিভাবে চালনা করে।

>বিঃদ্রঃ
>
>আপনি যদি `react-test-renderer` ব্যবহার করে থাকেন, এটিও একটি `act` export সরবরাহ করে থাকে যা একইভাবে কাজ করে।

উদাহরণস্বরূপ, ধরে নিই আমাদের এই `Counter` কম্পোনেন্টটি আছেঃ

```js
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {count: 0};
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    document.title = `You clicked ${this.state.count} times`;
  }
  componentDidUpdate() {
    document.title = `You clicked ${this.state.count} times`;
  }
  handleClick() {
    this.setState(state => ({
      count: state.count + 1,
    }));
  }
  render() {
    return (
      <div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={this.handleClick}>
          Click me
        </button>
      </div>
    );
  }
}
```

আমরা একে নিচের মত টেস্ট করতে পারিঃ

```js{3,20-22,29-31}
import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import Counter from './Counter';

let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

it('can render and update a counter', () => {
  // Test first render and componentDidMount
  act(() => {
    ReactDOM.render(<Counter />, container);
  });
  const button = container.querySelector('button');
  const label = container.querySelector('p');
  expect(label.textContent).toBe('You clicked 0 times');
  expect(document.title).toBe('You clicked 0 times');

  // Test second render and componentDidUpdate
  act(() => {
    button.dispatchEvent(new MouseEvent('click', {bubbles: true}));
  });
  expect(label.textContent).toBe('You clicked 1 times');
  expect(document.title).toBe('You clicked 1 times');
});
```

আমাদের মনে রাখতে হবে DOM ইভেন্ট dispatch করলে তা শুধু তখনই কাজ করবে যখন DOM কন্টেইনারটি `document` এ সংযুক্ত করা হবে। আপনি বয়লারপ্লেট কোড কমাতে [`react-testing-library`](https://github.com/kentcdodds/react-testing-library) এর মত একটি হেল্পার ব্যবহার করতে পারেন।

* * *

### `mockComponent()` {#mockcomponent}

```javascript
mockComponent(
  componentClass,
  [mockTagName]
)
```

একটি mocked কম্পোনেন্ট মডিউলকে এই মেথডে পাস করে এর সাথে বিভিন্ন প্রয়োজনীয় মেথড জুড়ে দিতে পারবেন যা একে একটি কৃত্রিম React কম্পোনেন্ট হিসেবে ব্যবহার করার সুযোগ করে দেবে। সাধারণভাবে রেন্ডার করার পরিবর্তে কম্পোনেন্টটি এর সরবরাহকৃত children সহ একটি সাধারণ `<div>` (যদি `mockTagName` সরবরাহ করা হয় তাহলে অন্য ট্যাগে) এ পরিণত হবে।

> বিঃদ্রঃ
>
> `mockComponent()` is a legacy API. We recommend using [shallow rendering](/docs/shallow-renderer.html) or [`jest.mock()`](https://facebook.github.io/jest/docs/en/tutorial-react-native.html#mock-native-modules-using-jestmock) instead.
> `mockComponent()` হল একটি legacy এপিআই। আমরা এর পরিবর্তে [shallow rendering](/docs/shallow-renderer.html) অথবা [`jest.mock()`](https://facebook.github.io/jest/docs/en/tutorial-react-native.html#mock-native-modules-using-jestmock) ব্যবহার করার পরামর্শ দিয়ে থাকি।

* * *

### `isElement()` {#iselement}

```javascript
isElement(element)
```

`element` যদি কোন React element হয়ে থাকে তাহলে রিটার্ন করে।

* * *

### `isElementOfType()` {#iselementoftype}

```javascript
isElementOfType(
  element,
  componentClass
)
```

`element` যদি একটি React element হয় যার টাইপ হল একটি React `componentClass` এর তাহলে `true` রিটার্ন করে।

* * *

### `isDOMComponent()` {#isdomcomponent}

```javascript
isDOMComponent(instance)
```

Returns `true` if `instance` is a DOM component (such as a `<div>` or `<span>`).
`instance` যদি একটি DOM কম্পোনেন্ট হয়ে থাকে (যেমনঃ `<div>` অথবা `<span>`) তাহলে `true` রিটার্ন করে।

* * *

### `isCompositeComponent()` {#iscompositecomponent}

```javascript
isCompositeComponent(instance)
```

`instance` যদি একটি ইউজার দ্বারা ডিফাইনকৃত কম্পোনেন্ট, যেমনঃ একটি ক্লাস অথবা একটি ফাংশন হয়ে থাকে তাহলে `true` রিটার্ন করে।

* * *

### `isCompositeComponentWithType()` {#iscompositecomponentwithtype}

```javascript
isCompositeComponentWithType(
  instance,
  componentClass
)
```

Returns `true` if `instance` is a component whose type is of a React `componentClass`.

* * *

### `findAllInRenderedTree()` {#findallinrenderedtree}

```javascript
findAllInRenderedTree(
  tree,
  test
)
```

Traverse all components in `tree` and accumulate all components where `test(component)` is `true`. This is not that useful on its own, but it's used as a primitive for other test utils.

* * *

### `scryRenderedDOMComponentsWithClass()` {#scryrendereddomcomponentswithclass}

```javascript
scryRenderedDOMComponentsWithClass(
  tree,
  className
)
```

Finds all DOM elements of components in the rendered tree that are DOM components with the class name matching `className`.

* * *

### `findRenderedDOMComponentWithClass()` {#findrendereddomcomponentwithclass}

```javascript
findRenderedDOMComponentWithClass(
  tree,
  className
)
```

Like [`scryRenderedDOMComponentsWithClass()`](#scryrendereddomcomponentswithclass) but expects there to be one result, and returns that one result, or throws exception if there is any other number of matches besides one.

* * *

### `scryRenderedDOMComponentsWithTag()` {#scryrendereddomcomponentswithtag}

```javascript
scryRenderedDOMComponentsWithTag(
  tree,
  tagName
)
```

Finds all DOM elements of components in the rendered tree that are DOM components with the tag name matching `tagName`.

* * *

### `findRenderedDOMComponentWithTag()` {#findrendereddomcomponentwithtag}

```javascript
findRenderedDOMComponentWithTag(
  tree,
  tagName
)
```

Like [`scryRenderedDOMComponentsWithTag()`](#scryrendereddomcomponentswithtag) but expects there to be one result, and returns that one result, or throws exception if there is any other number of matches besides one.

* * *

### `scryRenderedComponentsWithType()` {#scryrenderedcomponentswithtype}

```javascript
scryRenderedComponentsWithType(
  tree,
  componentClass
)
```

Finds all instances of components with type equal to `componentClass`.

* * *

### `findRenderedComponentWithType()` {#findrenderedcomponentwithtype}

```javascript
findRenderedComponentWithType(
  tree,
  componentClass
)
```

Same as [`scryRenderedComponentsWithType()`](#scryrenderedcomponentswithtype) but expects there to be one result and returns that one result, or throws exception if there is any other number of matches besides one.

***

### `renderIntoDocument()` {#renderintodocument}

```javascript
renderIntoDocument(element)
```

Render a React element into a detached DOM node in the document. **This function requires a DOM.** It is effectively equivalent to:

```js
const domContainer = document.createElement('div');
ReactDOM.render(element, domContainer);
```

> Note:
>
> You will need to have `window`, `window.document` and `window.document.createElement` globally available **before** you import `React`. Otherwise React will think it can't access the DOM and methods like `setState` won't work.

* * *

## Other Utilities {#other-utilities}

### `Simulate` {#simulate}

```javascript
Simulate.{eventName}(
  element,
  [eventData]
)
```

Simulate an event dispatch on a DOM node with optional `eventData` event data.

`Simulate` has a method for [every event that React understands](/docs/events.html#supported-events).

**Clicking an element**

```javascript
// <button ref={(node) => this.button = node}>...</button>
const node = this.button;
ReactTestUtils.Simulate.click(node);
```

**Changing the value of an input field and then pressing ENTER.**

```javascript
// <input ref={(node) => this.textInput = node} />
const node = this.textInput;
node.value = 'giraffe';
ReactTestUtils.Simulate.change(node);
ReactTestUtils.Simulate.keyDown(node, {key: "Enter", keyCode: 13, which: 13});
```

> Note
>
> You will have to provide any event property that you're using in your component (e.g. keyCode, which, etc...) as React is not creating any of these for you.

* * *
