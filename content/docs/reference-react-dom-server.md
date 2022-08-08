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
import * as ReactDOMServer from 'react-dom/server';
// CommonJS
var ReactDOMServer = require('react-dom/server');
```

## সারমর্ম {#overview}

<<<<<<< HEAD
নিম্নোক্ত মেথডগুলো সার্ভার এবং ব্রাউজার উভয় ইনভায়রনমেন্টে ব্যবহৃত হয়ঃ
=======
These methods are only available in the **environments with [Node.js Streams](https://nodejs.dev/learn/nodejs-streams):**

- [`renderToPipeableStream()`](#rendertopipeablestream)
- [`renderToNodeStream()`](#rendertonodestream) (Deprecated)
- [`renderToStaticNodeStream()`](#rendertostaticnodestream)

These methods are only available in the **environments with [Web Streams](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API)** (this includes browsers, Deno, and some modern edge runtimes):

- [`renderToReadableStream()`](#rendertoreadablestream)

The following methods can be used in the environments that don't support streams:
>>>>>>> 4808a469fa782cead9802619b0341b27b342e2d3

- [`renderToString()`](#rendertostring)
- [`renderToStaticMarkup()`](#rendertostaticmarkup)

<<<<<<< HEAD
এই অতিরিক্ত মেথডগুলো (`stream`) প্যাকেজের উপর নির্ভর করে যা **কেবল সার্ভারে কাজ করে**, ব্রাউজারে এগুলো কাজ করবে না।

- [`renderToNodeStream()`](#rendertonodestream)
- [`renderToStaticNodeStream()`](#rendertostaticnodestream)

* * *

## রেফারেন্স {#reference}
=======
## Reference {#reference}
>>>>>>> 4808a469fa782cead9802619b0341b27b342e2d3

### `renderToPipeableStream()` {#rendertopipeablestream}

```javascript
ReactDOMServer.renderToPipeableStream(element, options)
```

<<<<<<< HEAD
এটি React element কে তার প্রাথমিক HTML এ রেন্ডার করে। React তখন একটি HTML string রিটার্ন করবে। আপনি এই মেথডটি ব্যবহার করে সার্ভারে HTML তৈরি করতে পারেন এবং দ্রুত পেজ লোড ও SEO এর উদ্দেশ্যে সার্চ ইঞ্জিনকে আপনার পেজটি crawl করার জন্য প্রাথমিক রিকোয়েস্টেই এই মার্কআপটি প্রদান করতে পারেন।

আপনি যদি [`ReactDOM.hydrate()`](/docs/react-dom.html#hydrate)কে এমন একটি node এ কল করেন, যার ইতিমধ্যে ওই server-rendered মার্কআপটি রয়েছে, React তখন সেটিকে সংরক্ষণ করবে এবং শুধু ইভেন্ট হেন্ডেলারগুলোকে সংযুক্ত করবে, যা আপনাকে খুবই কার্যকর একটি first-load অভিজ্ঞতা দিবে।
=======
Render a React element to its initial HTML. Returns a stream with a `pipe(res)` method to pipe the output and `abort()` to abort the request. Fully supports Suspense and streaming of HTML with "delayed" content blocks "popping in" via inline `<script>` tags later. [Read more](https://github.com/reactwg/react-18/discussions/37)

If you call [`ReactDOM.hydrateRoot()`](/docs/react-dom-client.html#hydrateroot) on a node that already has this server-rendered markup, React will preserve it and only attach event handlers, allowing you to have a very performant first-load experience.

```javascript
let didError = false;
const stream = renderToPipeableStream(
  <App />,
  {
    onShellReady() {
      // The content above all Suspense boundaries is ready.
      // If something errored before we started streaming, we set the error code appropriately.
      res.statusCode = didError ? 500 : 200;
      res.setHeader('Content-type', 'text/html');
      stream.pipe(res);
    },
    onShellError(error) {
      // Something errored before we could complete the shell so we emit an alternative shell.
      res.statusCode = 500;
      res.send(
        '<!doctype html><p>Loading...</p><script src="clientrender.js"></script>'
      );
    },
    onAllReady() {
      // If you don't want streaming, use this instead of onShellReady.
      // This will fire after the entire page content is ready.
      // You can use this for crawlers or static generation.

      // res.statusCode = didError ? 500 : 200;
      // res.setHeader('Content-type', 'text/html');
      // stream.pipe(res);
    },
    onError(err) {
      didError = true;
      console.error(err);
    },
  }
);
```

See the [full list of options](https://github.com/facebook/react/blob/14c2be8dac2d5482fda8a0906a31d239df8551fc/packages/react-dom/src/server/ReactDOMFizzServerNode.js#L36-L46).

> Note:
>
> This is a Node.js-specific API. Environments with [Web Streams](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API), like Deno and modern edge runtimes, should use [`renderToReadableStream`](#rendertoreadablestream) instead.
>
>>>>>>> 4808a469fa782cead9802619b0341b27b342e2d3

* * *

### `renderToReadableStream()` {#rendertoreadablestream}

```javascript
ReactDOMServer.renderToReadableStream(element, options);
```

<<<<<<< HEAD
এটি [`renderToString`](#rendertostring) এর মতই, তবে React তার নিজ প্রয়োজনে যেসব অতিরিক্ত DOM attributes ব্যবহার করে, এটি তা তৈরি করে না, যেমন `data-reactroot`। যদি আপনি Reactকে static পেজ জেনারেটরের মত ব্যবহার করতে চান, তবে এটি খুব উপকারি, কারণ এটি অতিরিক্ত attributes মুছে ফেলে কিছু bytes বাঁচিয়ে দেয়।

আপনি যদি মার্কআপকে interactive করার জন্য ক্লায়েন্টে React ব্যবহার করার পরিকল্পনা করেন, তবে এই মেথডটি ব্যবহার করবেন না। এর পরিবর্তে সার্ভারে [`renderToString`](#rendertostring) এবং ক্লায়েন্টে [`ReactDOM.hydrate()`](/docs/react-dom.html#hydrate) ব্যবহার করুন।
=======
Streams a React element to its initial HTML. Returns a Promise that resolves to a [Readable Stream](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream). Fully supports Suspense and streaming of HTML. [Read more](https://github.com/reactwg/react-18/discussions/127)

If you call [`ReactDOM.hydrateRoot()`](/docs/react-dom-client.html#hydrateroot) on a node that already has this server-rendered markup, React will preserve it and only attach event handlers, allowing you to have a very performant first-load experience.

```javascript
let controller = new AbortController();
let didError = false;
try {
  let stream = await renderToReadableStream(
    <html>
      <body>Success</body>
    </html>,
    {
      signal: controller.signal,
      onError(error) {
        didError = true;
        console.error(error);
      }
    }
  );
  
  // This is to wait for all Suspense boundaries to be ready. You can uncomment
  // this line if you want to buffer the entire HTML instead of streaming it.
  // You can use this for crawlers or static generation:

  // await stream.allReady;

  return new Response(stream, {
    status: didError ? 500 : 200,
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

See the [full list of options](https://github.com/facebook/react/blob/14c2be8dac2d5482fda8a0906a31d239df8551fc/packages/react-dom/src/server/ReactDOMFizzServerBrowser.js#L27-L35).

> Note:
>
> This API depends on [Web Streams](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API). For Node.js, use [`renderToPipeableStream`](#rendertopipeablestream) instead.
>
>>>>>>> 4808a469fa782cead9802619b0341b27b342e2d3

* * *

### `renderToNodeStream()`  (Deprecated) {#rendertonodestream}

```javascript
ReactDOMServer.renderToNodeStream(element)
```

<<<<<<< HEAD
এটি React element কে তার প্রাথমিক HTML এ রেন্ডার করে। এটি একটি [Readable stream](https://nodejs.org/api/stream.html#stream_readable_streams) রিটার্ন করে যেটি একটি HTML string আউটপুট দেয়। এই stream থেকে আউটপুট পাওয়া HTMLটি আসলে [`ReactDOMServer.renderToString`](#rendertostring) যা রিটার্ন করে তার অনুরূপ। আপনি এই মেথডটি ব্যবহার করে সার্ভারে HTML তৈরি করতে পারেন এবং দ্রুত পেজ লোড ও SEO এর উদ্দেশ্যে সার্চ ইঞ্জিনকে আপনার পেজটি crawl করার জন্য প্রাথমিক রিকোয়েস্টেই এই মার্কআপটি প্রদান করতে পারেন।

আপনি যদি [`ReactDOM.hydrate()`](/docs/react-dom.html#hydrate)কে এমন একটি node এ কল করেন, যার ইতিমধ্যে ওই server-rendered মার্কআপটি রয়েছে, React তখন সেটিকে সংরক্ষণ করবে এবং শুধু ইভেন্ট হেন্ডেলারগুলোকে সংযুক্ত করবে, যা আপনাকে খুবই কার্যকর একটি first-load অভিজ্ঞতা দিবে।
=======
Render a React element to its initial HTML. Returns a [Node.js Readable stream](https://nodejs.org/api/stream.html#stream_readable_streams) that outputs an HTML string. The HTML output by this stream is exactly equal to what [`ReactDOMServer.renderToString`](#rendertostring) would return. You can use this method to generate HTML on the server and send the markup down on the initial request for faster page loads and to allow search engines to crawl your pages for SEO purposes.

If you call [`ReactDOM.hydrateRoot()`](/docs/react-dom-client.html#hydrateroot) on a node that already has this server-rendered markup, React will preserve it and only attach event handlers, allowing you to have a very performant first-load experience.
>>>>>>> 4808a469fa782cead9802619b0341b27b342e2d3

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
>>>>>>> 4808a469fa782cead9802619b0341b27b342e2d3

> বিঃদ্রঃ
>
> শুধুমাত্র সার্ভারে ব্যবহারযোগ্য। এই APIটি ব্রাউজারে পাওয়া যাবে না।
>
<<<<<<< HEAD
> এই মেথড যেই streamটি রিটার্ন করে সেটি আসলে একটি byte stream যা utf-8 এ এনকোড করা। আপনি যদি ভিন্ন কোন এনকোডের stream চান, তবে [iconv-lite](https://www.npmjs.com/package/iconv-lite) এর মত প্রজেক্ট দেখতে পারেন, যা streamকে ট্রান্সকোডিং টেক্সটের জন্য পরিবর্তন করতে পারে।
=======
> The stream returned from this method will return a byte stream encoded in utf-8. If you need a stream in another encoding, take a look at a project like [iconv-lite](https://www.npmjs.com/package/iconv-lite), which provides transform streams for transcoding text.

* * *

### `renderToString()` {#rendertostring}

```javascript
ReactDOMServer.renderToString(element)
```

Render a React element to its initial HTML. React will return an HTML string. You can use this method to generate HTML on the server and send the markup down on the initial request for faster page loads and to allow search engines to crawl your pages for SEO purposes.

If you call [`ReactDOM.hydrateRoot()`](/docs/react-dom-client.html#hydrateroot) on a node that already has this server-rendered markup, React will preserve it and only attach event handlers, allowing you to have a very performant first-load experience.

> Note
>
> This API has limited Suspense support and does not support streaming.
>
> On the server, it is recommended to use either [`renderToPipeableStream`](#rendertopipeablestream) (for Node.js) or [`renderToReadableStream`](#rendertoreadablestream) (for Web Streams) instead.

* * *

### `renderToStaticMarkup()` {#rendertostaticmarkup}

```javascript
ReactDOMServer.renderToStaticMarkup(element)
```

Similar to [`renderToString`](#rendertostring), except this doesn't create extra DOM attributes that React uses internally, such as `data-reactroot`. This is useful if you want to use React as a simple static page generator, as stripping away the extra attributes can save some bytes.

If you plan to use React on the client to make the markup interactive, do not use this method. Instead, use [`renderToString`](#rendertostring) on the server and [`ReactDOM.hydrateRoot()`](/docs/react-dom-client.html#hydrateroot) on the client.
>>>>>>> 4808a469fa782cead9802619b0341b27b342e2d3
