---
id: react-dom-server
title: ReactDOMServer
layout: docs
category: Reference
permalink: docs/react-dom-server.html
---

`ReactDOMServer` কম্পোনেন্টকে static মার্কআপে রেন্ডার করতে সাহায্য করে। এটি সাধারণত Node সার্ভারে ব্যবহৃত হয়ঃ

```js
// ES modules
import ReactDOMServer from 'react-dom/server';
// CommonJS
var ReactDOMServer = require('react-dom/server');
```

## সারমর্ম {#overview}

নিম্নোক্ত মেথডগুলো সার্ভার এবং ব্রাউজার উভয় ইনভায়রনমেন্টে ব্যবহৃত হয়ঃ

- [`renderToString()`](#rendertostring)
- [`renderToStaticMarkup()`](#rendertostaticmarkup)

এই অতিরিক্ত মেথডগুলো (`stream`) প্যাকেজের উপর নির্ভর করে যা **কেবল সার্ভারে কাজ করে**, ব্রাউজারে এগুলো কাজ করবে না।

- [`renderToPipeableStream()`](#rendertopipeablestream)
- [`renderToReadableStream()`](#rendertoreadablestream)
- [`renderToNodeStream()`](#rendertonodestream) (Deprecated)
- [`renderToStaticNodeStream()`](#rendertostaticnodestream)

* * *

## রেফারেন্স {#reference}

### `renderToString()` {#rendertostring}

```javascript
ReactDOMServer.renderToString(element)
```

এটি React element কে তার প্রাথমিক HTML এ রেন্ডার করে। React তখন একটি HTML string রিটার্ন করবে। আপনি এই মেথডটি ব্যবহার করে সার্ভারে HTML তৈরি করতে পারেন এবং দ্রুত পেজ লোড ও SEO এর উদ্দেশ্যে সার্চ ইঞ্জিনকে আপনার পেজটি crawl করার জন্য প্রাথমিক রিকোয়েস্টেই এই মার্কআপটি প্রদান করতে পারেন।

<<<<<<< HEAD
আপনি যদি [`ReactDOM.hydrate()`](/docs/react-dom.html#hydrate)কে এমন একটি node এ কল করেন, যার ইতিমধ্যে ওই server-rendered মার্কআপটি রয়েছে, React তখন সেটিকে সংরক্ষণ করবে এবং শুধু ইভেন্ট হেন্ডেলারগুলোকে সংযুক্ত করবে, যা আপনাকে খুবই কার্যকর একটি first-load অভিজ্ঞতা দিবে।
=======
If you call [`ReactDOM.hydrateRoot()`](/docs/react-dom-client.html#hydrateroot) on a node that already has this server-rendered markup, React will preserve it and only attach event handlers, allowing you to have a very performant first-load experience.
>>>>>>> 707f22d25f5b343a2e5e063877f1fc97cb1f48a1

* * *

### `renderToStaticMarkup()` {#rendertostaticmarkup}

```javascript
ReactDOMServer.renderToStaticMarkup(element)
```

এটি [`renderToString`](#rendertostring) এর মতই, তবে React তার নিজ প্রয়োজনে যেসব অতিরিক্ত DOM attributes ব্যবহার করে, এটি তা তৈরি করে না, যেমন `data-reactroot`। যদি আপনি Reactকে static পেজ জেনারেটরের মত ব্যবহার করতে চান, তবে এটি খুব উপকারি, কারণ এটি অতিরিক্ত attributes মুছে ফেলে কিছু bytes বাঁচিয়ে দেয়।

<<<<<<< HEAD
আপনি যদি মার্কআপকে interactive করার জন্য ক্লায়েন্টে React ব্যবহার করার পরিকল্পনা করেন, তবে এই মেথডটি ব্যবহার করবেন না। এর পরিবর্তে সার্ভারে [`renderToString`](#rendertostring) এবং ক্লায়েন্টে [`ReactDOM.hydrate()`](/docs/react-dom.html#hydrate) ব্যবহার করুন।
=======
If you plan to use React on the client to make the markup interactive, do not use this method. Instead, use [`renderToString`](#rendertostring) on the server and [`ReactDOM.hydrateRoot()`](/docs/react-dom-client.html#hydrateroot) on the client.
>>>>>>> 707f22d25f5b343a2e5e063877f1fc97cb1f48a1

* * *

### `renderToPipeableStream()` {#rendertopipeablestream}

```javascript
ReactDOMServer.renderToPipeableStream(element, options)
```

Render a React element to its initial HTML. Returns a [Control object](https://github.com/facebook/react/blob/3f8990898309c61c817fbf663f5221d9a00d0eaa/packages/react-dom/src/server/ReactDOMFizzServerNode.js#L49-L54) that allows you to pipe the output or abort the request. Fully supports Suspense and streaming of HTML with "delayed" content blocks "popping in" later through javascript execution. [Read more](https://github.com/reactwg/react-18/discussions/37)

If you call [`ReactDOM.hydrateRoot()`](/docs/react-dom-client.html#hydrateroot) on a node that already has this server-rendered markup, React will preserve it and only attach event handlers, allowing you to have a very performant first-load experience.

> Note:
>
> This is a Node.js specific API and modern server environments should use renderToReadableStream instead.
>

```
const {pipe, abort} = renderToPipeableStream(
  <App />,
  {
    onAllReady() {
      res.statusCode = 200;
      res.setHeader('Content-type', 'text/html');
      pipe(res);
    },
    onShellError(x) {
      res.statusCode = 500;
      res.send(
        '<!doctype html><p>Loading...</p><script src="clientrender.js"></script>'
      );
    }
  }
);
```

* * *

### `renderToReadableStream()` {#rendertoreadablestream}

```javascript
    ReactDOMServer.renderToReadableStream(element, options);
```

Streams a React element to its initial HTML. Returns a [Readable Stream](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream). Fully supports Suspense and streaming of HTML. [Read more](https://github.com/reactwg/react-18/discussions/127)

If you call [`ReactDOM.hydrateRoot()`](/docs/react-dom-client.html#hydrateroot) on a node that already has this server-rendered markup, React will preserve it and only attach event handlers, allowing you to have a very performant first-load experience.

```
let controller = new AbortController();
try {
  let stream = await renderToReadableStream(
    <html>
      <body>Success</body>
    </html>,
    {
      signal: controller.signal,
    }
  );
  
  // This is to wait for all suspense boundaries to be ready. You can uncomment
  // this line if you don't want to stream to the client
  // await stream.allReady;

  return new Response(stream, {
    headers: {'Content-Type': 'text/html'},
  });
} catch (error) {
  return new Response(
    '<!doctype html><p>Loading...</p><script src="clientrender.js"></script>',
    {
      status: 500,
      headers: {'Content-Type': 'text/html'},
    }
  );
}
```
* * *

### `renderToNodeStream()` {#rendertonodestream} (Deprecated)

```javascript
ReactDOMServer.renderToNodeStream(element)
```

এটি React element কে তার প্রাথমিক HTML এ রেন্ডার করে। এটি একটি [Readable stream](https://nodejs.org/api/stream.html#stream_readable_streams) রিটার্ন করে যেটি একটি HTML string আউটপুট দেয়। এই stream থেকে আউটপুট পাওয়া HTMLটি আসলে [`ReactDOMServer.renderToString`](#rendertostring) যা রিটার্ন করে তার অনুরূপ। আপনি এই মেথডটি ব্যবহার করে সার্ভারে HTML তৈরি করতে পারেন এবং দ্রুত পেজ লোড ও SEO এর উদ্দেশ্যে সার্চ ইঞ্জিনকে আপনার পেজটি crawl করার জন্য প্রাথমিক রিকোয়েস্টেই এই মার্কআপটি প্রদান করতে পারেন।

<<<<<<< HEAD
আপনি যদি [`ReactDOM.hydrate()`](/docs/react-dom.html#hydrate)কে এমন একটি node এ কল করেন, যার ইতিমধ্যে ওই server-rendered মার্কআপটি রয়েছে, React তখন সেটিকে সংরক্ষণ করবে এবং শুধু ইভেন্ট হেন্ডেলারগুলোকে সংযুক্ত করবে, যা আপনাকে খুবই কার্যকর একটি first-load অভিজ্ঞতা দিবে।
=======
If you call [`ReactDOM.hydrateRoot()`](/docs/react-dom-client.html#hydrateroot) on a node that already has this server-rendered markup, React will preserve it and only attach event handlers, allowing you to have a very performant first-load experience.
>>>>>>> 707f22d25f5b343a2e5e063877f1fc97cb1f48a1

> বিঃদ্রঃ
>
> শুধুমাত্র সার্ভারে ব্যবহারযোগ্য। এই APIটি ব্রাউজারে পাওয়া যাবে না।
>
> এই মেথড যেই streamটি রিটার্ন করে সেটি আসলে একটি byte stream যা utf-8 এ এনকোড করা। আপনি যদি ভিন্ন কোন এনকোডের stream চান, তবে [iconv-lite](https://www.npmjs.com/package/iconv-lite) এর মত প্রজেক্ট দেখতে পারেন, যা streamকে ট্রান্সকোডিং টেক্সটের জন্য পরিবর্তন করতে পারে।

* * *

### `renderToStaticNodeStream()` {#rendertostaticnodestream}

```javascript
ReactDOMServer.renderToStaticNodeStream(element)
```

এটি [`renderToNodeStream`](#rendertonodestream) এর মতই, তবে React তার নিজ প্রয়োজনে যেসব অতিরিক্ত DOM attributes ব্যবহার করে, এটি তা তৈরি করে না, যেমন `data-reactroot`। যদি আপনি Reactকে static পেজ জেনারেটরের মত ব্যবহার করতে চান, তবে এটি খুব উপকারি, কারণ এটি অতিরিক্ত attributes মুছে ফেলে কিছু bytes বাঁচিয়ে দেয়।

এই stream থেকে আউটপুট পাওয়া HTML আসলে [`ReactDOMServer.renderToStaticMarkup`](#rendertostaticmarkup) যা রিটার্ন করে তার অনুরূপ।

<<<<<<< HEAD
আপনি যদি মার্কআপকে interactive করার জন্য ক্লায়েন্টে React ব্যবহার করার পরিকল্পনা করেন, তবে এই মেথডটি ব্যবহার করবেন না। এর পরিবর্তে সার্ভারে [`renderToNodeStream`](#rendertonodestream) এবং ক্লায়েন্টে [`ReactDOM.hydrate()`](/docs/react-dom.html#hydrate) ব্যবহার করুন।
=======
If you plan to use React on the client to make the markup interactive, do not use this method. Instead, use [`renderToNodeStream`](#rendertonodestream) on the server and [`ReactDOM.hydrateRoot()`](/docs/react-dom-client.html#hydrateroot) on the client.
>>>>>>> 707f22d25f5b343a2e5e063877f1fc97cb1f48a1

> বিঃদ্রঃ
>
> শুধুমাত্র সার্ভারে ব্যবহারযোগ্য। এই APIটি ব্রাউজারে পাওয়া যাবে না।
>
> এই মেথড যেই streamটি রিটার্ন করে সেটি আসলে একটি byte stream যা utf-8 এ এনকোড করা। আপনি যদি ভিন্ন কোন এনকোডের stream চান, তবে [iconv-lite](https://www.npmjs.com/package/iconv-lite) এর মত প্রজেক্ট দেখতে পারেন, যা streamকে ট্রান্সকোডিং টেক্সটের জন্য পরিবর্তন করতে পারে।
