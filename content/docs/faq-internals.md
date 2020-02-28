---
id: faq-internals
title: ভার্চুয়াল DOM এবং এর অভ্যন্তরীন
permalink: docs/faq-internals.html
layout: docs
category: FAQ
---

### ভার্চুয়াল DOM কি? {#what-is-the-virtual-dom}
ভার্চুয়াল DOM হলো একটা প্রোগ্রামিং ধারণা যেখানে UI এর একটা আদর্শ অথবা ভার্চুয়াল প্রতিনিধি মেমোরিতে রাখা হয় এবং তা প্রকৃত DOM এর সাথে মিলিয়ে রাখা হয় ReactDOM এর মতো লাইব্রেরির মাধ্যমে। এই কাজটাকে বলে [reconciliation](/docs/reconciliation.html)।

এই প্রক্রিয়া React এর ঘোষণাভিত্তিক API কে সচল করেঃ আপনি বলবেন React কে বলবেন কোন state এ UI থাকতে হবে আর React নিশ্চিত করবে যাতে DOM সেই state এ থাকে। এই প্রক্রিয়া attribute manipulation, event handling এবং manual DOM হালনাগাদের মতো কাজ বাদ দেয়, যা অন্যথায় আপনার করতে হত আপনার অ্যাপ তৈরি করতে।

যেহেতু "ভার্চুয়াল DOM" কোনো নির্দিষ্ট টেকনলজির চেয়ে অনেকটা প্যাটার্নের মতো, সেজন্য অনেকে এটা বলে থাকে বিভিন্ন জিনিস বুঝাতে। React এর জগতে, "ভার্চুয়াল DOM" সাধারণত [React elements](/docs/rendering-elements.html) এর সাথে জড়িত যেহেতু এরা UI এর প্রতিনিধিত্বকারী অবজেক্ট। তবে React আবার "ফাইবার" নামক অভ্যন্তরীণ কিছু অবজেক্ট ব্যবহার করে কম্পোনেন্ট সম্পর্কে আরও কিছু তথ্য ধারণ করতে। এগুলোকেও React এ "ভার্চুয়াল DOM" তৈরির অংশ হিসেবে ধরা জেতে পারে।

### Shadow DOM আর Virtual DOM কি একই? {#is-the-shadow-dom-the-same-as-the-virtual-dom}

না, এগুলো আলাদা। Shadow DOM একটা ব্রাউজার টেকনোলজি যা প্রাথমিকভাবে তৈরি করা হয়েছিল ওয়েব কম্পোনেন্টে ভারিয়াবল এবং CSS স্কোপ করার জন্য। ভার্চুয়াল DOM হল একটা ধারণা যা লাইব্রেরির মাধ্যমে জাভাস্ক্রিপ্তে তৈরি করা হয়েছে ব্রাউজার API এর উপরে।

### What is "React Fiber"? {#what-is-react-fiber}

Fiber is the new reconciliation engine in React 16. Its main goal is to enable incremental rendering of the virtual DOM. [Read more](https://github.com/acdlite/react-fiber-architecture).
