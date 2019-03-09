---
id: lists-and-keys
title: Lists and Keys
permalink: docs/lists-and-keys.html
prev: conditional-rendering.html
next: forms.html
---
প্রথমে চলুন আমরা পর্যালোচন করি কিভাবে আমরা JavaScript এ  লিস্ট রুপান্তর (তৈরি) করি


<!-- First, let's review how you transform lists in JavaScript. -->

নিচে প্রদত্ত কোড অনুযায়ী আমরা [`map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) ফাংশনটি ব্যবহার করে একটি `নাম্বার` অ্যারে নিয়ে তার মানকে দিগুণ করে দেই। `map()` ফাংশনটি দ্বারা প্রাপ্ত (রিটার্ন) মানকে আমরা `doubled` variable নামে সংজ্ঞায়িত করে একে কনসোল লগে (`console.log()`) প্রকাশ করি।
<!-- Given the code below, we use the [`map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) function to take an array of `numbers` and double their values. We assign the new array returned by `map()` to the variable `doubled` and log it: -->

```javascript{2}
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map((number) => number * 2);
console.log(doubled);
```

<!-- This code logs `[2, 4, 6, 8, 10]` to the console. -->
এই কোড কনসোলে  `[2, 4, 6, 8, 10]` প্রকাশ করে।
React এ অ্যারেকে লিস্ট [ উপাদানে (elements)](/docs/rendering-elements.html) রূপান্তর করা প্রায় একেই রকম।
<!-- In React, transforming arrays into lists of [elements](/docs/rendering-elements.html) is nearly identical. -->

<!-- ### Rendering Multiple Components {#rendering-multiple-components} -->
### একাধিক কম্পোনেন্টসকে (Components) রেন্ডার করা।{#rendering-multiple-components}

আপনি কারলি ব্র্যাকেট `{}` ব্যবহার করে এলিমেন্টস এর সম্ভার গঠন করতে পারবেন এবং তাদেরকে  [JSX এর অন্তর্ভুক্ত করতে পারবেন](/docs/introducing-jsx.html#embedding-expressions-in-jsx)
<!-- You can build collections of elements and [include them in JSX](/docs/introducing-jsx.html#embedding-expressions-in-jsx) using curly braces `{}`. -->

নিচে আমরা জাভাস্ক্রিপ্ট [`map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) ফাংশন ব্যবহার করে `numbers` অ্যারেকে লুপ করি। প্রত্যেকটা আইটেম এর জন্য আমরা একটি `<li>` element রিটার্ন করি। পরিশেষে আমরা প্রাপ্ত অ্যারে উপাদানকে `listItems` এর অন্তর্গত করিঃ
<!-- Below, we loop through the `numbers` array using the JavaScript [`map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) function. We return a `<li>` element for each item. Finally, we assign the resulting array of elements to `listItems`: -->

```javascript{2-4}
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li>{number}</li>
);
```
সম্পূর্ণ `listItems` অ্যারেকে আমরা একটি `<ul>` element এর ভিতরে রাখি এবং এটাকে [DOM এ রেন্ডার করি](/docs/rendering-elements.html#rendering-an-element-into-the-dom):
<!-- We include the entire `listItems` array inside a `<ul>` element, and [render it to the DOM](/docs/rendering-elements.html#rendering-an-element-into-the-dom): -->

```javascript{2}
ReactDOM.render(
  <ul>{listItems}</ul>,
  document.getElementById('root')
);
```

[** CodePen এ চালিয়ে দেখুন **](https://codepen.io/gaearon/pen/GjPyQr?editors=0011)

<!-- This code displays a bullet list of numbers between 1 and 5. -->
এই কোড ১ থেকে ৫ পর্যন্ত সংখ্যা গুলোকে বুলেট লিস্ট আকারে প্রকাশ করে।

<!-- ### Basic List Component {#basic-list-component} -->
### বেসিক লিস্ট কম্পোনেন্ট {#basic-list-component}
সাধারণত আপনি লিস্টগুলকে [কম্পোনেন্ট](/docs/components-and-props.html) এর মধ্যে রেন্ডার করবেন।
<!-- Usually you would render lists inside a [component](/docs/components-and-props.html). -->

আমরা পূর্বের উদাহারনকে এমন একটি কম্পোনেন্টে refactor করতে পারি যেটা `numbers`অ্যারেকে গ্রহন করবে এবং একটি  এলিমেন্টস লিস্ট  আউটপুট করবে ।
<!-- We can refactor the previous example into a component that accepts an array of `numbers` and outputs a list of elements. -->

```javascript{3-5,7,13}
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li>{number}</li>
  );
  return (
    <ul>{listItems}</ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```

<!-- When you run this code, you'll be given a warning that a key should be provided for list items. A "key" is a special string attribute you need to include when creating lists of elements. We'll discuss why it's important in the next section. -->
আপনি যখন এই কোড রান করবেন তখন একটি সতর্ক বার্তা পাবেন যে লিস্ট আইটেম গুলোর জন্য একটি করে  `key` দরকার। "key" হল একটি বিশেষ `string` attribute যা আপনার তখনই দরকার যখন আপনি elements এর লিস্ট তৈরি করবেন। এটি কি কারনে গুরুত্বপূর্ণ তা আমরা পরবর্তী অনুচ্ছেদে আলোচনা করব।

<!-- Let's assign a `key` to our list items inside `numbers.map()` and fix the missing key issue. -->
আসুন `numbers.map()` এর মধ্যে আমাদের লিস্ট আইটেম কে `key` দিয়ে দেই এবং 'key' না থাকার ইস্যুর সমাধান করি।

```javascript{4}
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li key={number.toString()}>
      {number}
    </li>
  );
  return (
    <ul>{listItems}</ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```

[**CodePen এ চালিয়ে দেখুন**](https://codepen.io/gaearon/pen/jrXYRR?editors=0011)

## Keys {#keys}

<!-- Keys help React identify which items have changed, are added, or are removed. Keys should be given to the elements inside the array to give the elements a stable identity: -->
Keys, কোন আইটেম টি পরিবর্তিত হইসে, কোনটি  যোগ হইসে অথবা কোনটি মুছে ফেলা হয়েছে তা সনাক্ত করতে React কে সাহায্য করে। এলিমেন্টসকে স্থির পরিচয় দেয়ার জন্য  অ্যারে এর মধ্যে এলিমেন্টসকে Keys প্রদান করতে হবে।

```js{3}
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li key={number.toString()}>
    {number}
  </li>
);
```

<!-- The best way to pick a key is to use a string that uniquely identifies a list item among its siblings. Most often you would use IDs from your data as keys: -->
Key নেয়ার সবচেয়ে ভালো উপায় হল এমন string  ব্যবহার করা যেগুলো পাশাপাশি অবস্থিত লিস্ট আইটেম গুলকে স্বতন্ত্রভাবে  চিহ্নিত করতে পারে।  অধিকাংশ সময় আপনি আপনার ডাটা থেকে আইডি গুলকে (IDs) keys হিসাবে ব্যবহার করবেন।
```js{2}
const todoItems = todos.map((todo) =>
  <li key={todo.id}>
    {todo.text}
  </li>
);
```

<!-- When you don't have stable IDs for rendered items, you may use the item index as a key as a last resort: -->
যখন  আপনার রেন্ডারড আইটেম এর জন্য কোন স্থিতিশীল আইডি (ID) থাকবেনা তখন আপনি  শেষ অবলম্বন হিসাবে আইটেম এর ইনডেক্স (index) কে Key  হিসাবে ব্যবহার করতে পারেন।

```js{2,3}
const todoItems = todos.map((todo, index) =>
  // Only do this if items have no stable IDs
  <li key={index}>
    {todo.text}
  </li>
);
```
যে ক্ষেত্রে আইটেম অর্ডার পরিবর্তন হতে পারে সে ক্ষেত্রে আমরা ইনডেক্স (indexes) ব্যবহার করতে সুপারিশ করব না। এটি performance এর উপর নেতিবাচক  প্রভাব ফেলতে পারে এবং কম্পোনেন্টে এর state এর   সমস্যা হতে পারে। এই বিষয় Robin Pokorny's এর আর্টিকেল  [ইনডেক্স কে key হিসাবে ব্যবহার এর নেতিবাচক প্রভাব এর বিস্তারিত ব্যাখ্যা ](https://medium.com/@robinpokorny/index-as-a-key-is-an-anti-pattern-e0349aece318) দেখুন। আপনি যদি লিস্ট আইটেমকে সূস্পষ্ট কোন key  নির্ধারণ করে না দেন তাহলে React ডিফল্ট হিসাবে ইনডেক্সকে keys হিসাবে  ব্যবহার করবে
<!-- We don't recommend using indexes for keys if the order of items may change. This can negatively impact performance and may cause issues with component state. Check out Robin Pokorny's article for an [in-depth explanation on the negative impacts of using an index as a key](https://medium.com/@robinpokorny/index-as-a-key-is-an-anti-pattern-e0349aece318). If you choose not to assign an explicit key to list items then React will default to using indexes as keys. -->

আপনি যদি আরো শেখার আগ্রহী হন তাহলে দেখতে পারেন [ Key কেন দরকারি এর বিস্তারিত ব্যাখ্যা](/docs/reconciliation.html#recursing-on-children)
<!-- Here is an [in-depth explanation about why keys are necessary](/docs/reconciliation.html#recursing-on-children) if you're interested in learning more. -->
<!-- 
### Extracting Components with Keys {#extracting-components-with-keys} -->
### কম্পোনেন্টেকে Keys সহ  Extract করা {#extracting-components-with-keys}
<!-- Keys only make sense in the context of the surrounding array. -->
কেবলমাত্র অ্যারে উপাদান গুলোর ক্ষেত্রেই Keys গুলো অর্থপূর্ন হয়।

<!-- For example, if you [extract](/docs/components-and-props.html#extracting-components) a `ListItem` component, you should keep the key on the `<ListItem />` elements in the array rather than on the `<li>` element in the `ListItem` itself. -->

উদাহারন স্বরূপ যদি তুমি একটি `ListItem` কম্পোনেন্টেকে  [extract](/docs/components-and-props.html#extracting-components) কর তাহলে তুমি অ্যারে এর key কে `ListItem` এর `<li>`এলিমেন্ট এর পরিবর্তে `<ListItem />` এলিমেন্ট এর মধ্যেই দিয়ে দিবে।
<!-- **Example: Incorrect Key Usage** -->
**উদাহারন:  Key এর ভুল ব্যবহার**

```javascript{4,5,14,15}
function ListItem(props) {
  const value = props.value;
  return (
    // Wrong! There is no need to specify the key here:
    <li key={value.toString()}>
      {value}
    </li>
  );
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    // Wrong! The key should have been specified here:
    <ListItem value={number} />
  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```

<!-- **Example: Correct Key Usage** -->
**উদাহারন:  Key এর সঠিক ব্যবহার**

```javascript{2,3,9,10}
function ListItem(props) {
  // Correct! There is no need to specify the key here:
  return <li>{props.value}</li>;
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    // Correct! Key should be specified inside the array.
    <ListItem key={number.toString()}
              value={number} />
  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```

[**CodePen এ চালিয়ে দেখুন**](https://codepen.io/gaearon/pen/ZXeOGM?editors=0010)

<!-- A good rule of thumb is that elements inside the `map()` call need keys. -->
একটি ভাল প্রচলিত রীতি হল `map()` ফাংশন  কল এর মধ্যের এলিমেন্টস গুলোর keys দরকার।

<!-- ### Keys Must Only Be Unique Among Siblings {#keys-must-only-be-unique-among-siblings} -->

### পারিপার্শ্বিক এলিমেন্টস গুলোর মধ্যে Keys কে  অদ্বিতীয় হতে হবে {#keys-must-only-be-unique-among-siblings}

<!-- Keys used within arrays should be unique among their siblings. However they don't need to be globally unique. We can use the same keys when we produce two different arrays: -->
অ্যারের মধ্যে ব্যবহৃত Keys তাদের পারিপার্শ্বিক   অন্যান্য আইটেম গুলোর মধ্যে অনন্য হতে হবে কিন্ত গ্লোবাল ভাবে তাদের অনন্য হওয়া দরকারি না। আমরা দুইটি ভিন্ন ভিন্ন অ্যারে এর ক্ষেত্রে একেই keys ব্যবহার করতে পারি।

```js{2,5,11,12,19,21}
function Blog(props) {
  const sidebar = (
    <ul>
      {props.posts.map((post) =>
        <li key={post.id}>
          {post.title}
        </li>
      )}
    </ul>
  );
  const content = props.posts.map((post) =>
    <div key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
    </div>
  );
  return (
    <div>
      {sidebar}
      <hr />
      {content}
    </div>
  );
}

const posts = [
  {id: 1, title: 'Hello World', content: 'Welcome to learning React!'},
  {id: 2, title: 'Installation', content: 'You can install React from npm.'}
];
ReactDOM.render(
  <Blog posts={posts} />,
  document.getElementById('root')
);
```

[**CodePen এ চালিয়ে দেখুন**](https://codepen.io/gaearon/pen/NRZYGN?editors=0010)

<!-- Keys serve as a hint to React but they don't get passed to your components. If you need the same value in your component, pass it explicitly as a prop with a different name: -->
 React এ সংকেত হিসাবে Keys বাবহারিত হয় কিন্ত এটি আপনার কম্পোনেন্ট  এর মধ্যে দিয়ে পাস (pass) হয়না। আপনার কম্পোনেন্ট এর যদি ওই একই মান প্রয়োজন হয় তাহলে এটাকে ভিন্ন নামে prop হিসাবে কম্পোনেন্ট সুস্পষ্ট ভাবে পাস (pass) করে দিন।

```js{3,4}
const content = posts.map((post) =>
  <Post
    key={post.id}
    id={post.id}
    title={post.title} />
);
```

<!-- With the example above, the `Post` component can read `props.id`, but not `props.key`. -->
উপরের উদাহরণ অনুসারে `Post` কম্পোনেন্ট টি  `props.id` পড়তে পারে কিন্ত `props.key` পড়তে পারে না।

<!-- ### Embedding map() in JSX {#embedding-map-in-jsx} -->
### map() কে JSX এ বসান {#embedding-map-in-jsx}

<!-- In the examples above we declared a separate `listItems` variable and included it in JSX: -->
নিচের উদাহরণে আমরা একটি পৃথক `listItems` ভারিয়াবল ঘোষণা দেই এবং এটাকে JSX এ অন্তর্গত করি।

```js{3-6}
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <ListItem key={number.toString()}
              value={number} />
  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}
```

<!-- JSX allows [embedding any expression](/docs/introducing-jsx.html#embedding-expressions-in-jsx) in curly braces so we could inline the `map()` result: -->

JSX [যেকোন এক্সপেসন কে কারলি ব্র্যাকেটে  স্থাপন](/docs/introducing-jsx.html#embedding-expressions-in-jsx) করার অনুমতি দেয় তাই আমরা `map()`এর ফলাফল সারিবদ্ধভাবে প্রকাশ করতে পারি।

```js{5-8}
function NumberList(props) {
  const numbers = props.numbers;
  return (
    <ul>
      {numbers.map((number) =>
        <ListItem key={number.toString()}
                  value={number} />
      )}
    </ul>
  );
}
```

[**CodePen এ চালিয়ে দেখুন**](https://codepen.io/gaearon/pen/BLvYrB?editors=0010)

<!-- Sometimes this results in clearer code, but this style can also be abused. Like in JavaScript, it is up to you to decide whether it is worth extracting a variable for readability. Keep in mind that if the `map()` body is too nested, it might be a good time to [extract a component](/docs/components-and-props.html#extracting-components). -->

এর ফলে মাঝেমাঝে পরিছন্ন কোড পাওয়া যায়, কিন্ত এই   স্টাইল এর ও অপবাবহার হতে পারে। JavaScript এর মত এটাও আপনার সিধান্ত যে পড়ার সুবিধার জন্য আপনার া এখান থেকে একটি ভারিয়াবল বের করা যুক্তিযুক্ত কিনা। মনে রাখা দরকার যদি `map()` বডি যদি অনেক বেশি nested হয়, তাহলে এটি একটি [কম্পোনেন্ট বের করে আনার](/docs/components-and-props.html#extracting-components) জন্য উপযুক্ত সময়।
