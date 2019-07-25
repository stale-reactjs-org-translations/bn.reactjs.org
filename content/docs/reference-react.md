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

React লাইব্রেরীর একদম শুরুর API হল `React`। আপনি যদি `<script>` ট্যাগ থেকে React লোড করেন, এই টপ ্লেভেল APIগুলো আপনারা `React` গ্লোবালে পাবেন। আপনি যদি ES6 এর সাথে npm ব্যবহার করে থাকেন, লিখতে পারেন `import React from 'react'`। আপনি যদি ES5 এর সাথে npm ব্যবহার করে থাকেন, লিখতে পারেন `var React = require('react')`। 

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
> `React.PureComponent`এর `shouldComponentUpdate()` খুব অগভীরভাবে অব্জেক্টের মধ্যে তুলনা করে। যদি এদের মধ্যে জটিল ডাটা স্ট্রাকচার থাকে তবে, হায়ারার্কি ট্রির খুব গভীরে থাকা কোন অসমতার জন্য ফলস-নেগেটিভ ফলাফল দিতে পারে। যখন আপনার প্রপ এবং স্টেট একদম সরল হবে তখনই শুধুমাত্র `PureComponent` এক্সটেন্ড করবেন। আর যদি আপনি জেনে থাকেন ডাটা স্ট্রাকচারের গভীরে কিছু পরিবর্তন হয়ে আছে তবে [`forceUpdate()`](/docs/react-component.html#forceupdate) ব্যবহার করুন। অথবা, খুব দ্রুত এ ধরণের নেস্টেড ডেটা তুলনা করবার জন্য [immutable objects](https://facebook.github.io/immutable-js/) ব্যবহার করতে পারেন।
>
> এছাড়াও, `React.PureComponent` এর `shouldComponentUpdate()` পুরো কম্পোনেন্ট সাবট্রি জুড়েই প্রপ এর যেকোন পরিবর্তনকে অগ্রাহ্য করে। নিশ্চিত করুন যে প্রতিটা চাইল্ড কম্পোনেন্ট ও "পিওর"।

* * *

### `React.memo` {#reactmemo}

```javascript
const MyComponent = React.memo(function MyComponent(props) {
  /* render using props */
});
```

`React.memo` হচ্ছে একটি [উঁচু স্তরের কম্পোনেন্ট](/docs/higher-order-components.html). এটা [`React.PureComponent`](#reactpurecomponent) এর মতোই তবে শুধু ফাংশন কম্পোনেন্ট এর জন্য, ক্লাসের জন্য নয়। 

যদি আপনার ফাংশন কম্পোনেন্ট একই প্রপের জন্য একই ফলাফল দিয়ে থাকে, তাহলে আপনি একে `React.memo` এর জন্য একটি কল এ wrap করে ফেলতে পারেন। এটি  কিছু কিছু ক্ষেত্রে ফলাফলগুলোকে মনে রাখার মাধ্যমে(memoizing) অ্যাপ্লিকেশনের কার্যক্ষমতা বাড়িয়ে দিতে পারে। অর্থাৎ, React বার বার কম্পোনেন্টটি রেন্ডার না করে সর্বশেষ রেন্ডার করা ফলাফল মনে রাখবে। 

By default it will only shallowly compare complex objects in the props object. If you want control over the comparison, you can also provide a custom comparison function as the second argument.

```javascript
function MyComponent(props) {
  /* render using props */
}
function areEqual(prevProps, nextProps) {
  /*
  return true if passing nextProps to render would return
  the same result as passing prevProps to render,
  otherwise return false
  */
}
export default React.memo(MyComponent, areEqual);
```

This method only exists as a **[performance optimization](/docs/optimizing-performance.html).** Do not rely on it to "prevent" a render, as this can lead to bugs.

> Note
>
> Unlike the [`shouldComponentUpdate()`](/docs/react-component.html#shouldcomponentupdate) method on class components, the `areEqual` function returns `true` if the props are equal and `false` if the props are not equal. This is the inverse from `shouldComponentUpdate`.

* * *

### `createElement()` {#createelement}

```javascript
React.createElement(
  type,
  [props],
  [...children]
)
```

Create and return a new [React element](/docs/rendering-elements.html) of the given type. The type argument can be either a tag name string (such as `'div'` or `'span'`), a [React component](/docs/components-and-props.html) type (a class or a function), or a [React fragment](#reactfragment) type.

Code written with [JSX](/docs/introducing-jsx.html) will be converted to use `React.createElement()`. You will not typically invoke `React.createElement()` directly if you are using JSX. See [React Without JSX](/docs/react-without-jsx.html) to learn more.

* * *

### `cloneElement()` {#cloneelement}

```
React.cloneElement(
  element,
  [props],
  [...children]
)
```

Clone and return a new React element using `element` as the starting point. The resulting element will have the original element's props with the new props merged in shallowly. New children will replace existing children. `key` and `ref` from the original element will be preserved.

`React.cloneElement()` is almost equivalent to:

```js
<element.type {...element.props} {...props}>{children}</element.type>
```

However, it also preserves `ref`s. This means that if you get a child with a `ref` on it, you won't accidentally steal it from your ancestor. You will get the same `ref` attached to your new element.

This API was introduced as a replacement of the deprecated `React.addons.cloneWithProps()`.

* * *

### `createFactory()` {#createfactory}

```javascript
React.createFactory(type)
```

Return a function that produces React elements of a given type. Like [`React.createElement()`](#createelement), the type argument can be either a tag name string (such as `'div'` or `'span'`), a [React component](/docs/components-and-props.html) type (a class or a function), or a [React fragment](#reactfragment) type.

This helper is considered legacy, and we encourage you to either use JSX or use `React.createElement()` directly instead.

You will not typically invoke `React.createFactory()` directly if you are using JSX. See [React Without JSX](/docs/react-without-jsx.html) to learn more.

* * *

### `isValidElement()` {#isvalidelement}

```javascript
React.isValidElement(object)
```

Verifies the object is a React element. Returns `true` or `false`.

* * *

### `React.Children` {#reactchildren}

`React.Children` provides utilities for dealing with the `this.props.children` opaque data structure.

#### `React.Children.map` {#reactchildrenmap}

```javascript
React.Children.map(children, function[(thisArg)])
```

Invokes a function on every immediate child contained within `children` with `this` set to `thisArg`. If `children` is an array it will be traversed and the function will be called for each child in the array. If children is `null` or `undefined`, this method will return `null` or `undefined` rather than an array.

> Note
>
> If `children` is a `Fragment` it will be treated as a single child and not traversed.

#### `React.Children.forEach` {#reactchildrenforeach}

```javascript
React.Children.forEach(children, function[(thisArg)])
```

Like [`React.Children.map()`](#reactchildrenmap) but does not return an array.

#### `React.Children.count` {#reactchildrencount}

```javascript
React.Children.count(children)
```

Returns the total number of components in `children`, equal to the number of times that a callback passed to `map` or `forEach` would be invoked.

#### `React.Children.only` {#reactchildrenonly}

```javascript
React.Children.only(children)
```

Verifies that `children` has only one child (a React element) and returns it. Otherwise this method throws an error.

> Note:
>
>`React.Children.only()` does not accept the return value of [`React.Children.map()`](#reactchildrenmap) because it is an array rather than a React element.

#### `React.Children.toArray` {#reactchildrentoarray}

```javascript
React.Children.toArray(children)
```

Returns the `children` opaque data structure as a flat array with keys assigned to each child. Useful if you want to manipulate collections of children in your render methods, especially if you want to reorder or slice `this.props.children` before passing it down.

> Note:
>
> `React.Children.toArray()` changes keys to preserve the semantics of nested arrays when flattening lists of children. That is, `toArray` prefixes each key in the returned array so that each element's key is scoped to the input array containing it.

* * *

### `React.Fragment` {#reactfragment}

The `React.Fragment` component lets you return multiple elements in a `render()` method without creating an additional DOM element:

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

You can also use it with the shorthand `<></>` syntax. For more information, see [React v16.2.0: Improved Support for Fragments](/blog/2017/11/28/react-v16.2.0-fragment-support.html).


### `React.createRef` {#reactcreateref}

`React.createRef` creates a [ref](/docs/refs-and-the-dom.html) that can be attached to React elements via the ref attribute.
`embed:16-3-release-blog-post/create-ref-example.js`

### `React.forwardRef` {#reactforwardref}

`React.forwardRef` creates a React component that forwards the [ref](/docs/refs-and-the-dom.html) attribute it receives to another component below in the tree. This technique is not very common but is particularly useful in two scenarios:

* [Forwarding refs to DOM components](/docs/forwarding-refs.html#forwarding-refs-to-dom-components)
* [Forwarding refs in higher-order-components](/docs/forwarding-refs.html#forwarding-refs-in-higher-order-components)

`React.forwardRef` accepts a rendering function as an argument. React will call this function with `props` and `ref` as two arguments. This function should return a React node.

`embed:reference-react-forward-ref.js`

In the above example, React passes a `ref` given to `<FancyButton ref={ref}>` element as a second argument to the rendering function inside the `React.forwardRef` call. This rendering function passes the `ref` to the `<button ref={ref}>` element.

As a result, after React attaches the ref, `ref.current` will point directly to the `<button>` DOM element instance.

For more information, see [forwarding refs](/docs/forwarding-refs.html).

### `React.lazy` {#reactlazy}

`React.lazy()` lets you define a component that is loaded dynamically. This helps reduce the bundle size to delay loading components that aren't used during the initial render.

You can learn how to use it from our [code splitting documentation](/docs/code-splitting.html#reactlazy). You might also want to check out [this article](https://medium.com/@pomber/lazy-loading-and-preloading-components-in-react-16-6-804de091c82d) explaining how to use it in more detail.

```js
// This component is loaded dynamically
const SomeComponent = React.lazy(() => import('./SomeComponent'));
```

Note that rendering `lazy` components requires that there's a `<React.Suspense>` component higher in the rendering tree. This is how you specify a loading indicator.

> **Note**
>
> Using `React.lazy`with dynamic import requires Promises to be available in the JS environment. This requires a polyfill on IE11 and below.

### `React.Suspense` {#reactsuspense}

`React.Suspense` let you specify the loading indicator in case some components in the tree below it are not yet ready to render. Today, lazy loading components is the **only** use case supported by `<React.Suspense>`:

```js
// This component is loaded dynamically
const OtherComponent = React.lazy(() => import('./OtherComponent'));

function MyComponent() {
  return (
    // Displays <Spinner> until OtherComponent loads
    <React.Suspense fallback={<Spinner />}>
      <div>
        <OtherComponent />
      </div>
    </React.Suspense>
  );
}
```

It is documented in our [code splitting guide](/docs/code-splitting.html#reactlazy). Note that `lazy` components can be deep inside the `Suspense` tree -- it doesn't have to wrap every one of them. The best practice is to place `<Suspense>` where you want to see a loading indicator, but to use `lazy()` wherever you want to do code splitting.

While this is not supported today, in the future we plan to let `Suspense` handle more scenarios such as data fetching. You can read about this in [our roadmap](/blog/2018/11/27/react-16-roadmap.html).

>Note:
>
>`React.lazy()` and `<React.Suspense>` are not yet supported by `ReactDOMServer`. This is a known limitation that will be resolved in the future.
