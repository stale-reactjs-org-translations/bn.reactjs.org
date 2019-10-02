---
id: events
title: সিনথেটিক ইভেন্ট
permalink: docs/events.html
layout: docs
category: Reference
---

এই রেফারেন্স গাইডটি `SyntheticEvent` wrapperকে ডকুমেন্ট করে যেটি React এর ইভেন্ট সিস্টেমের একটি অংশ গঠন করে। বিস্তারিত জানতে [হ্যান্ডেলিং ইভেন্টস](/docs/handling-events.html) গাইডটি দেখুন।

## সারমর্ম {#overview}

আপনার ইভেন্ট হ্যান্ডেলারগুলো `SyntheticEvent`এর ইন্সটেন্স পাস করবে, যা আসলে ব্রাউজারের নেটিভ ইভেন্টের উপর ক্রস-ব্রাউজারের একটি wrapper। ব্রাউজারের নেটিভ ইভেন্টের মত এর একই রকম ইন্টারফেস রয়েছে, , `stopPropagation()` এবং `preventDefault()`ও এর অন্তর্ভুক্ত, তবে ইভেন্টগুলো সব ব্রাউজারে একইভাবে কাজ করে।

আপনি যদি দেখেন কোন কারণে ব্রাউজারের নিজস্ব ইভেন্ট আপনার দরকার, তবে `nativeEvent` attribute ব্যবহার করুন। প্রতিটি `SyntheticEvent` অবজেক্টের নিম্নোক্ত attributes রয়েছেঃ

```javascript
boolean bubbles
boolean cancelable
DOMEventTarget currentTarget
boolean defaultPrevented
number eventPhase
boolean isTrusted
DOMEvent nativeEvent
void preventDefault()
boolean isDefaultPrevented()
void stopPropagation()
boolean isPropagationStopped()
DOMEventTarget target
number timeStamp
string type
```

> বিঃদ্রঃ
>
> v0.14 হতে, কোন ইভেন্ট হ্যান্ডেলার থেকে `false` রিটার্ন করলে সেটি আর ইভেন্ট প্রপাগেশান বন্ধ করবে না। বরং , `e.stopPropagation()` অথবা `e.preventDefault()`কে ম্যনুয়্যালি ট্রিগার করাই সঠিক বলে বিবেচিত।

### ইভেন্ট পুলিং {#event-pooling}

`SyntheticEvent` পুল করা হয়েছে। এর মানে হল `SyntheticEvent` অবজেক্টটি পুনরায় ব্যবহার করা হয় এবং ইভেন্ট কলব্যাক শুরু হওয়ার পরে তার সকল প্রপার্টিসকে নালিফাইড করা হয়।
পারফরমেন্সের কথা চিন্তা করে এটি করা হয়।
যেমন, asynchronous উপায়ে আপনি কোন ইভেন্ট ব্যবহার করতে পারবেন না।

```javascript
function onClick(event) {
  console.log(event); // => nullified object.
  console.log(event.type); // => "click"
  const eventType = event.type; // => "click"

  setTimeout(function() {
    console.log(event.type); // => null
    console.log(eventType); // => "click"
  }, 0);

  // Won't work. this.state.clickEvent will only contain null values.
  this.setState({clickEvent: event});

  // You can still export event properties.
  this.setState({eventType: event.type});
}
```

> বিঃদ্রঃ
>
> আপনি যদি asynchronous উপায়ে কোন ইভেন্ট ব্যবহার করতে চান, তবে আপনার `event.persist()` কে কল করা উচিত। যেটি পুল থেকে সিনথেটিক ইভেন্টকে মুছে দিবে এবং ইভেন্টের রেফারেন্সগুলি ইউজারের কোডে বজায় রাখার অনুমতি দিবে।

## সাপোর্টেড ইভেন্টস {#supported-events}

React ইভেন্টগুলোকে নরমালাইজড করে যাতে তাদের প্রপার্টিসগুলো বিভিন্ন ব্রাউজার জুড়ে ধারাবাহিক থাকে।

নিচের ইভেন্ট হ্যান্ডেলারগুলো বাব্লিং দশায়, কোন একটি ইভেন্ট দ্বারা ট্রিগার করা হয়। ক্যাপচার দশার জন্য কোন ইভেন্ট হ্যান্ডেলারকে রেজিস্টার করার জন্য, ইভেন্টের নামের শেষে `Capture` যোগ করুন;  উদাহরণস্বরূপ, ক্যাপচার দশায় ক্লিক ইভেন্টকে হ্যান্ডেল করার জন্য আপনি `onClick` এর পরিবর্তে `onClickCapture` ব্যবহার করতে পারেন।

- [ক্লিপবোর্ড ইভেন্টস](#clipboard-events)
- [কম্পোজিশন ইভেন্টস](#composition-events)
- [কিবোর্ড ইভেন্টস](#keyboard-events)
- [ফোকাস ইভেন্টস](#focus-events)
- [ফর্ম ইভেন্টস](#form-events)
- [মাউস ইভেন্টস](#mouse-events)
- [পয়েন্টার ইভেন্টস](#pointer-events)
- [সিলেকশান ইভেন্টস](#selection-events)
- [টাচ ইভেন্টস](#touch-events)
- [UI ইভেন্টস](#ui-events)
- [হুইল ইভেন্টস](#wheel-events)
- [মিডিয়া ইভেন্টস](#media-events)
- [ইমেজ ইভেন্টস](#image-events)
- [এনিমেশন ইভেন্টস](#animation-events)
- [ট্রানজিশান ইভেন্টস](#transition-events)
- [অন্যান্য ইভেন্টস](#other-events)

* * *

## রেফারেন্স {#reference}

### ক্লিপবোর্ড ইভেন্টস {#clipboard-events}

ইভেন্টগুলোর নামঃ

```
onCopy onCut onPaste
```

প্রপার্টিসঃ

```javascript
DOMDataTransfer clipboardData
```

* * *

### কম্পোজিশন ইভেন্টস {#composition-events}

ইভেন্টগুলোর নামঃ

```
onCompositionEnd onCompositionStart onCompositionUpdate
```

প্রপার্টিসঃ

```javascript
string data

```

* * *

### কিবোর্ড ইভেন্টস {#keyboard-events}

ইভেন্টগুলোর নামঃ

```
onKeyDown onKeyPress onKeyUp
```

প্রপার্টিসঃ

```javascript
boolean altKey
number charCode
boolean ctrlKey
boolean getModifierState(key)
string key
number keyCode
string locale
number location
boolean metaKey
boolean repeat
boolean shiftKey
number which
```

`key` প্রপার্টি [DOM Level 3 Events spec](https://www.w3.org/TR/uievents-key/#named-key-attribute-values)এ ডকুমেন্ট করা যে কোন ভ্যালু নিতে পারে।

* * *

### ফোকাস ইভেন্টস {#focus-events}

ইভেন্টগুলোর নামঃ

```
onFocus onBlur
```

এই ফোকাস ইভেন্টগুলো শুধু form elements না, বরং React DOM এর সব elements এ কাজ করে।

প্রপার্টিসঃ

```javascript
DOMEventTarget relatedTarget
```

* * *

### ফর্ম ইভেন্টস {#form-events}

ইভেন্টগুলোর নামঃ

```
onChange onInput onInvalid onSubmit
```

onChange ইভেন্ট সম্পর্কে বিস্তারিত জানতে, [Forms](/docs/forms.html) দেখুন।

* * *

### মাউস ইভেন্টস {#mouse-events}

ইভেন্টগুলোর নামঃ

```
onClick onContextMenu onDoubleClick onDrag onDragEnd onDragEnter onDragExit
onDragLeave onDragOver onDragStart onDrop onMouseDown onMouseEnter onMouseLeave
onMouseMove onMouseOut onMouseOver onMouseUp
```

`onMouseEnter` এবং `onMouseLeave` ইভেন্টগুলো সাধারণ বাব্লিং এর পরিবর্তে, element টি যেখানে ছেড়ে চলে যায় ঐস্থান থেকে, যেখানে প্রবেশ করে ঐস্থান পর্যন্ত প্রপাগেট করে এবং তাদের কোন ক্যাপচার দশা নেই।

প্রপার্টিসঃ

```javascript
boolean altKey
number button
number buttons
number clientX
number clientY
boolean ctrlKey
boolean getModifierState(key)
boolean metaKey
number pageX
number pageY
DOMEventTarget relatedTarget
number screenX
number screenY
boolean shiftKey
```

* * *

### পয়েন্টার ইভেন্টস {#pointer-events}

ইভেন্টগুলোর নামঃ

```
onPointerDown onPointerMove onPointerUp onPointerCancel onGotPointerCapture
onLostPointerCapture onPointerEnter onPointerLeave onPointerOver onPointerOut
```

`onPointerEnter` এবং `onPointerLeave` ইভেন্টগুলো সাধারণ বাব্লিং এর পরিবর্তে, element টি যেখানে ছেড়ে চলে যায় ঐস্থান থেকে, যেখানে প্রবেশ করে ঐস্থান পর্যন্ত প্রপাগেট করে এবং তাদের কোন ক্যাপচার দশা নেই।

প্রপার্টিসঃ

[W3 spec](https://www.w3.org/TR/pointerevents/) এর সংজ্ঞানুযায়ী, পয়েন্ট ইভেন্টগুলো [মাউস ইভেন্টস](#mouse-events) এর নিম্নোক্ত প্রপার্টিসকে এক্সটেন্ড করে।

```javascript
number pointerId
number width
number height
number pressure
number tangentialPressure
number tiltX
number tiltY
number twist
string pointerType
boolean isPrimary
```

ক্রস ব্রাউজার সাপোর্ট নিয়ে কিছু কথাঃ

পয়েন্টার ইভেন্টগুলো এখনো সব ব্রাউজার সাপোর্ট করে না। (এই নিবন্ধটি লেখার সময়, সাপোর্টেড ব্রাউজারগুলো হলঃ Chrome, Firefox, Edge, and Internet Explorer). React ইচ্ছাকৃতভাবে ব্রাউজারগুলোর জন্য পলিফিল সাপোর্ট দেয় না  কারণ একটি মানসম্মত পলিফিল `react-dom` এর বান্ডেল সাইজ উল্লেখযোগ্যভাবে বাড়িয়ে দিবে।

যদি আপনার অ্যাপ্লিকেশনটির পয়েন্টার ইভেন্টগুলোর প্রয়োজন হয় তবে আমরা একটি তৃতীয় পক্ষের পয়েন্টার ইভেন্ট পলিফিল যুক্ত করার পরামর্শ দিই।

* * *

### সিলেকশান ইভেন্টস {#selection-events}

ইভেন্টগুলোর নামঃ

```
onSelect
```

* * *

### টাচ ইভেন্টস {#touch-events}

ইভেন্টগুলোর নামঃ

```
onTouchCancel onTouchEnd onTouchMove onTouchStart
```

প্রপার্টিসঃ

```javascript
boolean altKey
DOMTouchList changedTouches
boolean ctrlKey
boolean getModifierState(key)
boolean metaKey
boolean shiftKey
DOMTouchList targetTouches
DOMTouchList touches
```

* * *

### UI ইভেন্টস {#ui-events}

ইভেন্টগুলোর নামঃ

```
onScroll
```

প্রপার্টিসঃ

```javascript
number detail
DOMAbstractView view
```

* * *

### হুইল ইভেন্টস {#wheel-events}

ইভেন্টগুলোর নামঃ

```
onWheel
```

প্রপার্টিসঃ

```javascript
number deltaMode
number deltaX
number deltaY
number deltaZ
```

* * *

### মিডিয়া ইভেন্টস {#media-events}

ইভেন্টগুলোর নামঃ

```
onAbort onCanPlay onCanPlayThrough onDurationChange onEmptied onEncrypted
onEnded onError onLoadedData onLoadedMetadata onLoadStart onPause onPlay
onPlaying onProgress onRateChange onSeeked onSeeking onStalled onSuspend
onTimeUpdate onVolumeChange onWaiting
```

* * *

### ইমেজ ইভেন্টস {#image-events}

ইভেন্টগুলোর নামঃ

```
onLoad onError
```

* * *

### এনিমেশন ইভেন্টস {#animation-events}

ইভেন্টগুলোর নামঃ

```
onAnimationStart onAnimationEnd onAnimationIteration
```

প্রপার্টিসঃ

```javascript
string animationName
string pseudoElement
float elapsedTime
```

* * *

### ট্রানজিশান ইভেন্টস {#transition-events}

ইভেন্টগুলোর নামঃ

```
onTransitionEnd
```

প্রপার্টিসঃ

```javascript
string propertyName
string pseudoElement
float elapsedTime
```

* * *

### অন্যান্য ইভেন্টস {#other-events}

ইভেন্টগুলোর নামঃ

```
onToggle
```
