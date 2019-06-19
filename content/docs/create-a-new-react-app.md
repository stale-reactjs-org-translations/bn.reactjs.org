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

[Create React App](https://github.com/facebookincubator/create-react-app) is a comfortable environment for **learning React**, and is the best way to start building **a new [single-page](/docs/glossary.html#single-page-application) application** in React.

It sets up your development environment so that you can use the latest JavaScript features, provides a nice developer experience, and optimizes your app for production. You’ll need to have Node >= 6 and npm >= 5.2 on your machine. To create a project, run:

```bash
npx create-react-app my-app
cd my-app
npm start
```

>Note
>
>`npx` on the first line is not a typo -- it's a [package runner tool that comes with npm 5.2+](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b).

Create React App doesn't handle backend logic or databases; it just creates a frontend build pipeline, so you can use it with any backend you want. Under the hood, it uses [Babel](https://babeljs.io/) and [webpack](https://webpack.js.org/), but you don't need to know anything about them.

When you're ready to deploy to production, running `npm run build` will create an optimized build of your app in the `build` folder. You can learn more about Create React App [from its README](https://github.com/facebookincubator/create-react-app#create-react-app--) and the [User Guide](https://facebook.github.io/create-react-app/).

### Next.js {#nextjs}

[Next.js](https://nextjs.org/) is a popular and lightweight framework for **static and server‑rendered applications** built with React. It includes **styling and routing solutions** out of the box, and assumes that you're using [Node.js](https://nodejs.org/) as the server environment.

Learn Next.js from [its official guide](https://nextjs.org/learn/).

### Gatsby {#gatsby}

[Gatsby](https://www.gatsbyjs.org/) is the best way to create **static websites** with React. It lets you use React components, but outputs pre-rendered HTML and CSS to guarantee the fastest load time.

Learn Gatsby from [its official guide](https://www.gatsbyjs.org/docs/) and a [gallery of starter kits](https://www.gatsbyjs.org/docs/gatsby-starters/).

### More Flexible Toolchains {#more-flexible-toolchains}

The following toolchains offer more flexibility and choice. We recommend them to more experienced users:

- **[Neutrino](https://neutrinojs.org/)** combines the power of [webpack](https://webpack.js.org/) with the simplicity of presets, and includes a preset for [React apps](https://neutrinojs.org/packages/react/) and [React components](https://neutrinojs.org/packages/react-components/).

- **[nwb](https://github.com/insin/nwb)** is particularly great for [publishing React components for npm](https://github.com/insin/nwb/blob/master/docs/guides/ReactComponents.md#developing-react-components-and-libraries-with-nwb). It [can be used](https://github.com/insin/nwb/blob/master/docs/guides/ReactApps.md#developing-react-apps-with-nwb) for creating React apps, too. 

- **[Parcel](https://parceljs.org/)** is a fast, zero configuration web application bundler that [works with React](https://parceljs.org/recipes.html#react).

- **[Razzle](https://github.com/jaredpalmer/razzle)** is a server-rendering framework that doesn't require any configuration, but offers more flexibility than Next.js.

## Creating a Toolchain from Scratch {#creating-a-toolchain-from-scratch}

A JavaScript build toolchain typically consists of:

* A **package manager**, such as [Yarn](https://yarnpkg.com/) or [npm](https://www.npmjs.com/). It lets you take advantage of a vast ecosystem of third-party packages, and easily install or update them.

* A **bundler**, such as [webpack](https://webpack.js.org/) or [Parcel](https://parceljs.org/). It lets you write modular code and bundle it together into small packages to optimize load time.

* A **compiler** such as [Babel](https://babeljs.io/). It lets you write modern JavaScript code that still works in older browsers.

If you prefer to set up your own JavaScript toolchain from scratch, [check out this guide](https://blog.usejournal.com/creating-a-react-app-from-scratch-f3c693b84658) that re-creates some of the Create React App functionality.

Don't forget to ensure your custom toolchain [is correctly set up for production](/docs/optimizing-performance.html#use-the-production-build).
