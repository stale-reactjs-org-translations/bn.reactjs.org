---
id: cdn-links
title: CDN লিংকসমূহ 
permalink: docs/cdn-links.html
prev: create-a-new-react-app.html
next: release-channels.html
---

React এবং ReactDOM উভয়ই CDN-এ পাওয়া যায়।

```html
<script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
```

উপরের ভার্সনগুলো শুধুমাত্র ডেভেলপমেন্টের জন্য নির্দেশিত, এবং প্রোডাকশনের জন্য উপযুক্ত নয়। React এর সংক্ষেপিত এবং নিখুঁত প্রোডাকশন ভার্সন এখানে পাওয়া যাবেঃ

```html
<script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
```

<<<<<<< HEAD
`react` এবং `react-dom` এর নির্দিষ্ট ভার্সন পেতে, `17` এর স্থানে অন্য ভার্সন সংখ্যা প্রতিস্থাপন করুন।
=======
To load a specific version of `react` and `react-dom`, replace `18` with the version number.
>>>>>>> 8fe817e61e5fe50020ed9379ce9e1c5a2cf476a9

### `crossorigin` অ্যাট্রিবিউটটি কেন? {#why-the-crossorigin-attribute}

আপনি যদি একটি CDN থেকে React সার্ভ করেন, তবে আমরা [`crossorigin`](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes) অ্যাট্রিবিউটটি রাখার পরামর্শ দেইঃ

```html
<script crossorigin src="..."></script>
```

আমরা আরো সুপারিশ করি যে, আপনি যেই CDN ব্যবহার করছেন তাতে `Access-Control-Allow-Origin: *` HTTP হেডার আছে কি না তা যাচাই করে দেখতেঃ

![Access-Control-Allow-Origin: *](../images/docs/cdn-cors-header.png)

এটি React 16 এবং এর পরবর্তী ভার্সনগুলোতে আরো ভালো [ইরর হ্যান্ডেল করার অভিজ্ঞতা](/blog/2017/07/26/error-handling-in-react-16.html) দেয়।
