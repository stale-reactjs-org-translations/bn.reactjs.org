---
id: typechecking-with-proptypes
title: Typechecking With PropTypes
permalink: docs/typechecking-with-proptypes.html
redirect_from:
  - "docs/react-api.html#typechecking-with-proptypes"
---

> বিঃদ্রঃ
>
> `React.PropTypes` - অন্য একটি প্যাকেজে সরিয়ে নেয়া হয়েছে React v15.5 এর পর থেকে। দয়া করে এর পরিবর্তে [ `prop-types`লাইব্রেরীটি] (https://www.npmjs.com/package/prop-types)ব্যাবহার করুন।
>
>আমরা একটি [codemod স্ক্রিপ্ট](/blog/2017/04/07/react-v15.5.0.html#migrating-from-reactproptypes) সরবরাহ করে থাকি যা দিয়ে স্বয়ংক্রিয়ভাবে পরিবর্তন করা যায়।

আপনার অ্যাপ যত বড় হতে থাকবে টাইপচেকিং এ তত ভুল ধরা পড়তে থাকবে। কিছু অ্যাপের ক্ষেত্রে, টাইপচেকের জন্য আপনি এরকম [Flow](https://flow.org/) অথবা [TypeScript](https://www.typescriptlang.org/) এর মত কিছু জাভাস্ক্রিপ্ট এক্সটেনশন ব্যবহার করতে পারেন। আপনি যদি এগুলো ব্যবহার করতে না চান তাহলে React এর কিছু বিল্ট-ইন টাইপচেকিং এবিলিটি আছে যা আপনি ব্যাবহার করতে পারেন। একটি কম্পোনেন্টের জন্য props এর উপর টাইপচেকিং করতে চাইলে আপনি স্পেশাল `propTypes` প্রোপার্টি এসাইন করতে পারেনঃ:

```javascript
import PropTypes from 'prop-types';

class Greeting extends React.Component {
  render() {
    return (
      <h1>Hello, {this.props.name}</h1>
    );
  }
}

Greeting.propTypes = {
  name: PropTypes.string
};
```

এই উদাহরণে আমরা একটি ক্লাস কম্পোনেন্ট ব্যবহার করছি কিন্তু একই পদ্ধতি আমরা ফাংশন কম্পোনেন্ট বা [`React.memo`](https://reactjs.org/docs/react-api.html#reactmemo) অথবা [`React.forwardRef`](https://reactjs.org/docs/react-api.html#reactforwardref) দ্বারা তৈরিকৃত কম্পোনেন্টের ক্ষেত্রেও ব্যবহার করতে পারি।

`PropTypes` অনেকগুলো ভ্যালিডেটরস এক্সপোর্ট করে যা দিয়ে যাচাই করা হয় আপনার ডাটাগুলো ভ্যালিড কিনা। এই উদাহরণে আমরা `PropTypes.string` ব্যবহার করছি। যখন কোন ইনভ্যালিড ভ্যালু prop এর জন্য দেয়া হয় তখন জাভাস্ক্রিপ্ট কন্সোলে একটি সতর্কবার্তা প্রদর্শন করা হয়। পারফরম্যান্সের স্বার্থে শুধুমাত্র ডেভেলপমেন্ট মোডে `propTypes` চেক করা হয়।

### PropTypes {#proptypes}

এখানে প্রদত্ত বিভিন্ন ভ্যালিডেটরের ডকুমেন্টিং এর একটি উদাহরণ রয়েছেঃ

```javascript
import PropTypes from 'prop-types';

MyComponent.propTypes = {
  // You can declare that a prop is a specific JS type. By default, these
  // are all optional.
  optionalArray: PropTypes.array,
  optionalBool: PropTypes.bool,
  optionalFunc: PropTypes.func,
  optionalNumber: PropTypes.number,
  optionalObject: PropTypes.object,
  optionalString: PropTypes.string,
  optionalSymbol: PropTypes.symbol,

  // Anything that can be rendered: numbers, strings, elements or an array
  // (or fragment) containing these types.
  optionalNode: PropTypes.node,

  // A React element.
  optionalElement: PropTypes.element,

  // A React element type (ie. MyComponent).
  optionalElementType: PropTypes.elementType,

  // You can also declare that a prop is an instance of a class. This uses
  // JS's instanceof operator.
  optionalMessage: PropTypes.instanceOf(Message),

  // You can ensure that your prop is limited to specific values by treating
  // it as an enum.
  optionalEnum: PropTypes.oneOf(['News', 'Photos']),

  // An object that could be one of many types
  optionalUnion: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(Message)
  ]),

  // An array of a certain type
  optionalArrayOf: PropTypes.arrayOf(PropTypes.number),

  // An object with property values of a certain type
  optionalObjectOf: PropTypes.objectOf(PropTypes.number),

  // An object taking on a particular shape
  optionalObjectWithShape: PropTypes.shape({
    color: PropTypes.string,
    fontSize: PropTypes.number
  }),

  // An object with warnings on extra properties
  optionalObjectWithStrictShape: PropTypes.exact({
    name: PropTypes.string,
    quantity: PropTypes.number
  }),   

  // You can chain any of the above with `isRequired` to make sure a warning
  // is shown if the prop isn't provided.
  requiredFunc: PropTypes.func.isRequired,

  // A required value of any data type
  requiredAny: PropTypes.any.isRequired,

  // You can also specify a custom validator. It should return an Error
  // object if the validation fails. Don't `console.warn` or throw, as this
  // won't work inside `oneOfType`.
  customProp: function(props, propName, componentName) {
    if (!/matchme/.test(props[propName])) {
      return new Error(
        'Invalid prop `' + propName + '` supplied to' +
        ' `' + componentName + '`. Validation failed.'
      );
    }
  },

  // You can also supply a custom validator to `arrayOf` and `objectOf`.
  // It should return an Error object if the validation fails. The validator
  // will be called for each key in the array or object. The first two
  // arguments of the validator are the array or object itself, and the
  // current item's key.
  customArrayProp: PropTypes.arrayOf(function(propValue, key, componentName, location, propFullName) {
    if (!/matchme/.test(propValue[key])) {
      return new Error(
        'Invalid prop `' + propFullName + '` supplied to' +
        ' `' + componentName + '`. Validation failed.'
      );
    }
  })
};
```

### রিক্যুয়েরিং সিংগেল চাইল্ড {#requiring-single-child}

`PropTypes.element` এর মাধ্যমে আপনি একটি সিংগেল চাইল্ড একটি নির্দিষ্ট কম্পোনেন্ট এ পাস করতে পারবেন। 

```javascript
import PropTypes from 'prop-types';

class MyComponent extends React.Component {
  render() {
    // This must be exactly one element or it will warn.
    const children = this.props.children;
    return (
      <div>
        {children}
      </div>
    );
  }
}

MyComponent.propTypes = {
  children: PropTypes.element.isRequired
};
```

### ডিফল্ট Prop ভ্যালু {#default-prop-values}

স্পেশাল `defaultProps` প্রোপার্টি তে এসাইন করার মাধ্যমে আপনি আপনার `props` এর জন্য ডিফল্ট ভ্যালু ডিফাইন করতে পারবেন:

```javascript
class Greeting extends React.Component {
  render() {
    return (
      <h1>Hello, {this.props.name}</h1>
    );
  }
}

// Specifies the default values for props:
Greeting.defaultProps = {
  name: 'Stranger'
};

// Renders "Hello, Stranger":
const root = ReactDOM.createRoot(document.getElementById('example')); 
root.render(<Greeting />);
```

<<<<<<< HEAD
আপনি যদি এরকম কোন Babel ট্রান্সফর্ম ব্যাবহার করে থাকেন [ট্রান্সফর্ম-ক্লাস-প্রোপাটিস](https://babeljs.io/docs/plugins/transform-class-properties/) , তাহলে আপনি আপনার `defaultProps` কে React component class এর ভেতর static property হিসেবে ডিক্লেয়ার করতে পারবেন। যদিও এই সিনট্যাক্স টি এখনো ফাইনালাইজড করা হয় নাই এবং একটি ব্রাউজারের ভেতর কাজ করানোর জন্য এর জন্য আরো কম্পাইলেশন স্টেপ এর প্রয়োজন আছে। আরও তথ্যের জন্য, এটি দেখুন [ক্লাস-ফিল্ড-প্রপোজাল](https://github.com/tc39/proposal-class-fields).
=======
Since ES2022 you can also declare `defaultProps` as static property within a React component class. For more information, see the [class public static fields](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Public_class_fields#public_static_fields). This modern syntax will require a compilation step to work within older browsers. 
>>>>>>> f67fa22cc1faee261f9e22449d90323e26174e8e

```javascript
class Greeting extends React.Component {
  static defaultProps = {
    name: 'stranger'
  }

  render() {
    return (
      <div>Hello, {this.props.name}</div>
    )
  }
}
```

`defaultProps` ব্যবহার করা হবে যাতে এটি নিশ্চিত করা যায় যে `this.props.name` এর জন্য একটি ভ্যালু স্পেসিফাইড থাকে যদি এর parent কম্পোনেন্ট দ্বারা একটি ভ্যালু আগে থেকে স্পেসিফাইড না থাকে। `defaultProps` রিসল্ভের পরপরই `propTypes` টাইপচেকিং করা হয়, এতে করে `defaultProps` এর উপরও টাইপচেকিং এপ্লাই করা যায়।

### ফাংশন কম্পোনেন্ট {#function-components}

যদি আপনি আপনার নিয়মিত ডেভেলপমেন্টে ফাংশন কম্পোনেন্ট ব্যবহার করেন, PropTypes যথাযথ প্রয়োগ করার জন্য আপনার কিছু ছোট পরিবর্তন করতে হতে পারে।

চলুন মনে করি আপনার এমন একটি কম্পোনেন্ট আছেঃ

```javascript
export default function HelloWorldComponent({ name }) {
  return (
    <div>Hello, {name}</div>
  )
}
```

PropTypes ব্যবহার করার জন্য, এক্সপোর্ট করার পূর্বে, আপনি হয়ত কম্পোনেন্টকে একটি পৃথক ফাংশন হিসেবে ডিক্লেয়ার করতে পারেন, উদাহরণস্বরূপঃ

```javascript
function HelloWorldComponent({ name }) {
  return (
    <div>Hello, {name}</div>
  )
}

export default HelloWorldComponent
```

এরপর, আপনি সরাসরি PropTypes কে `HelloWorldComponent` কম্পোনেন্টে যুক্ত করতে পারেনঃ

```javascript
import PropTypes from 'prop-types'

function HelloWorldComponent({ name }) {
  return (
    <div>Hello, {name}</div>
  )
}

HelloWorldComponent.propTypes = {
  name: PropTypes.string
}

export default HelloWorldComponent
```
