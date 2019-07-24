---
id: thinking-in-react
title: React-উপায়ে চিন্তা করা
permalink: docs/thinking-in-react.html
redirect_from:
  - 'blog/2013/11/05/thinking-in-react.html'
  - 'docs/thinking-in-react-zh-CN.html'
prev: composition-vs-inheritance.html
---

React is, in our opinion, the premier way to build big, fast Web apps with JavaScript. It has scaled very well for us at Facebook and Instagram.

One of the many great parts of React is how it makes you think about apps as you build them. In this document, we'll walk you through the thought process of building a searchable product data table using React.

## Start With A Mock {#start-with-a-mock}

Imagine that we already have a JSON API and a mock from our designer. The mock looks like this:

![Mockup](../images/blog/thinking-in-react-mock.png)

Our JSON API returns some data that looks like this:

```
[
  {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
  {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
  {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
  {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
  {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
  {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
];
```

## Step 1: Break The UI Into A Component Hierarchy {#step-1-break-the-ui-into-a-component-hierarchy}

The first thing you'll want to do is to draw boxes around every component (and subcomponent) in the mock and give them all names. If you're working with a designer, they may have already done this, so go talk to them! Their Photoshop layer names may end up being the names of your React components!

But how do you know what should be its own component? Use the same techniques for deciding if you should create a new function or object. One such technique is the [single responsibility principle](https://en.wikipedia.org/wiki/Single_responsibility_principle), that is, a component should ideally only do one thing. If it ends up growing, it should be decomposed into smaller subcomponents.

Since you're often displaying a JSON data model to a user, you'll find that if your model was built correctly, your UI (and therefore your component structure) will map nicely. That's because UI and data models tend to adhere to the same *information architecture*. Separate your UI into components, where each component matches one piece of your data model.

![Component diagram](../images/blog/thinking-in-react-components.png)

You'll see here that we have five components in our app. We've italicized the data each component represents.

  1. **`FilterableProductTable` (orange):** contains the entirety of the example
  2. **`SearchBar` (blue):** receives all *user input*
  3. **`ProductTable` (green):** displays and filters the *data collection* based on *user input*
  4. **`ProductCategoryRow` (turquoise):** displays a heading for each *category*
  5. **`ProductRow` (red):** displays a row for each *product*

If you look at `ProductTable`, you'll see that the table header (containing the "Name" and "Price" labels) isn't its own component. This is a matter of preference, and there's an argument to be made either way. For this example, we left it as part of `ProductTable` because it is part of rendering the *data collection* which is `ProductTable`'s responsibility. However, if this header grows to be complex (i.e. if we were to add affordances for sorting), it would certainly make sense to make this its own `ProductTableHeader` component.

Now that we've identified the components in our mock, let's arrange them into a hierarchy. Components that appear within another component in the mock should appear as a child in the hierarchy:

  * `FilterableProductTable`
    * `SearchBar`
    * `ProductTable`
      * `ProductCategoryRow`
      * `ProductRow`

## ধাপ ২ঃ React ব্যবহার করে একটি স্ট্যাটিক ভার্শন তৈরি করা {#step-2-build-a-static-version-in-react}


<p data-height="600" data-theme-id="0" data-slug-hash="BwWzwm" data-default-tab="js" data-user="lacker" data-embed-version="2" class="codepen">See the Pen <a href="https://codepen.io/gaearon/pen/BwWzwm">Thinking In React: Step 2</a> on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

এখন যেহেতু আপনার কাছে কম্পোনেন্টের hierarchy তৈরী করা আছে, এখন এপ্লিকেশনটি কাজে লাগানোর পালা। সবচেয়ে সহজ উপায় হচ্ছে এপ্লিকেশনটির এমন একটি ভার্শন তৈরী করা যা আপনার ডেটা মডেলটি গ্রহণ করে UI দেখাবে। কিন্তু এতে কোন interaction করা যাবে না অর্থাৎ স্ট্যাটিক হবে এটি। এই দুইটা কাজকে আলাদা করাই সবচেয়ে ভাল বুদ্ধি এই কারণে যে, স্ট্যাটিক ভার্শন তৈরী করার ক্ষেত্রে প্রচুর কোড লিখতে হয়, কিন্তু চিন্তা করতে হয় কম। অন্যদিকে এপ্লিকেশনটিকে interactive বা সচল করতে হলে অনেক অনেক চিন্তা করতে হবে কিন্তু লিখতে হবে কম। এটা কেন হচ্ছে তা আমরা এখনি দেখতে পাব।

আপনার অ্যাপ এর স্ট্যাটিক ভার্শন যা শুধুমাত্র আপনার তৈরি করা ডেটা মডেল দেখাবে, সেটি তৈরি করতে আপনি এমন কিছু কম্পোনেন্ট বানাতে চাইবেন যা অন্য কম্পোনেন্ট কে বার বার ব্যবহার করে। এবং *props* ব্যবহার করে ডেটা আদান প্রদান করে। *props* হচ্ছে প্যারেন্ট কম্পোনেন্ট থেকে চাইল্ড কম্পোনেন্ট এ ডেটা পাঠানোর একটি মাধ্যম। যদি আপনি *state* এর বিষয়ে ধারণা থেকে থাকেন, এই স্ট্যাটিক ভার্শনটি তৈরী করতে **অবশ্যই state ব্যবহার করবেন না**। স্টেট শুধুমাত্র অ্যাপটি সচল করার জন্য ব্যবহার করা হবে, অর্থাৎ, সেই ডেটার জন্য যা সময়ের সাথে সাথে পরিবর্তিত হতে পারে। যেহেতু এটি একটি স্ট্যাটিক ভার্শন আপনার স্টেট এর কোন প্রয়োজনই নেই।


এই ধাপের শেষে বার বার ব্যবহার করা যায় এমন কিছু কম্পোনেন্ট এর লাইব্রেরী আপনার কাছে থাকবে। এই কম্পোনেন্ট গুলার শুধুমাত্র একটি মেথড ই থাকবে, এবং তা হচ্ছে `render()`। কারণ, এটি আপনার অ্যাপ এর একটি স্ট্যাটিক ভার্শন। Hierarchy এর মাথায় অবস্থান করা কম্পোনেন্ট (`FilterableProductTable`) আপনার ডেটা মডেলকে একটি প্রপ হিসেবে গ্রহণ করবে। আপনি যদি আপনার ডেটা মডেলে কোন পরিবর্তন করেন এবং `ReactDOM.render()` মেথডটিকে আবার কল করেন, UI আবার সে হিসেবে আপডেটেড হয়ে যাবে। আপনি এখন দেখতে পাচ্ছেন আপনার UI তে পরিবর্তন আনতে কোডের কোথায় পরিবর্তন ঘটাতে হবে। React এর **one-way data flow** (যাকে *one-way binding* ও বলা হয়) বা একমুখী তথ্য প্রবাহ সবকিছু কে modular এবং দ্রুতগতির রাখে। 

এই ধাপটি সম্পন্ন করতে যদি সাহায্য প্রয়োজন হয়, [React docs](/docs/)এ দেখতে পারেন।

### অল্প একটু হস্তক্ষেপ: প্রপ বনাম স্টেট {#a-brief-interlude-props-vs-state}

React এ দু'ধরণের "model" বা আদর্শ ডেটা আছেঃ প্রপ (prop) আর স্টেট (state)। এদের মধ্যকার পার্থক্য জানা খুবই দরকার। যদি আপনি এই পার্থক্য সম্বন্ধে নিশ্চিত না হয়ে থাকেন, তাহলে [the official React docs](/docs/interactivity-and-dynamic-uis.html)এ চোখ বুলিয়ে দেখতে পারেন। 

## Step 3: UI State এর যৎসামান্য(কিন্তু পরিপূর্ণ) অবস্থা চিহ্নিত করুন  {#step-3-identify-the-minimal-but-complete-representation-of-ui-state}

UI কে সচল করতে চাইলে আপনাকে ডেটা মডেল এ পরিবর্তন করার একটা ব্যবস্থা করতে হবে। আর React এই লক্ষ্য অর্জন করে **স্টেট (state)** ব্যবহার করে. 

আপনার অ্যাপটি সঠিকভাবে তৈরি করতে হলে সেই সর্বনিম্ন সংখ্যক স্টেট এর কথা ভাবতে হবে যা অ্যাপটির প্রয়োজন। এখানে বুদ্ধিটা হল [DRY: *Don't Repeat Yourself*](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) অর্থাৎ কোন একটি কাজ একবারের বেশি না করার চেষ্টা করতে হবে।  আপনার অ্যাপ্লিকেশন এর সেই যৎসামান্য স্টেট চিহ্নিত করুন, অ্যাপ্লিকেশনটির প্রয়োজন এবং যেগুলো আপনার সকল প্রয়োজনে ব্যবহার করা যথেষ্ট। ধরুন, আপনি একটা TODO list অ্যাপ বানাতে চাচ্ছেন। সেইক্ষেত্রে লিস্টে কি কি আছে তা গুণে বের করবার জন্য কোন স্টেট রাখবেন না, বরং লিস্টের সব কিছু একটি অ্যারে(array) তে রাখুন এবং ফলস্বরূপ লিস্টে কয়টি আইটেম আছে তা বের করার জন্য লিস্টের অ্যারের সাইজ জানাই যথেষ্ট।

এবার আমাদের উদাহরণের যে অ্যাপ্লিকেশন, সেখানে প্রতিটি অংশের কথা আবার চিন্তা করি। আমাদের যা আছে, তা হল:


  * পণ্যের মূল তালিকা
  * ব্যবহারকারী সার্চ করার জন্য যা লিখেছে
  * চেকবক্সের ভ্যালু
  * পণ্যের ফিল্টার করা তালিকা 

এখন প্রতিটি বিষয়ে তিনটি প্রশ্ন নিজেকে নিজে জিজ্ঞেস করে আমরা জেনে নিতে পারি কোনটার স্টেট থাকবে এবং কোনটার থাকবে নাঃ

  1. একে প্রপ এর সাহায্যে প্যারেন্ট কম্পোনেন্ট থেকে চাইল্ড কম্পোনেন্ট এ পাঠানো হয় ? যদি হয়, তাহলে সম্ভবত এটি স্টেট না।
  2. এটি কি সময়ের সাথে অপরিবর্তিত থাকে ? যদি থাকে, তাহলে এটি সম্ভবত স্টেট না।
  3. একে কি অন্য কোন স্টেট বা প্রপ এর উপর নির্ভর করে হিসেব করা যায় ? যদি যায়, তাহলে এটি সম্ভবতঃ স্টেট নয়।

যেহেতু পণ্যের মূল তালিকা প্রপ হিসেবে এদিক সেদিক করা হচ্ছে, সেহেতু তা স্টেট হতে পারে না। সার্চ টেক্সট এবং চেকবক্স সম্ভবত স্টেট, কারণ এগুলোকে অন্য কোন কম্পোনেন্ট এর উপর নির্ভর করে হিসেব করা যায় না এবং এরা সময়ের সাথে পরিবর্তিত হয়। এরং অবশেষে পণ্যের ফিল্টার করা তালিকা স্টেট না, কারণ তা সার্চ টেক্স এবং চেকবক্সের মান থেকে হিসেব করা সম্ভব।   

অর্থাৎ পরিশেষে বলতে পারি, আমাদের স্টেটগুলো হল:

  * ব্যবহারকারী সার্চ বক্সে যা লিখেন
  * চেকবক্সের মান

## ধাপ ৪: আপনার স্টেট টি কোথায় থাকা উচিত তা চিহ্নিত করা {#step-4-identify-where-your-state-should-live}

<p data-height="600" data-theme-id="0" data-slug-hash="qPrNQZ" data-default-tab="js" data-user="lacker" data-embed-version="2" class="codepen">See the Pen <a href="https://codepen.io/gaearon/pen/qPrNQZ">Thinking In React: Step 4</a> on <a href="https://codepen.io">CodePen</a>.</p>

আচ্ছা, তো আমরা আমাদের অ্যাপ এর একদম মিনিমাল বা সর্বনিম্ন অবস্থা বের করে ফেললাম। এখন, আমাদের বের করে ফেলতে হবে কোন কম্পোনেন্ট এর মধ্যে এই স্টেট গুলা থাকবে, অর্থাৎ কোন কম্পোনেন্ট গুলো এই স্টেট গুলোকে পরিবর্তিত(mutate) বা *অধিকার* করে।

মনে রাখুনঃ React এর মূল বিষয়ই হচ্ছে কম্পোনেন্ট hierarchy দিয়ে একমুখী ডেটা ফ্লো বা তথ্য প্রবাহ। প্রথমেই হয়ত বুঝা যাবে না কোন কম্পোনেন্ট কোন স্টেট কে নিজের করে রাখবে বা পরিবর্তন করার অধিকার রাখবে। **এটা প্রায়শই নতুনদের বুঝবার জন্য সবচেয়ে কঠিন বিষয় হিসেবে দেখা যায়।** সুতরাং, নিচের এই ধাপগুলো অনুসরণ করে বুঝবার চেষ্টা করুন: 

আপনার অ্যাপ এর প্রতিটি স্টেট এর জন্য:

  * সেই প্রতিটি কম্পোনেন্ট চিহ্নিত করুন যেটা এই স্টেট এর নিরিখে কোন কিছু প্রদর্শন করে।
  * একটি সাধারণ owner কম্পোনেন্ট খুজে বের করুন(একটি মাত্র কম্পোনেন্ট যেটি hierarchy অনুসারে সেই সব কম্পোনেন্টকে অধিকার করে যেগুলো এই স্টেট কে চাচ্ছে) 
  * এই সাধারণ অধিকর্তা কম্পোনেন্ট বা তার চেয়েও উপরের কোন কম্পোনেন্ট এর অধিকারে স্টেট টি থাকা উচিত। 
  * যদি এমন কোন কম্পোনেন্ট আপনি খুঁজে না পান, তাহলে শুধুমাত্র এই স্টেটের জন্য একটি কম্পোনেন্ট তৈরি করুন যা hierarchy তে ওই সাধারণ কম্পোনেন্ট এর উপরে থাকে।   

এখন এই বুদ্ধিটাই আমরা আমাদের উদাহরণের এপ্লিকেশনে কাজে লাগানোর চেষ্টা করি:

  * `ProductTable` এর দরকার স্টেট এর নিরিখে পণ্য ফিল্টার করা। অন্যদিকে `SearchBar` এর সার্চ টেক্সট এবং চেকড স্টেট দেখানো প্রয়োজন।   
  * Hierarchy তে যে সাধারণ owner কম্পোনেন্ট আমরা পাই তা হল `FilterableProductTable`
  * সুতরাং, ধারণাগতভাবে এই `FilterableProductTable` কম্পোনেন্ট এই ফিল্টার টেক্সট এবং চেকবক্সের মান রাখাটা যুক্তিযুক্ত হয়।

অসাধারণ! সুতরাং আমরা সিদ্ধান্ত নিয়ে ফেললাম যে আমাদের স্টেট টি `FilterableProductTable` কম্পোনেন্ট এ থাকা দরকা। প্রথমে একটি instance property `this.state = {filterText: '', inStockOnly: false}` এই কম্পোনেন্ট এর `constructor` এ যোগ করতে হবে। যেন, এটি আপনার এপ্লিকেশনের একদম শুরুর অবস্থা এটি নির্দেশ করতে পারে। এখন `filterText` এবং `inStockOnly` কে `ProductTable` এবং `SearchBar`তে প্রপ হিসেবে পাঠিয়ে দিন(pass করুন)। অবশেষে, এই প্রপগুলোকে ব্যবহার করে `ProductTable` এর সারিগুলো ফিল্টার করুণ এবং `SearchBar` এর ফর্ম ফিল্ড এর মানগুলো ঠিক করে ফেলুন।

এখন আপনি চাইলে দেখে নিতে পারেন আপনার এপ্লিকেশন কেমন আচরণ করবে: `filterText` এর মান `"ball"` দিয়ে এপ্লিকেশন রিফ্রেশ করুন এবং দেখুন আপনার ডাটা টেবল সঠিকভাবে আপডেটেট হয়ে গেছে।

## ধাপ ৫: বিপরীত তথ্য প্রবাহ যোগ করুন {#step-5-add-inverse-data-flow}

<p data-height="600" data-theme-id="0" data-slug-hash="LzWZvb" data-default-tab="js,result" data-user="rohan10" data-embed-version="2" data-pen-title="Thinking In React: Step 5" class="codepen">See the Pen <a href="https://codepen.io/gaearon/pen/LzWZvb">Thinking In React: Step 5</a> on <a href="https://codepen.io">CodePen</a>.</p>

এতক্ষন পর্যন্ত আমরা একটি অ্যাপ বানিয়েছি যা hierarchy দিয়ে উপর থেকে নিচে বয়ে যাওয়া state এবং prop এর কারণে সব কিছু সঠিকভাবে দেখাতে পারে। এখন সময় হল তথ্য প্রবাহকে উল্টোদিকে যাবার সুযোগ দেওয়া: অর্থাৎ hierarchy এর গভীরে থাকা ফর্ম কম্পোনেন্ট কে `FilterableProductTable` এর স্টেট পরিবর্তনের ব্যবস্থা করে দেওয়া। 

React এর এই তথ্য প্রবাহ পরিচ্ছন্ন হবার সবচেয়ে বড় কারণ, যেন আপনি বুঝতে পারেন আপনার প্রোগ্রাম কিভাবে কাজ করে। কিন্তু, প্রথাগত দ্বিমুখী তথ্য প্রবাহ (traditional two-way data binding) এর চেয়ে এক্ষেত্রে কোড একটু বেশি করতে হয়।

যদি আপনি এখন এই উদাহরণের এখনকার ভার্শনে চেক বক্সে টিক দিয়েও দেন, দেখবেন React আপনার ইনপুট গ্রহণ করছে না। এইটা ইচ্ছা করেই করা হয়েছে, যেহেতু আমরা  `input` এর `value` প্রপ সবসময়  `FilterableProductTable` থেকে আসা `state` এর সমান করেছি।

তাহলে এবার চিন্তা করি আমরা কি ঘটাতে চাচ্ছি। আমরা চাচ্ছি যে, যখনই ব্যবহারকারী ফর্ম এ কোন পরিবর্তন আনে, তখন স্টেট ও যেন সেভাবে পরিবর্তি হয়। যেহেতু শুধুমাত্র কম্পোনেন্ট এর ই উচিত নিজেদের স্টেট পরিবর্তন করা, সেহেতু যখনই স্টেট বদলানোর দরকার পড়বে, `FilterableProductTable` কম্পোনেন্টটি  `SearchBar` এ কলব্যাক (callback) পাঠাবে। আমরা `onChange` ইভেন্টটি ব্যবহার করে কখন ইনপুটে পরিবর্তন আসছে সে বিষয়ে খবর পেতে পারি। `FilterableProductTable` এর কলব্যাকগুলো `setState()` কে কল করবে, এবং এপ্লিকেশনটি আপডেটেড হয়ে যাবে। 

## ব্যাস! হয়ে গেল {#and-thats-it}
## And That's It {#and-thats-it}

আশা করা যায়, এই লেখাটি React ব্যবহার করে কম্পোনেন্ট এবং এপ্লিকেশন তৈরি করবার সময়ে কিভাবে চিন্তা করতে হবে সে বিষয়ে কিছুটা ধারণা দেবে। এটা ঠিক যে প্রথাগত পদ্ধতির চেয়ে বেশি কোড করতে হচ্ছে এখানে। তবে মনে রাখতে হবে কোড যতটা না লেখা হয় তার চেয়ে অনেক বেশি পড়া হয়, এবং এধরণের পরিচ্ছন্ন ও বিভিন্ন মডিউলে ভাগ করা কোড পড়াটা সহজতর। যখন আপনি কম্পোনেন্ট এর বিশাল লাইব্রেরি বানানো শুরু করবেন, তখন এই পরিচ্ছন্নতা এবং মডুলারিটির বিষয়টা আপনার অনেক ভাল লাগবে। একই সাথে কোডগুলোর বার বার ব্যবহারে আপনার লেখা মোট কোডের পরিমাণ কমে যাবে অনেক। :) 

