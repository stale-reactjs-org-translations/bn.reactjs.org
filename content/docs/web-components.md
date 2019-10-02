---
id: web-components
title: Web Components
permalink: docs/web-components.html
redirect_from:
  - "docs/webcomponents.html"
---

React এবং [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components) তৈরি করা হয়েছে ভিন্ন ভিন্ন সমস্যা সমাধানের উদ্দ্যেশ্যে। Web Components পুনঃব্যবহারযোগ্য কম্পোনেন্টের জন্য শক্তিশালী বেষ্টনী সরবরাহ করে, অন্যদিকে React একটি ডিক্লেয়ারেটিভ লাইব্রেরী সরবরাহ করে যা আপনাকে DOM কে আপনার ডাটার সাথে মিলিয়ে চলতে সাহায্য করে। উভয়ের উদ্দ্যেশ্যই একে অপরের পরিপূরক। একজন ডেভেলপার হিসেবে, আপনি আপনার Web Components এ React ব্যবহার করতে পারেন, অথবা React এর ভেতর Web Components ব্যবহার করতে পারেন, অথবা উভয়ই করতে পারেন।

অধিকাংশ মানুষ যারা React ব্যবহার করেন তারা Web Components ব্যবহার করেন না, কিন্তু আপনার দরকার পড়তে পারে, বিশেষভাবে আপনি যদি থার্ড-পার্টি কোন UI কম্পোনেন্ট ব্যবহার করেন যা Web Components ব্যবহার করে লিখা।

## React এ Web Components ব্যবহার করা {#using-web-components-in-react}

```javascript
class HelloMessage extends React.Component {
  render() {
    return <div>Hello <x-search>{this.props.name}</x-search>!</div>;
  }
}
```

> বিঃদ্রঃ
>
> Web Components অধিকাংশ সময়েই একটি imperative API প্রদান করে থাকে। এক্ষেত্রে, একটি `video` Web Component `play()` এবং `pause()` ফাংশন দুটি প্রদান করতে পারে। একটি Web Component এর imperative API ব্যবহার করার জন্য একটি ref ব্যবহার করে সরাসরি DOM নোডের সাথে যোগাযোগ করতে হবে। আপনি যদি থার্ড-পার্টি Web Components ব্যবহার করে থাকেন, তাহলে সবচেয়ে ভাল সমাধান হবে একটি React কম্পোনেন্ট লিখা যা আপনার Web Component এর wrapper হিসেবে কাজ করবে।
>
> Web Component দ্বারা এমিট করা ইভেন্টগুলো ঠিকভাবে React রেন্ডার ট্রিতে propagate নাও হতে পারে।
> এই ইভেন্টগুলো হ্যান্ডেল করার জন্য আপনার React কম্পোনেন্টের সাথে ম্যানুয়ালি ইভেন্ট হ্যান্ডলার সংযুক্ত করে নিতে হবে।

One common confusion is that Web Components use "class" instead of "className".

```javascript
function BrickFlipbox() {
  return (
    <brick-flipbox class="demo">
      <div>front</div>
      <div>back</div>
    </brick-flipbox>
  );
}
```

## Web Components এ React ব্যবহার করা {#using-react-in-your-web-components}

```javascript
class XSearch extends HTMLElement {
  connectedCallback() {
    const mountPoint = document.createElement('span');
    this.attachShadow({ mode: 'open' }).appendChild(mountPoint);

    const name = this.getAttribute('name');
    const url = 'https://www.google.com/search?q=' + encodeURIComponent(name);
    ReactDOM.render(<a href={url}>{name}</a>, mountPoint);
  }
}
customElements.define('x-search', XSearch);
```

> বিঃদ্রঃ
>
>এই কোড কাজ **করবেনা** যদি আপনি Babel এর মাধ্যমে class রুপান্তর করেন। [এই ইস্যুতে](https://github.com/w3c/webcomponents/issues/587) এ সম্পর্কিত আলোচনাটি দেখুন।
>এই ইস্যু সমাধান করতে আপনার web components লোড করার পূর্বে [custom-elements-es5-adapter](https://github.com/webcomponents/polyfills/tree/master/packages/webcomponentsjs#custom-elements-es5-adapterjs) সংযুক্ত করুন।
