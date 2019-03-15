---
id: faq-styling
title: Styling এবং CSS
permalink: docs/faq-styling.html
layout: docs
category: FAQ
---

### আমি কিভাবে কম্পোনেন্টের সাথে CSS ক্লাস যুক্ত করবো? {#how-do-i-add-css-classes-to-components}

একটা string-কে `className` prop হিসেবে পাঠাওঃ

```jsx
render() {
  return <span className="menu navigation-menu">Menu</span>
}
```

কম্পোনেন্টের prop বা state এর ওপর CSS class নির্ভর করা স্বাভাবিকঃ

```jsx
render() {
  let className = 'menu';
  if (this.props.isActive) {
    className += ' menu-active';
  }
  return <span className={className}>Menu</span>
}
```

>পরামর্শ
>
>যদি আপনি প্রায়ই এরকম code লিখে থাকেন, তাহলে  [classnames](https://www.npmjs.com/package/classnames#usage-with-reactjs) প্যাকেজ এটি সহজ করতে পারে।

### আমি কি inline style ব্যবহার করতে পারি? {#can-i-use-inline-styles}

হ্যা, styling এর উপর ডকুমেন্টটা দেখুন [এখানে](/docs/dom-elements.html#style)।

### Inline styles কি খারাপ? {#are-inline-styles-bad}

CSS class সাধারণত পারফরমান্সের দিক দিয়ে inline style এর থেকে ভালো।

### CSS-in-JS কি?{#what-is-css-in-js}

"CSS-in-JS" বলতে এমন একটা প্যাটার্নকে বুঝায় যেখানে CSS-কে বাহিরের কোনো ফাইলে না লিখে JavaScript এর ভিতর লেখা করা হয়।     CSS-in-JS লাইব্রেরিগুলোর পার্থক্য দেখুন [এখানে](https://github.com/MicheleBertoli/css-in-js)।

_বিঃদ্রঃ এই ফিচারটি React এর অংশ নয়, বরং তৃতীয়-পক্ষের লাইব্রেরি এই ফিচারটি দিয়ে থাকে।_ কিভাবে স্টাইল লেখা উচিত সে সম্পর্কে React এর কোনো পরামর্শ নেই। যদি সিদ্ধান্তহীনতা থাকে, তাহলে আলাদা একটা `*.css` ফাইলে স্বাভাবিকভাবে স্টাইল লিখে [`className`](/docs/dom-elements.html#classname) এর সাহায্যে তা ব্যবহার করার মাধ্যমে শুরু করতে পারো।

### আমি কি React এ অ্যানিমেশন করতে পারি?{#can-i-do-animations-in-react}

অ্যানিমেশনের জন্য React-কে ব্যবহার করা যেতে পারে। আরোও জানতে [React Transition Group](https://reactcommunity.org/react-transition-group/) এবং [React Motion](https://github.com/chenglou/react-motion) দেখুন।
