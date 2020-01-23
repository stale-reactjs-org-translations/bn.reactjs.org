---
id: uncontrolled-components
title: Uncontrolled Components
permalink: docs/uncontrolled-components.html
---

বেশিরভাগ ক্ষেত্রেই, Form প্রস্তুতের জন্য আমরা রিকমেন্ড করি [controlled components](/docs/forms.html#controlled-components) । একটা controlled component এ, form data হ্যান্ডল করা হয় React component এর মাধ্যমে। এর alternative হচ্ছে uncontrolled components, যেখানে DOM নিজে form data হ্যান্ডল করে।

একটি uncontrolled component লিখতে, প্রতি state update এ event handler লেখার পরিবর্তে আপনি   [use ref](/docs/refs-and-the-dom.html) DOM থেকে ভ্যালু পাওয়ার জন্য।

উদাহারণ হিসেবে, এই কোডটি একটি uncontrolled component এ একটি single name নেয়:

```javascript{5,9,18}
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.input = React.createRef();
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.input.current.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" ref={this.input} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

[**CodePen এ লিখে দেখুন**](https://codepen.io/gaearon/pen/WooRWa?editors=0010)

যেহেতু একটি uncontrolled component, DOM এর ভিতর সত্যের উৎস ধরে রাখে তাই React এবং non-React কোড ইন্টিগ্র্যাট করার সময় প্রায়শই এটা সহজতর হয়। একটু কম কোডেও কাজ হয় যদি আপনি দ্রুত এবং একটু অগোছালো কোড চান , তানাহলে controlled components ব্যাবহার করাই শ্রেয়।

যদি এটা এখনো পরিষ্কার না হয় যে কোন পরিস্থিতে কি ধরনের component ব্যাবহার করা উচিত তাহলে আপনি [this article on controlled versus uncontrolled inputs](https://goshakkk.name/controlled-vs-uncontrolled-inputs-react/) এতে ঘুরে আসতে পারেন।

### ডিফল্ট মান {#default-values}

React রেন্ডারিং লাইফসাইকেল এ, ফরম element এ `value` এট্রিবিউট্টি DOM এর ভ্যালুকে ওভাররাইড করে। একটি uncontrolled component এর দ্বারা, আপনি প্রায়শই চান যাতে React ইনিশিয়াল ভ্যালুটি নির্দিষ্ট করে, তবে পরবর্তী আপডেটগুলি যাতে uncontrolled রাখে। এই ব্যাপারটি সামলানোর জন্য আপনি একটি `defaultVaTue` নিরদিষ্ট করে দিতে পারেন `value` এর পরিবর্তে।

```javascript{7}
render() {
  return (
    <form onSubmit={this.handleSubmit}>
      <label>
        Name:
        <input
          defaultValue="Bob"
          type="text"
          ref={this.input} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}
```

একইভাবে `<input type="checkbox">` এবং `<input type="radio">` সাপোরট করে`defaultChecked`, এবং `<select>` এবং `<textarea>` সাপোরট করে `defaultValue`.

## ফাই্ল ইনপুট ট্যাগ {#the-file-input-tag}

HTML এ, একটি `<input type="file">` ব্যবহারকারীকে তাদের ডিভাইস স্টোরেজ থেকে এক বা একাধিক ফাইল কোনও সার্ভারে আপলোড করতে বা জাভাস্ক্রিপ্ট দ্বারা ম্যানিপুলেটেড করতে  বেছে নিতে দেয় [File API](https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications) এর মাধ্যমে।

```html
<input type="file" />
```

React এ, একটি `<input type="file" />` সবসময় uncontrolled component কারণ প্রোগ্র্যাম্যাটিক্যালি নয় বরং একজন ইউজারই পারে এর ভ্যালু সেট করতে।

আপনি ফাইলসমূহ নিয়ে কাজ করতে চাইলে File API ব্যাবহার করতে পারেন। নিচের উদাহারণটি দেখাবে কিভাবে [ref to the DOM node](/docs/refs-and-the-dom.html) প্রস্তুত করতে হয় সাবমিট হ্যান্ডলারের ফাইলসমূহ এক্সেস করার জন্য:

`embed:uncontrolled-components/input-type-file.js`

[](codepen://uncontrolled-components/input-type-file)

