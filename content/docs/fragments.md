---
id: fragments
title: Fragments
permalink: docs/fragments.html
---

React এর একটি সাধারণ প্যাটার্ন হল একটি কম্পোনেন্ট থেকে একাধিক elements রিটার্ন করা। Fragments আপনাকে children এর একটি তালিকাকে গ্রুপ করতে সাহায্য করে DOM-এ কোন অতিরিক্ত নোড সংযুক্ত না করেই।

```js
render() {
  return (
    <React.Fragment>
      <ChildA />
      <ChildB />
      <ChildC />
    </React.Fragment>
  );
}
```

এটি ডিক্লেয়ার করার একটি নতুন [সংক্ষিপ্ত syntax](#short-syntax)-ও রয়েছে।

## প্রেরণা {#motivation}

কম্পোনেন্টের একটি সাধারণ প্যাটার্ন হল children এর একটি তালিকা রিটার্ন করা। উদাহরণস্বরূপ এই React snippet টি দেখুনঃ

```jsx
class Table extends React.Component {
  render() {
    return (
      <table>
        <tr>
          <Columns />
        </tr>
      </table>
    );
  }
}
```

`<Columns />` এর এক্ষেত্রে একাধিক `<td>` elements রিটার্ন করতে হবে যাতে রেন্ডারকৃত HTML বৈধ হয়। যদি একটি parent div `<Columns />` এর `render()` এ ব্যবহার করা হয়ে থাকে, তাহলে রেন্ডারকৃত HTML অবৈধ হবে।

```jsx
class Columns extends React.Component {
  render() {
    return (
      <div>
        <td>Hello</td>
        <td>World</td>
      </div>
    );
  }
}
```

যা একটি `<Table />` আউটপুট প্রদান করেঃ

```jsx
<table>
  <tr>
    <div>
      <td>Hello</td>
      <td>World</td>
    </div>
  </tr>
</table>
```

Fragments এই সমস্যার সমাধান করে।

## ব্যবহারবিধি {#usage}

```jsx{4,7}
class Columns extends React.Component {
  render() {
    return (
      <React.Fragment>
        <td>Hello</td>
        <td>World</td>
      </React.Fragment>
    );
  }
}
```

যা একটি সঠিক `<Table />` আউটপুট প্রদান করেঃ

```jsx
<table>
  <tr>
    <td>Hello</td>
    <td>World</td>
  </tr>
</table>
```

### সংক্ষিপ্ত Syntax {#short-syntax}

fragments ডিক্লেয়ার করার জন্য একটি নতুন সংক্ষিপ্ত syntax রয়েছে যা আপনি ব্যবহার করতে পারেন। এটি দেখতে খালি ট্যাগের মতঃ

```jsx{4,7}
class Columns extends React.Component {
  render() {
    return (
      <>
        <td>Hello</td>
        <td>World</td>
      </>
    );
  }
}
```

আপনি অন্যান্য element এর মতই `<></>` ব্যবহার করতে পারেন, শুধুমাত্র এক্ষেত্রে এটি keys অথবা এট্রিবিউট সাপোর্ট করবেনা।

### Keyed Fragments {#keyed-fragments}

যেসকল Fragments স্পষ্টভাবে `<React.Fragment>` এর মাধ্যমে ডিক্লেয়ার করা হয় সেগুলোর keys থাকতে পারে। ব্যবহারের ক্ষেত্রে এর একটি দিক হতে পারে একটি কালেকশনকে fragments এর একটি এরেতে ম্যাপ করা -- উদাহরণস্বরূপ, একটি description list তৈরির ক্ষেত্রেঃ

```jsx
function Glossary(props) {
  return (
    <dl>
      {props.items.map(item => (
        // Without the `key`, React will fire a key warning
        <React.Fragment key={item.id}>
          <dt>{item.term}</dt>
          <dd>{item.description}</dd>
        </React.Fragment>
      ))}
    </dl>
  );
}
```

`Fragment` এর এট্রিবিউট হিসেবে শুধুমাত্র `key` পাস করা যায়। ভবিষ্যতে, আমরা ইভেন্ট হ্যান্ডলারের মত অতিরিক্ত এট্রিবিউট এর সাপোর্ট সংযুক্ত করতে পারি।

### লাইভ ডেমো {#live-demo}

আপনি নতুন JSX fragment syntax টি এই [কোডপেনে](https://codepen.io/reactjs/pen/VrEbjE?editors=1000) চালিয়ে দেখতে পারেন।
