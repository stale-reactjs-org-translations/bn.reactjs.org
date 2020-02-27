---
id: dom-elements
title: DOM Elements
layout: docs
category: Reference
permalink: docs/dom-elements.html
redirect_from:
  - "docs/tags-and-attributes.html"
  - "docs/dom-differences.html"
  - "docs/special-non-dom-attributes.html"
  - "docs/class-name-manipulation.html"
  - "tips/inline-styles.html"
  - "tips/style-props-value-px.html"
  - "tips/dangerously-set-inner-html.html"
---

React পারফরমেন্স এবং ক্রস-ব্রাউজারের উপযোগিতা চিন্তা করে একটি ব্রাউজার-নিরপেক্ষ DOM সিস্টেম তৈরি করে। আমরা এই সুবিধাকে কাজে লাগিয়ে ব্রাউজারে DOM তৈরির সময় কিছু অপ্রয়োজনীয় কাজ মুছে ফেলতে পারি।

React এ, সব DOM properties এবং attributes গুলো (ইভেন্ট হ্যান্ডেলারসহ) camelCase হওয়া উচিত। উদাহরণস্বরূপ, HTML `tabindex` attributeটি React এর `tabIndex` এর অনুরূপ। ব্যতিক্রম কেবল `aria-*` এবং `data-*` attributeগুলো, যেগুলো lowercase হওয়া উচিত। উদাহরণস্বরূপ, আপনি `aria-label`কে `aria-label` হিসেবেই রাখতে পারেন।

## Attributes এর মধ্যে পার্থক্য {#differences-in-attributes}

React এবং HTML এর মধ্যে কিছু attributes আছে যেগুলো ভিন্নভাবে কাজ করেঃ

### checked {#checked}

`checked` attributeটি `<input>` কম্পোনেন্টের `checkbox` অথবা `radio` টাইপে সাপোর্ট করে। যেখানে এই কম্পোনেন্টটি checked হয়, সেখানেই আপনি এটি ব্যবহার করতে পারেন। এটি controlled কম্পোনেন্ট তৈরির জন্য খুব উপকারী। `defaultChecked` এটির uncontrolled রূপ, যেটি কম্পোনেন্টটি প্রথম মাউন্ট হওয়ার সময় সেট হয়।

### className {#classname}

CSS class তৈরির সময় `className` attributeটি ব্যবহার করুন। এটি সকল DOM এবং SVG elements যেমন `<div>`, `<a>`, এবং অন্যান্য elements এর উপর ব্যবহৃত হয়।

আপনি যদি Web কম্পোনেন্ট দিয়ে React ব্যবহার করতে চান (যেটি আসলে বিরল), তবে `class` attribute ব্যবহার করুন।

### dangerouslySetInnerHTML {#dangerouslysetinnerhtml}

`dangerouslySetInnerHTML` হচ্ছে ব্রাউজার DOM এর `innerHTML` এর একটি React বিকল্প। সাধারণত, কোডের মাধ্যমে HTML সেট করা বিপদজনক, কারণ এটি সহজেই আপনার ইউজারকে অসাবধানতাবশত [cross-site scripting (XSS)](https://en.wikipedia.org/wiki/Cross-site_scripting) এটাকের শিকার করে। তাই আপনি React এর মাধ্যমে সরাসরি HTML সেট করতে পারেন, কিন্তু আপনাকে অবশ্যই `dangerouslySetInnerHTML` লিখতে হবে এবং `__html` key সহ একটি object পাঠাতে হবে, যাতে করে আপনি মনে রাখতে পারেন এটি বিপদজনক। উদাহরণস্বরূপঃ

```js
function createMarkup() {
  return {__html: 'First &middot; Second'};
}

function MyComponent() {
  return <div dangerouslySetInnerHTML={createMarkup()} />;
}
```

### htmlFor {#htmlfor}

যেহেতু `for` হচ্ছে জাভাস্ক্রিপ্টের একটি সংরক্ষিত শব্দ, সেহেতু React elements `htmlFor` ব্যবহার করে।

### onChange {#onchange}

`onChange` ইভেন্টটি আপনি যেভাবে আশা করেন সেভাবেই কাজ করেঃ যখনি একটি ফর্ম ফিল্ড পরিবর্তন হবে, তখনি এই ইভেন্টটি ফায়ার হবে। আমরা ইচ্ছাকৃতভাবে বিদ্যমান ব্রাউজারের আচরণ ব্যবহার করি না কারণ `onChange` তার আচরণের প্রেক্ষিতে একটি অসঙ্গত নামকরণ এবং React রিয়েল টাইমে ইউজারের ইনপুট পর্যালোচনা করার জন্য এই ইভেন্টের উপর নির্ভর করে।

### selected {#selected}

`selected` attributeটি `<option>` কম্পোনেন্টে সাপোর্ট করে। যেখানে এই কম্পোনেন্টটি selected হয়, সেখানেই আপনি এটি ব্যবহার করতে পারেন। এটি controlled কম্পোনেন্ট তৈরির জন্য খুব উপকারী।

### style {#style}

>বিঃদ্রঃ
>
>এই ডকুমেন্টেশনে কিছু উদাহরণে সুবিধার জন্য `style` ব্যবহার করা হয়েছে, কিন্তু **element এ  style দেওয়ার জন্য প্রাথমিক মাধ্যম হিসেবে `style` attribute ব্যবহার করা সাধারণত সুপারিশ করা হয় না।** বেশিরভাগ ক্ষেত্রে, বাহ্যিক CSS  স্টাইলশিটে সংজ্ঞায়িত classes এর রেফারেন্স হিসেবে [`className`](#classname) ব্যবহার করা উচিত। রেন্ডার টাইমে dynamically-computed  style দেওয়ার জন্য, `style`প্রায়শই React অ্যাপ্লিকেশনগুলিতে ব্যবহৃত হয়। আরও দেখুন [FAQ: Styling এবং CSS](/docs/faq-styling.html).

`style` attributeটি CSS string এর পরিবর্তে camelCased properties যুক্ত জাভাস্ক্রিপ্টের object গ্রহণ করে। এটি জাভাস্ক্রিপ্টের DOM `style` property এর সাথে সামঞ্জস্যপূর্ণ, আরও কার্যকর, এবং XSS এর নিরাপত্তা হোলগুলোকেও প্রতিরোধ করে। উদাহরণস্বরূপঃ

```js
const divStyle = {
  color: 'blue',
  backgroundImage: 'url(' + imgUrl + ')',
};

function HelloWorldComponent() {
  return <div style={divStyle}>Hello World!</div>;
}
```

মনে রাখবেন  style কিন্তু autoprefixed নয়। পুরানো ব্রাউজারগুলোকে সাপোর্ট করার জন্য, আপনাকে সংশ্লিষ্ট  style properties প্রদান করতে হবেঃ

```js
const divStyle = {
  WebkitTransition: 'all', // note the capital 'W' here
  msTransition: 'all' // 'ms' is the only lowercase vendor prefix
};

function ComponentWithTransition() {
  return <div style={divStyle}>This should work cross-browser</div>;
}
```

JS থেকে DOM nodes এর properties ব্যবহার করার মত সামঞ্জস্য রাখার জন্য  style key গুলো সব (e.g. `node.style.backgroundImage`). ভেন্ডরের prefix গুলো [`ms` ব্যতীত](https://www.andismith.com/blogs/2012/02/modernizr-prefixed/) ক্যাপিটাল লেটারে শুরু হওয়া উচিত। এই কারণেই `WebkitTransition` এর একটি uppercase "W" রয়েছে।

নির্দিষ্ট সংখ্যাসূচক কিছু  style properties এর জন্য React আপনাআপনি একটি "px" suffix যোগ করে নেয়।  আপনি যদি "px" এর পরিবর্তে অন্য কোন ইউনিট ব্যবহার করতে চান, তবে string আকারে ভ্যালু এর সাথে কাঙ্ক্ষিত ইউনিটটি যোগ করে দিন। উদাহরণস্বরূপঃ

```js
// Result style: '10px'
<div style={{ height: 10 }}>
  Hello World!
</div>

// Result style: '10%'
<div style={{ height: '10%' }}>
  Hello World!
</div>
```

সব  style properties কিন্তু পিক্সেল string এ পরিবর্তিত হয় না। নির্দিষ্ট কিছু ইউনিটহীন অবস্থায় থাকে। (eg `zoom`, `order`, `flex`). ইউনিটহীন properties এর সম্পূর্ণ লিস্ট [এখানে](https://github.com/facebook/react/blob/4131af3e4bf52f3a003537ec95a1655147c81270/src/renderers/dom/shared/CSSProperty.js#L15-L59) দেখতে পারেন।

### suppressContentEditableWarning {#suppresscontenteditablewarning}

সাধারণত children আছে এমন element যদি `contentEditable` হিসেবে গণ্য হয় তবে একটি warning দেখানো হয়, কারণ এটি কাজ করবে না। এই attributeটি ঐ warning কে দেখানো থেকে বিরত রাখে। এই attributeটি ব্যবহার থেকে বিরত থাকুন, যদি না আপনি [Draft.js](https://facebook.github.io/draft-js/) এর মত কোন লাইব্রেরি তৈরি না করেন যেটি নিজস্ব উপায়ে `contentEditable` ম্যানেজ করে।

### suppressHydrationWarning {#suppresshydrationwarning}

 আপনি যদি সার্ভার-সাইডে React রেন্ডার করেন, তবে সাধারণত সার্ভার এবং ক্লায়েন্টের কন্টেন্টে পার্থক্য থাকলে একটি warning দেখানো হয়। যেহেতু কিছু বিরল ক্ষেত্রে, খাপে খাপ মিল পাওয়া খুবই কঠিন ব্যাপার, এক কথায় অসম্ভব। উদাহরণস্বরূপ, সার্ভার এবং ক্লায়েন্টে timestamps ভিন্ন হতে পারে।

আপনি যদি `suppressHydrationWarning`কে `true` হিসেবে সেট করেন, তবে attributes এবং element এর কন্টেন্টের অমিল নিয়ে React কোন সতর্কবার্তা দেখাবে না। এটি এক ধাপ গভীরে কাজ করে, এবং বেশি সমস্যায় পরলে উত্তরণের জন্য ব্যবহৃত হয়। এটি বেশি ব্যবহার করবেন না।  hydration এর ব্যাপারে আপনি আরও পড়তে পারবেন [`ReactDOM.hydrate()` ডকুমেন্টেশানে](/docs/react-dom.html#hydrate).

### value {#value}

`value` attributeটি `<input>` এবং `<textarea>` কম্পোনেন্টে সাপোর্ট করে।  আপনি এটি কম্পোনেন্টের value সেট করার জন্য ব্যবহার করতে পারেন। এটি controlled কম্পোনেন্ট তৈরির জন্য খুব উপকারী। `defaultValue` এটির uncontrolled রূপ, যেটি কম্পোনেন্টটি প্রথম মাউন্ট হওয়ার সময় সেট হয়।

## All Supported HTML Attributes {#all-supported-html-attributes}

React 16 থেকে, যে কোন স্ট্যান্ডার্ড [অথবা কাস্টম](/blog/2017/09/08/dom-attributes-in-react-16.html) DOM attributes সম্পূর্ণরূপে সাপোর্ট করা হয়।

React সব সময়ই একটি JavaScript-centric API তার DOM কে প্রদান করে। যখন থেকে React কম্পোনেন্ট প্রায়শই কাস্টম এবং DOM-related props নেয়, তখন থেকেই React DOM APIs এর মত `camelCase` কনভেনশান ব্যবহার করেঃ

```js
<div tabIndex="-1" />      // Just like node.tabIndex DOM API
<div className="Button" /> // Just like node.className DOM API
<input readOnly={true} />  // Just like node.readOnly DOM API
```

এই props গুলো  সংশ্লিষ্ট HTML attributes এর মতই কাজ করে, উপরে বর্ণিত বিশেষ কিছু অবস্থা ছাড়া।

যেসব DOM attributes গুলো React সাপোর্ট করেন সেগুলোঃ

```
accept acceptCharset accessKey action allowFullScreen alt async autoComplete
autoFocus autoPlay capture cellPadding cellSpacing challenge charSet checked
cite classID className colSpan cols content contentEditable contextMenu controls
controlsList coords crossOrigin data dateTime default defer dir disabled
download draggable encType form formAction formEncType formMethod formNoValidate
formTarget frameBorder headers height hidden high href hrefLang htmlFor
httpEquiv icon id inputMode integrity is keyParams keyType kind label lang list
loop low manifest marginHeight marginWidth max maxLength media mediaGroup method
min minLength multiple muted name noValidate nonce open optimum pattern
placeholder poster preload profile radioGroup readOnly rel required reversed
role rowSpan rows sandbox scope scoped scrolling seamless selected shape size
sizes span spellCheck src srcDoc srcLang srcSet start step style summary
tabIndex target title type useMap value width wmode wrap
```

একইভাবে, সব SVG attributes সম্পূর্ণরূপে সাপোর্ট করা হয়ঃ

```
accentHeight accumulate additive alignmentBaseline allowReorder alphabetic
amplitude arabicForm ascent attributeName attributeType autoReverse azimuth
baseFrequency baseProfile baselineShift bbox begin bias by calcMode capHeight
clip clipPath clipPathUnits clipRule colorInterpolation
colorInterpolationFilters colorProfile colorRendering contentScriptType
contentStyleType cursor cx cy d decelerate descent diffuseConstant direction
display divisor dominantBaseline dur dx dy edgeMode elevation enableBackground
end exponent externalResourcesRequired fill fillOpacity fillRule filter
filterRes filterUnits floodColor floodOpacity focusable fontFamily fontSize
fontSizeAdjust fontStretch fontStyle fontVariant fontWeight format from fx fy
g1 g2 glyphName glyphOrientationHorizontal glyphOrientationVertical glyphRef
gradientTransform gradientUnits hanging horizAdvX horizOriginX ideographic
imageRendering in in2 intercept k k1 k2 k3 k4 kernelMatrix kernelUnitLength
kerning keyPoints keySplines keyTimes lengthAdjust letterSpacing lightingColor
limitingConeAngle local markerEnd markerHeight markerMid markerStart
markerUnits markerWidth mask maskContentUnits maskUnits mathematical mode
numOctaves offset opacity operator order orient orientation origin overflow
overlinePosition overlineThickness paintOrder panose1 pathLength
patternContentUnits patternTransform patternUnits pointerEvents points
pointsAtX pointsAtY pointsAtZ preserveAlpha preserveAspectRatio primitiveUnits
r radius refX refY renderingIntent repeatCount repeatDur requiredExtensions
requiredFeatures restart result rotate rx ry scale seed shapeRendering slope
spacing specularConstant specularExponent speed spreadMethod startOffset
stdDeviation stemh stemv stitchTiles stopColor stopOpacity
strikethroughPosition strikethroughThickness string stroke strokeDasharray
strokeDashoffset strokeLinecap strokeLinejoin strokeMiterlimit strokeOpacity
strokeWidth surfaceScale systemLanguage tableValues targetX targetY textAnchor
textDecoration textLength textRendering to transform u1 u2 underlinePosition
underlineThickness unicode unicodeBidi unicodeRange unitsPerEm vAlphabetic
vHanging vIdeographic vMathematical values vectorEffect version vertAdvY
vertOriginX vertOriginY viewBox viewTarget visibility widths wordSpacing
writingMode x x1 x2 xChannelSelector xHeight xlinkActuate xlinkArcrole
xlinkHref xlinkRole xlinkShow xlinkTitle xlinkType xmlns xmlnsXlink xmlBase
xmlLang xmlSpace y y1 y2 yChannelSelector z zoomAndPan
```

আপনি হয়ত কিছু কাস্টম  attributes ব্যবহার করতে পারেন যদি তারা সম্পূর্ণরূপে lowercase হয়।
