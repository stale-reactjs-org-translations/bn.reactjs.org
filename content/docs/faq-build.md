---
id: faq-build
title: Babel, JSX, and Build Steps
permalink: docs/faq-build.html
layout: docs
category: FAQ
---

### React এর সাথে কি আমার JSX ব্যবহার করতে হবে? {#do-i-need-to-use-jsx-with-react}

না! বিস্তারিত জানতে ["JSX ছাড়া React"](/docs/react-without-jsx.html) দেখুন।

### আমার কি React এর সাথে ES6 (+) ব্যবহার করতে হবে? {#do-i-need-to-use-es6--with-react}

না! বিস্তারিত জানতে  ["ES6 ছাড়া React"](/docs/react-without-es6.html) দেখুন।

### আমি কিভাবে JSX এ কমেন্ট লিখব?{#how-can-i-write-comments-in-jsx}

```jsx
<div>
  {/* এখানে কমেন্ট হবে */}
  Hello, {name}!
</div>
```

```jsx
<div>
  {/* একাধিক লাইনের
  কমেন্টের জন্যও
  এটি কাজ করে */}
  Hello, {name}! 
</div>
```
