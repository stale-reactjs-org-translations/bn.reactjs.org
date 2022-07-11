---
id: thinking-in-react
title: React এ চিন্তা করা
permalink: docs/thinking-in-react.html
redirect_from:
  - 'blog/2013/11/05/thinking-in-react.html'
  - 'docs/thinking-in-react-zh-CN.html'
prev: composition-vs-inheritance.html
---

আমাদের মতে, বড় এবং দ্রুত ওয়েব অ্যাপ তৈরির সবথেকে ভালো উপায় হচ্ছে React। আমাদের ফেইসবুক এবং ইনস্টাগ্রামে এটি খুব ভালো স্কেল হয়েছে।

React এর অন্যতম চমৎকার দিক হচ্ছে, এটা দিয়ে অ্যাপ তৈরির সময় যেভাবে চিন্তা করতে হয়। এই লেখাটিতে, React এ একটি সার্চযোগ্য প্রোডাক্ট টেবিল তৈরি করে, এই চিন্তা করার বিষয়টি তুলে ধরবো।

## মক থেকে শুরু করি {#start-with-a-mock}

মনে করি, আমাদের কাছে ইতোমধ্যে একটি JSON API এবং ডিজানারের তৈরি একটি মক আছে। মকটি এরকম:

![Mockup](../images/blog/thinking-in-react-mock.png)

আমাদের JSON API কিছু ডেটা পাঠায় যা এমন:

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

## ধাপ ১: UI কে কম্পোনেন্ট Hierarchy তে ভেঙ্গে ফেলা  {#step-1-break-the-ui-into-a-component-hierarchy}

একদম শুরুতে যে কাজটা আপনার করা উচিৎ, তা হলো প্রতিটি কম্পোনেন্ট (এবং সাবকম্পোনেন্ট) এর চারদিকে বক্স আঁকানো এবং প্রতিটার একটি নাম দেওয়া। আপনার ডিজাইনার হয়তো আগেই এটা করে ফেলেছে, তাই তার সাথে যোগাযোগ করুণ! তার ফটোশপ লেয়ারের নামই হয়ত হতে পারে আপনার React কম্পোনেন্ট এর নাম!

কিন্ত আপনি কিভাবে বুঝবেন যে কো কাজটার নিজেরই একটা কম্পোনেন্ট থাকা দরকার? একটা নতুন ফাংশন কিংবা নতুন অবজেক্ট লাগবে কিনা যেভাবে চিন্তা করেন, ঠিক সেভাবেই চিন্তা করুণ। এমন পরিচিত একটা পদ্ধতি হলো [Single responsibility principle](https://en.wikipedia.org/wiki/Single_responsibility_principle), যার মতে, সাধারণত একটি কম্পোনেন্ট এর শুধু একটি কাজই করা উচিৎ। বড় হয়ে গেলে একে ক্ষুদ্র ক্ষুদ্র সাবকম্পোনেন্ট ভেঙ্গে ফেলা উচিৎ। 

যেহেতু আপনি প্রায়শই একটি JSON ডেটা মডেল ব্যবহারকারীকে দেখাচ্ছেন, খেয়াল করে থাকবেন আপনার মডেল যদি সঠিকভাবে তৈরি হয়ে থাকে, আপনার UI (এবং আপনার কম্পোনেন্ট এর গঠনবিন্যাস) সুন্দরমত মিলে যাবে। এর কারণ হচ্ছে UI এবং ডেটা মডেল একই *ইনফরমেশন আর্কিটেকচার* অনুসরণ করে। আপনার UI কে কম্পোনেন্ট গুলোকে এমনভাবে আলাদা করুণ, যেন আপনার প্রতিটি কম্পোনেন্ট একটি ডেটার মডেলের সাথে মিলে যায়।

![Diagram showing nesting of components](../images/blog/thinking-in-react-components.png)

<<<<<<< HEAD
এখানে আপনি দেখবেন যে আমাদের অ্যাপ এ পাঁচটি কম্পোনেন্ট রয়েছে। আমরা প্রতিটা কম্পোনেন্ট এর উপস্থাপিত ডেটা ইটালিক করে দিয়েছি।
=======
You'll see here that we have five components in our app. We've italicized the data each component represents. The numbers in the image correspond to the numbers below.
>>>>>>> f67fa22cc1faee261f9e22449d90323e26174e8e

  1. **`FilterableProductTable` (কমলা):** সম্পূর্ণ উদাহরণটি এর ভিতরে আছে
  2. **`SearchBar` (নীল):** সকল *ইউজার ইনপুট* গ্রহণ করে
  3. **`ProductTable` (সবুজ):** *ইউজার ইনপুট*  এর ভিত্তিতে *ডেটা কালেকশন* দেখায় এবং ফিল্টার করে
  4. **`ProductCategoryRow` (ফিরোজা):** প্রতিটি *ক্যাটাগরী* এর জন্য শিরোনাম দেখায়
  5. **`ProductRow` (লাল):** প্রতিটি *পণ্যর* জন্য একটি সারি দেখায়

যদি `ProductTable` এর দিকে লক্ষ্য করেন, আপনি দেখবেন প্রতিটি টেবিলের শিরোনাম (যাতে "Name" এবং "Price" লেবেল আছে) এর নিজের কম্পোনেন্ট নয়। এটা ব্যক্তিগত পছন্দ এবং যেকোনো দিকেই যুক্তি প্রদর্শন সম্ভব। উদাহরণস্বরূপ, আমারা এটাকে `ProductTable`এ রেখেছি কারণ এটি *ডেটা কালেকশন* দেখানোর অংশ, যা `ProductTable` এর কাজ। কিন্তু, যদি এই শিরোনামটি আরো জটিল আকার ধারণ করে (যেমন: সর্ট করার আরো কিছু উপায় করে), তখন শিরোনাম এর জন্য আলাদা `ProductTableHeader` কম্পোনেন্ট তৈরি যুক্তিসংগত হবে।

এখন যেহেতু আমরা মক এর জন্য কম্পোনেন্ট চিহ্নিত করে ফেলেছি, এদেরকে একটি hierarchy তে সাজিয়ে ফেলি। মকে যেই কম্পোনেন্ট অন্য কম্পোনেন্ট এর মধ্যে দেখা যায়, সেগুলো hierarchy তে চাইল্ড হিসেবে দেখানো উচিৎ:

  * `FilterableProductTable`
    * `SearchBar`
    * `ProductTable`
      * `ProductCategoryRow`
      * `ProductRow`

## ধাপ ২ঃ React ব্যবহার করে একটি স্ট্যাটিক ভার্শন তৈরি {#step-2-build-a-static-version-in-react}

<p data-height="600" data-theme-id="0" data-slug-hash="BwWzwm" data-default-tab="js" data-user="lacker" data-embed-version="2" class="codepen">See the Pen <a href="https://codepen.io/gaearon/pen/BwWzwm">Thinking In React: Step 2</a> on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

যেহেতু কম্পোনেন্টের Hierarchy তৈরী হয়ে গিয়েছে, এখন অ্যাপ তৈরির জন্য আপনি প্রস্তুত। সবথেকে সহজ উপায় হচ্ছে অ্যাপটির এমন একটি ভার্শন তৈরী, যেটি আপনার ডেটা মডেল গ্রহণ করে UI এ দেখাবে, কিন্তু এতে Interactivity থাকবে  না। এই দুইটা কাজ আলাদা করাটা সবচেয়ে ভাল বুদ্ধি কারণ, স্ট্যাটিক ভার্শন তৈরীর সময় প্রচুর কোড লিখতে হয়, অল্প চিন্তা করতে হয়।  অন্যদিকে অ্যাপটি Interactive করতে অনেক চিন্তা করতে হয়, কিন্তু লিখতে হয় কম। এখনি আমরা এটা দেখবো।

আপনার অ্যাপ এর স্ট্যাটিক ভার্শন, যেটি শুধু ডেটা মডেল দেখায়, তা তৈরি করর জন্য এমন কম্পোনেন্ট বানানো উচিৎ যা অন্য কম্পোনেন্ট পুনঃব্যবহার করে এবং *Props* এর মাধ্যমে ডেটা আদান প্রদান করে। *Props* হচ্ছে প্যারেন্ট কম্পোনেন্ট থেকে চাইল্ড  কম্পোনেন্ট এ ডেটা আদান প্রদানের একটি মাধ্যম। আপনার যদি *State* এর বিষয়ে ধারণা থেকে থাকে তাহলে স্ট্যাটিক ভার্শন তৈরীর সময় অবশ্যই **State ব্যবহার করবেন না**। শুধুমাত্র অ্যাপটি Interactive করার জন্য State ব্যবহার করা যাবে। অর্থাৎ, সেই ডেটার জন্য ব্যবহার করা যাবে যা সময়ের সাথে পরিবর্তিত হতে পারে। যেহেতু এটি একটি স্ট্যাটিক ভার্শন, এতে State এর দরকার নেই।

আপনি উপর থেকে নিচে (টপ-ডাউন) বা নিচে থেকে উপরে (বটম আপ) পদ্ধতিতে অ্যাপটি তৈরি করতে পারেন। অর্থাৎ আপনি শুরুতে hierarchy এর উপরের দিকের কম্পোনেন্টগুলো আগে তৈরি করতে পারেন (যেমন `FilterableProductTable` দিয়ে শুরু করা), অথবা নিচের দিকের কম্পোনেন্ট দিয়ে শুরু করতে পারেন (`ProductRow`)। অপেক্ষাকৃত সহজ কোন উদাহরণে সাধারণত টপ-ডাউন তৈরি করাই ভাল, অন্যদিকে একটু বড় ধরণের কোন অ্যাপ এ বটম-আপ তৈরি করলে ভালো কারণ এতে আপনি শুরু থেকেই টেস্ট লিখে আগাতে পারবেন।

<<<<<<< HEAD
এই ধাপের শেষে আপনার কাছে পুনর্ব্যবহার যোগ্য কিছু কম্পোনেন্ট এর লাইব্রেরী থাকবে। এই কম্পোনেন্ট গুলার শুধু একটি মাত্র মেথড ই থাকবে, তা হচ্ছে `render()` কারণ, এটি অ্যাপ এর স্ট্যাটিক ভার্শন। Hierarchy এর শীর্ষে অবস্থান করা কম্পোনেন্ট (`FilterableProductTable`) আপনার ডেটা মডেলকে একটি Prop হিসেবে গ্রহণ করবে। আপনি যদি ডেটা মডেলে অভ্যন্তরীণ কোন পরিবর্তন করে `ReactDOM.render()` মেথডটিকে আবার কল করেন, UI সেই হিসেবে আপডেটেড হয়ে যাবে। আপনি এখন দেখতে পাচ্ছেন, আপনার UI তে পরিবর্তন আনতে কোডের কোন যায়গায় পরিবর্তন আনতে হবে। React এর **One-way data flow** বা একমুখী তথ্য প্রবাহ (যাকে *one-way binding* ও বলা হয়) সবকিছু কে মডুলার এবং দ্রুতগতির রাখে।

এই ধাপটি সম্পন্ন করতে যদি সাহায্য প্রয়োজন হয়, [React ডকুমেন্টেশন](/docs/) এ দেখতে পারেন।
=======
At the end of this step, you'll have a library of reusable components that render your data model. The components will only have `render()` methods since this is a static version of your app. The component at the top of the hierarchy (`FilterableProductTable`) will take your data model as a prop. If you make a change to your underlying data model and call `root.render()` again, the UI will be updated. You can see how your UI is updated and where to make changes. React's **one-way data flow** (also called *one-way binding*) keeps everything modular and fast.

Refer to the [React docs](/docs/getting-started.html) if you need help executing this step.
>>>>>>> f67fa22cc1faee261f9e22449d90323e26174e8e

### অল্প একটু বিরতি: Prop বনাম State {#a-brief-interlude-props-vs-state}

React এ দু'ধরণের "model" বা আদর্শ ডেটা আছেঃ Prop এবং State। এদের মধ্যকার পার্থক্য জানা খুবই দরকারি। যদি আপনি এই পার্থক্য সম্বন্ধে নিশ্চিত না হয়ে থাকেন, তাহলে [অফিশিয়াল রিয়েক্ট ডকে](/docs/state-and-lifecycle.html) এ চোখ বুলিয়ে দেখতে পারেন। আরো দেখতে পারেন [FAQ: What is the difference between state and props?](/docs/faq-state.html#what-is-the-difference-between-state-and-props)

## ধাপ ৩: UI State এর সংক্ষিপ্ত (কিন্ত পূর্ণ) প্রদর্শন নির্ধারণ {#step-3-identify-the-minimal-but-complete-representation-of-ui-state}

UI কে ইন্টারেক্টিভ করতে চাইলে ট্রিগারের মাধ্যমে ডেটা মডেলে পরিবর্তন আনা প্রয়োজন। এই জন্য React এ **State** দরকার হয়।

অ্যাপ সঠিকভাবে তৈরি করতে সর্বপ্রথম অ্যাপে সর্বনিন্ম কয়টি Mutable State প্রয়োজন তা নির্ধারণ করা জরুরী। এখানে মনে রাখা দরকার [DRY: *Don't Repeat Yourself*](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) অর্থাৎ একই কাজ একাধিকবার না করা। অ্যাপ সবথেকে সংক্ষিপ্ত প্রদর্শন করতে প্রয়োজনীয় State নির্ধারণ করে বাকি সবকিছু প্রয়োজন মত হিসেব করা উচিৎ। উদাহরণ সরূপ, TODO list অ্যাপে TODO লিস্টে কি কি আছে তা গুণে বের করবার জন্য কোন স্টেট রাখবেন না, বরং লিস্টের সব কিছু একটি অ্যারেতে রাখুন, এতে লিস্টে কয়টি আইটেম আছে তা অ্যারের সাইজ থেকেই বের করা যাবে।

<<<<<<< HEAD
উদাহরণের অ্যাপের প্রতিটি ডেটা কথা আবার চিন্তা করুন। যা যা আছে:
=======
Think of all the pieces of data in our example application. We have:
>>>>>>> f67fa22cc1faee261f9e22449d90323e26174e8e

  * পণ্যের মূল তালিকা
  * ব্যবহারকারী সার্চ করার জন্য যা লিখেছে
  * চেকবক্সের ভ্যালু
  * পণ্যের ফিল্টার করা তালিকা

এখন প্রতিটি ডেটা State হবে কিনা সেটা তিনটি প্রশ্ন করে আমরা জেনে নিতে পারি:

  1. এটি কি Prop এর সাহায্যে প্যারেন্ট কম্পোনেন্ট থেকে চাইল্ড কম্পোনেন্ট এ পাঠানো যায়? যদি যায়, তাহলে সম্ভবত এটি State না।
  2. এটি কি সময়ের সাথে অপরিবর্তিত থাকে? যদি থাকে, তাহলে এটি সম্ভবত State না।
  3. একে কি অন্য কোন State বা Prop এর উপর নির্ভর করে হিসেব করা যায়? যদি যায়, তাহলে এটি সম্ভবত State নয়।

যেহেতু পণ্যের মূল তালিকা Prop হিসেবে আদান প্রদান করা হচ্ছে, তাই এটি স্টেট হতে পারে না। সার্চ টেক্সট এবং চেকবক্স সম্ভবত State, কারণ এগুলোকে অন্য কোন কম্পোনেন্ট এর উপর নির্ভর করে হিসেব করা সম্ভব না এবং সময়ের সাথে পরিবর্তিত হয়। অবশেষে পণ্যের ফিল্টার করা তালিকা স্টেট না, কারণ তা সার্চ টেক্স এবং চেকবক্সের মান থেকে হিসেব করা সম্ভব।

পরিশেষে, আমাদের State গুলো হল:

  * ইউজার সার্চ বক্সে যা লিখে
  * চেকবক্সের মান

## ধাপ ৪: State এর অবস্থান নির্ধারণ {#step-4-identify-where-your-state-should-live}

<p data-height="600" data-theme-id="0" data-slug-hash="qPrNQZ" data-default-tab="js" data-user="lacker" data-embed-version="2" class="codepen">See the Pen <a href="https://codepen.io/gaearon/pen/qPrNQZ">Thinking In React: Step 4</a> on <a href="https://codepen.io">CodePen</a>.</p>

আচ্ছা, তো আমরা আমাদের অ্যাপ এর সংক্ষিপ্ত সংখ্যক State বের করে ফেলেছি। এখন, আমাদের নির্ধারণ করা লাগবে কোন কম্পোনেন্ট কোন State পরিবর্তন (Mutate) করে বা *নিজ মালিকানায় (Own)* রাখে।

মনে রাখুন: React এর মূল বিষয়ই হচ্ছে কম্পোনেন্ট hierarchy দিয়ে একমুখী ডেটা ফ্লো বা তথ্য প্রবাহ। প্রথমেই হয়ত বুঝা যাবে না কোন কম্পোনেন্ট কোন স্টেটকে নিজ মালিকানায় রাখবে বা পরিবর্তন করার অধিকার রাখবে। **প্রায়শই নতুনদের বুঝতে সবথেকে কঠিন বিষয় হিসেবে এটা দেখা যায়,** সুতরাং, এই ধাপগুলো অনুসরণ করে বুঝতে চেষ্টা করুন:

আপনার অ্যাপ এর প্রতিটি State এর জন্য:

  * প্রতিটি কম্পোনেন্ট চিহ্নিত করুন, যা এই State জন্য কোন কিছু প্রদর্শন করে।
  * একটি সাধারণ মালিক (owner) কম্পোনেন্ট বের করুন (State টি দরকার এমন কম্পোনেন্টের hierarchy তে যেই কম্পোনেন্ট সবার উপরে থাকে)।
  * এই সাধারণ মালিক কম্পোনেন্ট বা তারও উপরের কোন কম্পোনেন্ট এই State টির মালিকানা করা উচিত।
  * যদি এমন কোন কম্পোনেন্ট খুঁজে না পান, তাহলে শুধুমাত্র এই State টির জন্য একটি কম্পোনেন্ট তৈরি করুন যা hierarchy তে ওই সাধারণ মালিক কম্পোনেন্ট এর উপরে থাকে।

চলুন এই কৌশলটি আমাদের অ্যাপ্লিকেশনে ব্যবহার করে দেখি:

  * `ProductTable` এ  State অনুসারে প্রোডাক্ট লিস্ট ফিল্টার করা উচিৎ এবং `SearchBar` এ সার্চকৃত লেখা এবং চেক State দেখানো উচিৎ।
  * সাধারণ মালিক কম্পোনেন্ট হলো `FilterableProductTable`।
  * উক্ত ধারণামতে ফিল্টার টেক্সট এবং চেকড ভ্যেলু `FilterableProductTable` এ থাকাই যুক্তিযুক্ত।

অসাধারণ! তো আমরা সিদ্ধান্ত নিয়েছি আমাদের স্টেট টি `FilterableProductTable` কম্পোনেন্ট এ থাকবে। প্রথমে একটি instance property `this.state = {filterText: '', inStockOnly: false}` কম্পোনেন্টটির constructor এ যোগ করতে হবে, ফলে এটা আপনার অ্যাপ্লিকেশনের শুরুর অবস্থা প্রদর্শন করতে পারবে। এরপর `filterText` এবং `inStockOnly` কে `ProductTable` এবং `SearchBar` তে Prop হিসেবে পাঠিয়ে দিন । অবশেষে, এই Prop গুলো ব্যবহার করে `ProductTable` এর সারিগুলো ফিল্টার করুণ এবং `SearchBar` এর ফর্ম ফিল্ড এর মানগুলো ঠিক করে ফেলুন।

এখন আপনি চাইলে আপনার অ্যাপ্লিকেশন কেমন আচরণ করবে তা দেখতে পারেন: `filterText` এর মান `"ball"` দিয়ে অ্যাপ্লিকেশন রিফ্রেশ করুন। দেখবেন আপনার ডেটা টেবিল সঠিকভাবে আপডেটেট হয়ে গেছে।

## Step 5: Add Inverse Data Flow {#step-5-add-inverse-data-flow}

<p data-height="600" data-theme-id="0" data-slug-hash="LzWZvb" data-default-tab="js,result" data-user="rohan10" data-embed-version="2" data-pen-title="Thinking In React: Step 5" class="codepen">See the Pen <a href="https://codepen.io/gaearon/pen/LzWZvb">Thinking In React: Step 5</a> on <a href="https://codepen.io">CodePen</a>.</p>

এতক্ষণ পর্যন্ত আমরা একটি অ্যাপ বানিয়েছি যা hierarchy দিয়ে উপর থেকে নিচে  ফ্লো হওয়া State এবং Prop এর কারণে সঠিকভাবে প্রদর্শিত হয়। এখন সময় তথ্য প্রবাহকে উল্টোদিকে যাবার সুযোগ দেওয়া:  hierarchy এর অভ্যন্তরে থাকা ফর্ম কম্পোনেন্টকে `FilterableProductTable` এর স্টেট পরিবর্তনের ব্যবস্থা করে দেওয়া।

React এর এই তথ্য প্রবাহ সুস্পষ্ট হওয়ায় আপনি সহজে বুঝতে পারেন আপনার প্রোগ্রাম কিভাবে কাজ করে কিন্তু, এটিতে প্রথাগত দ্বিমুখী তথ্য প্রবাহ (two-way data binding) তুলনায় একটু বেশি কোড লিখতে হয়।

<<<<<<< HEAD
যদি আপনি উদাহরণের এখনকার ভার্শনের চেক বক্সে টিক দেবার চেস্টা করেন, দেখবেন React আপনার ইনপুট গ্রহণ করছে না। এইটা ইচ্ছা করেই করা হয়েছে, যেহেতু আমরা `input` এর `value` Prop সবসময় `FilterableProductTable` থেকে প্রেরিত `state` এর মতো রাখছি।
=======
If you try to type or check the box in the previous version of the example (step 4), you'll see that React ignores your input. This is intentional, as we've set the `value` prop of the `input` to always be equal to the `state` passed in from `FilterableProductTable`.
>>>>>>> f67fa22cc1faee261f9e22449d90323e26174e8e

আমরা কি করতে চাই তা এবার চিন্তা করি। আমরা চাচ্ছি যে, ব্যবহারকারী যখন ফর্ম এ কোন পরিবর্তন করবে, তখন স্টেট ও সেভাবে পরিবর্তিত হবে। যেহেতু  কম্পোনেন্ট এর শুধুমাত্র নিজেদের স্টেট পরিবর্তন করা উচিৎ, তাই যখন স্টেট পরিবর্তনের দরকার পরবে, `FilterableProductTable` কম্পোনেন্টটি `SearchBar` এ কলব্যাক পাঠাবে। আমরা ইনপুটগুলোতে `onChange` ইভেন্ট ব্যবহার করে এই বিষয়ে তথ্য পেতে পারি। `FilterableProductTable` এর কলব্যাক সমূহ `setState()` কে কল করবে, এবং অ্যাপটি আপডেট হয়ে যাবে।

## ব্যাস! হয়ে গেল {#and-thats-it}

আশা করা যায়, এই লেখাটিতে React এ কম্পোনেন্ট এবং অ্যাপ তৈরির সময় কিভাবে চিন্তা করবেন সে সম্পর্কে ধারণা পেয়েছেন। এটিতে যদিও একটু বেশি কোড লেখা লাগে, কিন্তু মনে রাখবেন যতবার কোড লেখা প্রয়োজন পরে তার থেকে অনেক বেশিবার কোড পড়ার প্রয়োজন পরে, এবং এটির মডুলার, সুস্পষ্ট কোড পড়তে অনেক সহজ হয়। আপনি যখন বড় লাইব্রেরী তৈরি শুরু করবেন, আপনার এই সুস্পষ্টতা এবং মডুলারিটি অত্যন্ত ভালো লাগবে, এবং কোড পুনঃব্যবহারের মাধ্যমে আপনার কোডের লাইন সংখ্যা কমতে শুরু করবে :)
