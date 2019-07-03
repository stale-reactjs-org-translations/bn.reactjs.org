---
id: create-a-new-react-app
title: নতুন একটি React অ্যাপ তৈরী করুন
permalink: docs/create-a-new-react-app.html
redirect_from:
  - "docs/add-react-to-a-new-app.html"
prev: add-react-to-a-website.html
next: cdn-links.html
---

আরো ভালো ইউজার এবং ডেভেলপার এক্সপেরিয়েন্স পেতে কোনো একটি ইন্টিগ্রেটেড টুলচেইন ব্যবহার করুন।

এই পৃষ্ঠায় কিছু জনপ্রিয় React টুলচেইন নিয়ে আলোচনা করা হয়েছে যা নিম্নরূপ কাজগুলোর ক্ষেত্রে সাহায্য করবেঃ

* ফাইল এবং কম্পোনেন্টসমূহ স্কেল করা।
* npm থেকে থার্ড-পার্টি লাইব্রেরীসমূহ ব্যবহার করা।
* সাধারণ ভুলগুলো দ্রুত সনাক্ত করা।
* ডেভেলপমেন্টের সময় CSS এবং JS লাইভ-এডিট করা।
* প্রোডাকশনের জন্য আউটপুট অপটিমাইজ করা। 

এই পৃষ্ঠায় নির্দেশিত টুলচেইনসমূহ **প্রাথমিকক্ষেত্রে কনফিগারেশন করার প্রয়োজন নেই**।

## আপনার হয়তো টুলচেইনের প্রয়োজন নাও হতে পারে {#you-might-not-need-a-toolchain}

আপনি যদি উপরে আলোচিত সমস্যাগুলির সম্মুখীন না হন অথবা জাভাস্ক্রিপ্ট টুলগুলো ব্যবহার করতে ভালো না লেগে থাকে, তবে [HTML পেইজে React- কে `<script>` ট্যাগে যুক্ত করুন](/docs/add-react-to-a-website.html), অন্যক্ষেত্রে [JSX এর সাথে](/docs/add-react-to-a-website.html#optional-try-react-with-jsx)।

এছাড়াও এটা **React- কে একটি বিদ্যমান ওয়েবসাইটের সাথে একীভূত করার সহজতম উপায়।** আপনি চাইলে যেকোন সময় আপনার সুবিধা অনুযায়ী বৃহত্তর টুলচেইন যুক্ত করতে পারেন।

## সুপারিশকৃত টুলচেইনসমূহ {#recommended-toolchains}

React টিম প্রাথমিকভাবে এই সমাধানসমূহের পরামর্শ দেয়ঃ  

- আপনি যদি **React শিক্ষানবিস** হন অথবা **নতুন একটি [সিঙ্গেল-পেইজ](/docs/glossary.html#single-page-application) অ্যাপ তৈরী করছেন**, তবে [Create React App](#create-react-app) ব্যবহার করুন ।
- আপনি যদি **Node.js দিয়ে একটি সার্ভার-রেন্ডার্ড ওয়েবসাইট** বানাতে চান, তবে [Next.js](#nextjs) ব্যবহার করে দেখুন।
- আপনি যদি একটি **স্ট্যাটিক কনটেন্ট-ওরিয়েন্টেড ওয়েবসাইট** বানাতে চান, তবে [Gatsby](#gatsby) ব্যবহার করে দেখুন।
- আপনি যদি একটি **কম্পোনেন্ট লাইব্রেরী** বানাতে চান অথবা **বিদ্যমান কোডবেজের সাথে একীভূত করতে চান, তবে [আরও সহজে ব্যবহারযোগ্য টুলচেইনসমূহ](#more-flexible-toolchains) ব্যবহার করে দেখুন।**

### Create React App {#create-react-app}

[Create React App](https://github.com/facebookincubator/create-react-app) হচ্ছে **React শিখার** জন্য একটি সুবিধাজনক ইনভায়রনমেন্ট, এবং React এ **নতুন একটি [সিঙ্গেল-পেইজ](/docs/glossary.html#single-page-application) অ্যাপ্লিকেশন** বানানো শুরু করার জন্য সবচেয়ে ভালো পন্থা।

<<<<<<< HEAD
এটা আপনার ডেভেলপমেন্ট ইনভায়রনমেন্ট সেট-আপ করে দিবে যাতে করে আপনি জাভাস্ক্রিপ্টের সর্বশেষ ফিচারসমূহ ব্যবহার করতে পারেন, সুন্দর ডেভেলপার এক্সপেরিইয়েন্স উপভোগ করতে পারেন, এবং প্রোডাকশনের জন্য অ্যাপকে আরো নিখুঁত করতে পারেন। এর জন্য আপনার যন্ত্রে Node >= 8.10 এবং npm >= 5.6 থাকতে হবে। একটি প্রোজেক্ট তৈরী করতে, চালনা করুনঃ
=======
It sets up your development environment so that you can use the latest JavaScript features, provides a nice developer experience, and optimizes your app for production. You’ll need to have Node >= 8.10 and npm >= 5.6 on your machine. To create a project, run:
>>>>>>> ed9d73105a93239f94d84c619e84ae8adec43483

```bash
npx create-react-app my-app
cd my-app
npm start
```

>বিঃদ্রঃ
>
>প্রথম লাইনে `npx` কোন আক্ষরিক ত্রুটি নয় -- এটি [package চালনা করার একটি টুল যা npm 5.2+ এর সাথে আসে](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b)।

Create React App ব্যাকএন্ডের লজিক বা ডাটাবেইজ নিয়ন্ত্রণ করে না; এটা শুধু ফ্রন্টএন্ডে গঠিত পাইপলাইন তৈরী করে, যেন আপনি চাইলে যেকোনো ব্যাকএন্ডের সাথে ব্যবহার করতে পারেন। আড়ালে, এটি [Babel](https://babeljs.io/) এবং [webpack](https://webpack.js.org/) ব্যবহার করে, কিন্তু এগুলো সম্পর্কে আপনার কিছু না জানলেও চলবে।

যখন আপনি প্রোডাকশনের এর জন্য ডিপ্লয় করতে প্রস্তুত, `npm run build` চালনা করলে আপনার অ্যাপের `build` ফোল্ডারে একটি সংক্ষেপিত কাঠামো তৈরী করবে। আপনি [এই README থেকে](https://github.com/facebookincubator/create-react-app#create-react-app--) এবং এই [ইউজার গাইডটি](https://facebook.github.io/create-react-app/) থেকে Create React App সম্পর্কে আরো জানতে পারেন।

### Next.js {#nextjs}

[Next.js](https://nextjs.org/) **স্ট্যাটিক এবং সার্ভার-রেন্ডার্ড অ্যাপ্লিকেশনসমূহের** জন্য React দিয়ে গঠিত একটি জনপ্রিয় এবং ক্ষীণ ফ্রেমওয়ার্ক। প্রসঙ্গের বাইরে এটি **স্টাইলিং এবং রাউটিং বিষয়সমূহকে** অন্তর্গত করে, এবং ধরে নেয় যে আপনি [Node.js](https://nodejs.org/) কে সার্ভার ইনভায়রনমেন্ট হিসেবে ব্যবহার করছেন।

Next.js শিখুন [এর অফিশিয়াল গাইড](https://nextjs.org/learn/) থেকে।

### Gatsby {#gatsby}

React দিয়ে **স্ট্যাটিক ওয়েবসাইট** তৈরী করার জন্য সেরা উপায় হচ্ছে [Gatsby](https://www.gatsbyjs.org/)। এটি আপনাকে React কম্পোনেন্ট ব্যবহার করতে দেয়, কিন্তু দ্রুততম লোড টাইম নিশ্চিত করার জন্য প্রি-রেন্ডার্ড HTML এবং CSS আউটপুট দেয়।

Gatsby শিখুন [এর অফিশিয়াল গাইড](https://www.gatsbyjs.org/docs/) এবং একটি [স্টার্টার কিটগুলোর  গ্যাল্যারি](https://www.gatsbyjs.org/docs/gatsby-starters/) থেকে।

### আরও সহজবশ্য টুলচেইনসমূহ {#more-flexible-toolchains}

উল্লিখিত টুলচেইনসমূহ আরো বেশি সুবিধা ও অপশন দিয়ে থাকে। সেইগুলোকে আমরা আরো অভিজ্ঞ ব্যবহারকারীদের জন্য পরামর্শ করি।

- **[Neutrino](https://neutrinojs.org/)** তার প্রিসেটগুলো ব্যবহার করে [webpack](https://webpack.js.org/) এর ক্ষমতাকে আরও তরান্বিত করে, এবং [React অ্যাপসমূহ](https://neutrinojs.org/packages/react/) ও [React কম্পোনেন্টসমূহ](https://neutrinojs.org/packages/react-components/) এর জন্য একটি প্রিসেট অন্তর্ভুক্ত করে।

- **[nwb](https://github.com/insin/nwb)** বিশেষত [React কম্পোনেন্টসমূহ npm এর জন্য পাবলিশ করার ক্ষেত্রে ](https://github.com/insin/nwb/blob/master/docs/guides/ReactComponents.md#developing-react-components-and-libraries-with-nwb) খুবই ভালো। এটি React অ্যাপ তৈরি করার জন্যও **ব্যবহার করা যেতে পারে**।

- **[Parcel](https://parceljs.org/)** একটি দ্রুত, জিরো কনফিগার্ড ওয়েব অ্যাপ্লিকেশন বান্ডেলার যা [React এর সাথে কাজ করে](https://parceljs.org/recipes.html#react)।

- **[Razzle](https://github.com/jaredpalmer/razzle)** একটি সার্ভার-রেন্ডারিং ফ্রেমওয়ার্ক যাতে কোনো কনফিগারেশন দরকার হয় না, কিন্তু Next.js এর চেয়ে বেশি সুবিধা দেয়।

## শুরু থেকে একটি টুলচেইন তৈরী করা {#creating-a-toolchain-from-scratch}

সাধারণত জাভাস্ক্রিপ্টের একটি বিল্ড টুলচেইন যা নিয়ে গঠিত হয়ঃ

* একটি **প্যাকেজ ম্যানেজার**, যেমন [Yarn](https://yarnpkg.com/) অথবা [npm](https://www.npmjs.com/)। এর মাধ্যমে আপনি সুবিশাল ইকোসিস্টেমের থার্ড-পার্টি প্যাকেজগুলোর সুবিধা পাবেন, এবং সহজে সেগুলো ইন্সটল বা আপডেট করতে পারবেন।

* একটি **বান্ডেলার**, যেমন [webpack](https://webpack.js.org/) অথবা [Parcel](https://parceljs.org/)। এটি আপনাকে মডুলার কোড লিখতে দেয় এবং একে ছোট প্যাকেজসমূহে একত্রিত করে লোড টাইম নিখুঁত করতে সাহায্য করে।

* একটি **কম্পাইলার**, যেমন [Babel](https://babeljs.io/)। এটি আপনাকে আধুনিক জাভাস্ক্রিপ্ট কোড লিখতে দেয় যা পুরোনো ব্রাউজারগুলোতে কাজ করে।

যদি আপনি শুরু থেকে নিজের জাভাস্ক্রিপ্ট টুলচেইন সেটআপ করার চিন্তা করে থাকেন, [এই গাইড দেখে নিন](https://blog.usejournal.com/creating-a-react-app-from-scratch-f3c693b84658) যা কিছু Create React App এর কার্যকারিতা পুনরায় তৈরী করে।

আপনার নিজের তৈরী টুলচেইন [সঠিকভাবে প্রোডাকশনের জন্য সেটআপ হয়েছে কি না](/docs/optimizing-performance.html#use-the-production-build), তা নিশ্চিত করতে ভুলবেন না।
