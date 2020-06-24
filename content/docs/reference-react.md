---
id: react-api
title: React Top-Level API
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

React লাইব্রেরির entry point হচ্ছে `React`। আপনি যদি `<script>` tag এর মাধ্যমে React লোড করেন, তাহলে এই top-level API গুলো গ্লোবাল ভ্যারিয়েবল `React` এ পাবেন। যদি ES6 ব্যবহার করেন npm এর মাধ্যমে তাহলে `import React from 'react'` ব্যবহার করতে পারেন। আর যদি ES5 ব্যবহার করেন npm এর মাধ্যমে তবে `var React = require('react')` ব্যবহার করতে পারেন।

## সারমর্ম {#overview}

### Components {#components}

React এর component ব্যবহার করে আপনার UI কে স্বাধীন, পুনঃব্যবহারযোগ্য কতগুলো খন্ডে ভাগ করতে পারবেন। এই খন্ডগুলো নিয়ে আলাদা করে ভাবতে পারবেন। `React.Component` বা `React.PureComponent` এর subclass হিসেবে নতুন React component তৈরি করতে পারবেন।

 - [`React.Component`](#reactcomponent)
 - [`React.PureComponent`](#reactpurecomponent)

`create-react-class` module টি ব্যবহার করতে পারেন যদি ES6 ব্যবহার না করেন। আরও তথ্যের জন্য দেখুন [Using React without ES6](/docs/react-without-es6.html)।

ফাংশন হিসেবেও React কম্পোনেন্ট তৈরি করা যায়। এই ফাংশনকে  wrap করাও সম্ভবঃ

- [`React.memo`](#reactmemo)

### React Element তৈরি {#creating-react-elements}

আমরা UI এর কোড লেখার ক্ষেত্রে [JSX](/docs/introducing-jsx.html) ব্যবহার করতে উৎসাহিত করি।  JSX এর element গুলো [`React.createElement()`](#createelement) ব্যবহারের জন্য একটি সহজ করে দেয়া উপায় মাত্র (sytactic sugar)। JSX ব্যবহার করলে নিচের method গুলো সাধারণত ব্যবহার করা হয় না।

- [`createElement()`](#createelement)
- [`createFactory()`](#createfactory)

আরও তথ্যের জন্য এখানে দেখুন - [Using React without JSX](/docs/react-without-jsx.html) ।

### Element এর পরিবর্তন {#transforming-elements}

Element গুলোকে প্রয়োজনমত পরিবর্তনের জন্য `React` কিছু API দেয়:

- [`cloneElement()`](#cloneelement)
- [`isValidElement()`](#isvalidelement)
- [`React.Children`](#reactchildren)

### Fragments {#fragments}

কোন wrapper ছাড়াই একাধিক element রেন্ডার করার জন্য `React` একটি বিশেষ কম্পোনেন্ট দেয়।

- [`React.Fragment`](#reactfragment)

### Refs {#refs}

- [`React.createRef`](#reactcreateref)
- [`React.forwardRef`](#reactforwardref)

### Suspense {#suspense}

রেন্ডার করার আগে কম্পোনেন্টকে অপেক্ষা করাতে Suspense ব্যবহার করা যায়। বর্তমানে Suspense দিয়ে শুধু একটি কাজই করা যায়: [`React.lazy` এর মাধ্যমে কম্পোনেন্টকে dynamic ভাবে লোড করা](/docs/code-splitting.html#reactlazy)।

- [`React.lazy`](#reactlazy)
- [`React.Suspense`](#reactsuspense)

### Hooks {#hooks}

React 16.8 এর নতুন সংযোজন হচ্ছে *Hooks*। এর মাধ্যমে ক্লাস ব্যবহার না করেই স্টেট ও React এর অন্যান্য সুবিধা কাজে লাগানো যায়। *Hook* নিয়ে [আলাদা docs section](/docs/hooks-intro.html) আছে এবং একটি আলাদা API রেফারেন্সঃ

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

## Reference {#reference}

### `React.Component` {#reactcomponent}

[ES6 ক্লাস](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes) দিয়ে React কম্পোনেন্ট তৈরির জন্য `React.Component` হচ্ছে base ক্লাসঃ

```javascript
class Greeting extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

[React.Component API রেফারেন্সে](/docs/react-component.html) `React.Component` ক্লাস সম্পর্কিত কিছু method এবং property  এর তালিকা রয়েছে।

* * *

### `React.PureComponent` {#reactpurecomponent}

`React.PureComponent` ও [`React.Component`](#reactcomponent) একই ধরণের। শুধু পার্থক্য হচ্ছে [`React.Component`](#reactcomponent) [`shouldComponentUpdate()`](/docs/react-component.html#shouldcomponentupdate) কে implement করে না। কিন্তু `React.PureComponent` অগভীর (shallow) prop এবং স্টেট তুলনার মাধ্যমে implement এর কাজটি করে।

যদি আপনার React কম্পোনেন্টের `render()` ফাংশন নির্দির্ষ্ট স্টেট আর props এর জন্য প্রতিবার একই ফলাফল দেয়, তাহলে কিছু ক্ষেত্রে `React.PureComponent` ব্যবহার করে আরও দ্রুত একই কাজ করা সম্ভব।

> নোট
>
> `React.PureComponent` এর `shouldComponentUpdate()` শুধুমাত্র অগভীরভাবে (shallow) object সমূহের তুলনা করে। যদি এদের মধ্যে জটিল কোন data structure থাকে তাহলে false-negetive ফলাফল তৈরি করতে পারে গভীরতর পার্থক্যের জন্য। শুধুমাত্র সহজ prop ও state ব্যবহারের করলেই `PureComponent` কে extend করা উচিত। অথবা [`forceUpdate()`](/docs/react-component.html#forceupdate) ব্যবহার করা যেতে পারে যখন জানা যাবে যে জটিল data structure এর গভীরে কোন পরিবর্তন হয়েছে। অথবা [immutable objects](https://facebook.github.io/immutable-js/) ব্যবহার করা যেতে পারে যেন nested data এর দ্রুত তুলনা করা সম্ভব হয়।
>
> তদুপরি, `React.PureComponent` এর `shouldComponentUpdate()` prop এর পরিবর্তন এড়িয়ে যায় পুরো কম্পোনেন্ট subtree এর জন্যই। নিশ্চিত করুন যে সকল children কম্পোনেন্ট ও "pure"।

* * *

### `React.memo` {#reactmemo}

```javascript
const MyComponent = React.memo(function MyComponent(props) {
  /* render using props */
});
```

`React.memo` একটি [higher order কম্পোনেন্ট](/docs/higher-order-components.html)। এটি [`React.PureComponent`](#reactpurecomponent) এর মতই। কিন্তু এটি ফাংশন কম্পোনেন্টের জন্য, ক্লাসের জন্য নয়।

যদি আপনার ফাংশন কম্পোনেন্ট নির্দির্ষ্ট props এর জন্য প্রতিবার একই জিনিস রেন্ডার করে, তাহলে তাকে `React.memo` এর call এর মধ্যে wrap করতে পারেন। এই উপায়ে কিছু ক্ষেত্রে memoizing এর মাধ্যমে দ্রুত ফলাফল তৈরি করতে পারে। এর মানে React এই component টি render করা এড়িয়ে গিয়ে সর্বশেষ render টি ব্যবহার করবে।

`React.memo` শুধু prop এর পরিবর্তনের দিকে খেয়াল রাখে। যদি `React.memo` দিয়ে wrap করা ফাংশন কম্পোনেন্টটিতে [`useState`](/docs/hooks-state.html) বা [`useContext`](/docs/hooks-reference.html#usecontext) ব্যবহার হয়ে থাকে তাহলে স্টেট বা context এর পরিবর্তনের ক্ষেত্রে পুনরায় রেন্ডার করা হবে।

সাধারণ ক্ষেত্রে এটি props এর জটিল অবজেক্টগুলোকে শুধু অগভীরভাবেই তুলনা করবে। যদি এই তুলনার উপায়কে নিয়ন্ত্রণ করতে চান তাহলে আলাদা comparison ফাংশন প্রয়োগ করতে পারেন দ্বিতীয় আর্গুমেন্ট হিসাবে।

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

এই method টি শুধুমাত্র **[performance optimization](/docs/optimizing-performance.html)** এর জন্যই। রেন্ডার এড়ানোর জন্য এটি ব্যবহার করবেন না, নয়তো bug তৈরি করতে পারে।

> নোট 
>
> props একই হলে `areEqual` ফাংশনটি true এবং ভিন্ন হলে false রিটার্ন করে। ক্লাস কম্পোনেন্টের [`shouldComponentUpdate()`](/docs/react-component.html#shouldcomponentupdate) করে ঠিক উল্টো কাজ।

* * *

### `createElement()` {#createelement}

```javascript
React.createElement(
  type,
  [props],
  [...children]
)
```

এই ফাংশনটি প্রদত্ত type এর নতুন একটি [React element](/docs/rendering-elements.html) তৈরি করে তা return করে। type আর্গুমেন্টটি হয় একটি ট্যাগের নাম (যেমন `'div'` বা `'span'`), অথবা [React কম্পোনেন্ট](/docs/components-and-props.html) টাইপের (ক্লাস বা ফাংশন), নয়ত [React fragment](#reactfragment) টাইপের হতে পারে।

[JSX](/docs/introducing-jsx.html) এ লেখা কোড থেকে `React.createElement()` ব্যবহার কোডে পরিবর্তন করা হয়। JSX ব্যবহার করা হলে সাধারণত `React.createElement()` সরাসরি ব্যবহার করা হয় না। আরও জানতে দেখুন [React Without JSX](/docs/react-without-jsx.html) ।

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

`React.Suspense` lets you specify the loading indicator in case some components in the tree below it are not yet ready to render. Today, lazy loading components is the **only** use case supported by `<React.Suspense>`:

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
