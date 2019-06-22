---
id: create-a-new-react-app
title: নতুন একটি React অ্যাপ তৈরী করুন
permalink: docs/create-a-new-react-app.html
redirect_from:
  - "docs/add-react-to-a-new-app.html"
prev: add-react-to-a-website.html
next: cdn-links.html
---

আরো ভালো ইউজার এবং ডেভেলপার এক্সপেরিয়েন্স পেতে কোনো একটি ইন্টিগ্রেটেড টুলচেইন ব্যাবহার করুন।

এই পৃষ্ঠায় কিছু জনপ্রিয় React টুলচেইন নিয়ে আলোচনা করা হয়েছে যা এরুপ কাজগুলোর ক্ষেত্রে সাহায্য করবেঃ 

* ফাইল এবং কম্পোনেন্টসমূহ স্কেল করা।
* npm থেকে third-party লাইব্রেরীসমূহ ব্যাবহার করা।
* সাধারণ ভুলগুলো দ্রুত সনাক্ত করা।
* ডেভেলপমেন্টের সময় CSS এবং JS লাইভ-এডিট করা।
* প্রোডাকশনের জন্য আউটপুট অপ্টিমাইজ করা।

এই পৃষ্ঠায় নির্দেশিত টুলচেইনসমূহ **প্রাথমিকক্ষেত্রে  কনফিগারেশন করার প্রয়োজন ণেই**।

## আপনার হয়তো টুলচেইনের প্রয়োজন নাও হতে পারে {#you-might-not-need-a-toolchain}

যদি আপনি উপরে আলোচিত উপায়সমূহের অভিজ্ঞতা নিতে না চান অথবা জাভাস্ক্রিপ্ট টুলগুলো ব্যাবহার করতে ভালো না লাগে থাকে, তবে [HTML পেইজে React- কে `<script>` ট্যাগে যুক্ত করুন](/docs/add-react-to-a-website.html), অন্যক্ষেত্রে [JSX এর সাথে](/docs/add-react-to-a-website.html#optional-try-react-with-jsx)।

এছাড়াও এটা **React- কে একটি বিদ্যমান ওয়েবসাইটের সাথে একীভূত করার সহজতম উপায়।** আপনি চাইলে যেকনো সময় আপনার সুবিধা অনুযায়ী বৃহত্তর টুলচেইন যুক্ত করতে পারেন। 

## সুপারিশকৃত টুলচেইনসমূহ {#recommended-toolchains}

React টিম প্রাথমিকভাবে এই সমাধানসমূহের পরামর্শ দেয়ঃ  

- যদি আপনি **React শিক্ষানবিস** হোন অথবা **নতুন একটি [সিঙ্গেল-পেইজ](/docs/glossary.html#single-page-application) অ্যাপ তৈরী করছেন**, তবে ব্যাবরাহ করুন [Create React App](#create-react-app)। 
- যদি আপনি **Node.js দিয়ে একটি সার্ভার-রেন্ডারর্ড ওয়েবসাইট** বানানোরতো থাকেন, তবে [Next.js](#nextjs) পরখ করুন।
- যদি আপনি একটি **স্ট্যাটিক কন্টেন্ট-অরিয়েন্টেড ওয়েবসাইট** বানানোরতো থাকেন, তবে [Gatsby](#gatsby) পরখ করুন।
- যদি আপনি একটি **কম্পোনেন্ট লাইব্রেরী** বানানোরতো থাকেন অথবা **বিদ্যমান কোদবেজের সাথে একীভূত করছেন, তবে [আরও সহজবশ্য টুলচেইনসমূহ](#more-flexible-toolchains) পরখ করুন।**

### Create React App {#create-react-app}

[Create React App](https://github.com/facebookincubator/create-react-app) হচ্ছে **React শিখার** জন্য একটি সুবিধাজনক এনভাইরনমেন্ট, এবং React এ **নতুন একটি [সিঙ্গেল-পেইজ](/docs/glossary.html#single-page-application) অ্যাপ্লিকেশন** বানানো শুরু করার জন্য সবচেয়ে ভালো পন্থা।

এটা আপানার ডেভেলপমেন্ট এনভাইরন্মেন্ট সেট আপ করে দিবে যাতে করে আপনি JavaScript এর সর্বশেষ ফিচারসমূহ ব্যাবহার করতে পারেন, সুন্দর ডেভেলপার এক্সপেরিইয়েন্স সরবরাহ করে, এবং প্রোডাকশনের জন্য অ্যাপকে আরো নিখুঁত করে। এর জন্য আপনার যন্ত্রে Node >= 6 এবং npm >= 5.2 থাকতে হবে। একটি প্রোজেক্ট তৈরী করতে, চালনা করুনঃ

```bash
npx create-react-app my-app
cd my-app
npm start
```

>বিঃদ্রঃ
>
>প্রথম সারিতে `npx` কোন আক্ষরিক ত্রুটি নয় -- ইহা [package চালনা করার জন্য একটি টুল যা npm 5.2+ এর সাথে এসেছে](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b)। 

Create React App ব্যাকএন্ডের যুক্তি বা ডাটাবেইস নিয়ন্ত্রণ করে না; এটা শুধু ফ্রন্টএন্ডে গঠিত পাইপলাইন তৈরী করে, যেন আপনি চাইলে যেকোনো ব্যাকএন্ডের সাথে ব্যাবহার করতে পারেন। আড়ালে, এটি [Babel](https://babeljs.io/) এবং [webpack](https://webpack.js.org/) ব্যাবহার করে, কিন্তু এগুলো সম্পর্কে আপনাকে কিছু না জানলেও চলবে।

যখন আপনি প্রোডাকশনের এর জন্য স্থাপন( deploy ) করতে প্রস্তুত, `npm run build` চালনা করলে আপনার অ্যাপের `build` ফোল্ডারে একটি সংক্ষেপিত কাঠামো তৈরী করবে। আপনি Create React App সম্পর্কে আরো জানতে পারেন [এই README থেকে](https://github.com/facebookincubator/create-react-app#create-react-app--) এবং এই [ইউজার গাইডটি](https://facebook.github.io/create-react-app/)। 

### Next.js {#nextjs}

[Next.js](https://nextjs.org/) **স্ট্যাটিক এবং সার্ভার-রেন্ডার্ড অ্যাপ্লিকেশনসমূহের** জন্য React দিয়ে গঠিত একটি জনপ্রিয় এবং ক্ষীণ ফ্রেমওয়ার্ক। প্রসঙ্গের বাইরে এটি **স্টাইলিং এবং রাউটিং সমাধানসমূহ** অন্তর্গত করে, এবং ধরে নেয় যে আপনি [Node.js](https://nodejs.org/) কে সার্ভার এনভাইরনমেন্ট হিসেবে ব্যাবহার করছেন। 

Next.js শিখুন [এর স্বীকৃত প্রদর্শক](https://nextjs.org/learn/) থেকে। 

### Gatsby {#gatsby}

React দিয়ে **স্ট্যাটিক ওয়েবসাইট** তৈরী করার জন্য  সেরা উপায় হচ্ছে [Gatsby](https://www.gatsbyjs.org/)। এটি আপনাকে React কম্পোনেন্ট ব্যাবহার করতে দেয়, কিন্তু আউটপুট দেয় প্রি-রেন্ডার্ড HTML এবং CSS, দ্রুততম লোড টাইম নিশিত করার জন্য।

Gatsby শিখুন [এর স্বীকৃত প্রদর্শক](https://www.gatsbyjs.org/docs/) এবং একটি [স্টার্টার কিটগুলোর  গ্যাল্যারি](https://www.gatsbyjs.org/docs/gatsby-starters/) থেকে। 

### আরও সহজবশ্য টুলচেইনসমূহ {#more-flexible-toolchains}

উল্লিখিত টুলচেইনসমূহ আরো বেশি সুবিধা ও পছন্দ দিয়ে থাকে। সেইগুলোকে আমরা আরো অভিজ্ঞ ব্যাবহারকারীদের জন্য পরামর্শ করই। 

- **[Neutrino](https://neutrinojs.org/)**, [webpack](https://webpack.js.org/) এর ক্ষমতাকে একত্রিত করে সহজ প্রিসেটগুলোর সাথে, এবং একটি প্রিসেটকে [React অ্যাপসমূহ](https://neutrinojs.org/packages/react/) ও [React কম্পোনেন্টসমূহ](https://neutrinojs.org/packages/react-components/) অন্তর্ভুক্ত করে। 

- **[nwb](https://github.com/insin/nwb)** বিশেষত [React কম্পোনেন্টসমূহ npm এর জন্য প্রকাশ করার ক্ষেত্রে ](https://github.com/insin/nwb/blob/master/docs/guides/ReactComponents.md#developing-react-components-and-libraries-with-nwb) খুবই ভালো। এটি React অ্যাপসমূহের জন্যও **ব্যাবহার করা জেতে পারে**।

- **[Parcel](https://parceljs.org/)** একটি দ্রুত, জিরো কনফিগার্ড ওয়েব অ্যাপ্লিকেশন বান্ডেলার যা [React এর সাথে কাজ করে](https://parceljs.org/recipes.html#react)। 

- **[Razzle](https://github.com/jaredpalmer/razzle)** একটি সার্ভার-রেন্ডারিং ফ্রেমওয়ার্ক যাতে কোনো কনফিগারেশন দরকার হয় না, কিন্তু Next.js এর চেয়ে বেশি সুবিধা দেয়। 

## Creating a Toolchain from Scratch {#creating-a-toolchain-from-scratch}

A JavaScript build toolchain typically consists of:

* A **package manager**, such as [Yarn](https://yarnpkg.com/) or [npm](https://www.npmjs.com/). It lets you take advantage of a vast ecosystem of third-party packages, and easily install or update them.

* A **bundler**, such as [webpack](https://webpack.js.org/) or [Parcel](https://parceljs.org/). It lets you write modular code and bundle it together into small packages to optimize load time.

* A **compiler** such as [Babel](https://babeljs.io/). It lets you write modern JavaScript code that still works in older browsers.

If you prefer to set up your own JavaScript toolchain from scratch, [check out this guide](https://blog.usejournal.com/creating-a-react-app-from-scratch-f3c693b84658) that re-creates some of the Create React App functionality.

Don't forget to ensure your custom toolchain [is correctly set up for production](/docs/optimizing-performance.html#use-the-production-build).
