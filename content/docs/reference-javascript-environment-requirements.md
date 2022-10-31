---
id: javascript-environment-requirements
title: জাভাস্ক্রিপ্ট ইনভায়রনমেন্টের প্রয়োজনীয়তাসমূহ
layout: docs
category: Reference
permalink: docs/javascript-environment-requirements.html
---

React 18 সব মডার্ন ব্রাউজার সাপোর্ট করে(Edge, Firefox, Chrome, Safari, ইত্যাদি)।

যদি আপনি পুরনো ব্রাউজার বা ডিভাইস যেমন ইন্টারনেট এক্সপ্লোরার সাপোর্ট করে থাকেন যাতে মডার্ন ব্রাউজার ফিচারগুলো নেটিভলি নেই বা non-compliant ইমপ্লিমেন্টেশন ব্যবহার করে, সেক্ষেত্রে আপনি একটি গ্লোবাল পলিফিল ব্যবহার করার কথা চিন্তা করে দেখতে পারেন। 

React 18 এ নিচের মডার্ন ফিচারগুলো ব্যবহৃত হয়ঃ
- [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [`Symbol`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol)
- [`Object.assign`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)

এই ফিচারগুলোর সঠিক পলিফিল আপনার environment এর উপর নির্ভর করে। অধিকাংশ ব্যবহারকারীর ক্ষেত্রে, আপনি আপনার [Browserlist](https://github.com/browserslist/browserslist) সেটিংস কনফিগার করে নিতে পারেন। অন্যদের ক্ষেত্রে আপনার [`core-js`](https://github.com/zloirock/core-js) এর মত পলিফিল সরাসরি ইম্পোর্ট করতে হতে পারে।
