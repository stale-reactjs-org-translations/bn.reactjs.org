---
id: lifting-state-up
title: State উপরে তোলা
permalink: docs/lifting-state-up.html
prev: forms.html
next: composition-vs-inheritance.html
redirect_from:
  - "docs/flux-overview.html"
  - "docs/flux-todo-list.html"
---

অনেক সময়, একই ডাটা পরিবর্তন বিভিন্ন কম্পোনেন্টে একসাথে প্রতিফলিত করতে হয়। আমরা এক্ষেত্রে কম্পোনেন্টগুলোর shared state কে তাদের নিকটতম ancestor এ তুলে আনার পরামর্শ দেই। চলুন আমরা দেখি কিভাবে এটি কাজ করে।

এই অনুচ্ছেদে, আমরা একটি তাপমাত্রা পরিমাপক ক্যালকুলেটর তৈরি করব যা হিসাব করবে আদৌ কোন প্রদত্ত তাপমাত্রায় পানি ফুটতে শুরু করবে কিনা।

আমরা `BoilingVerdict` নামের একটি কম্পোনেন্টের মাধ্যমে শুরু করব। এটি `celsius` তাপমাত্রা কে একটি prop হিসেবে গ্রহণ করে এবং প্রিন্ট করে আদৌ ঐ তাপমাত্রা পানি ফুটানোর জন্য যথেষ্ট কিনাঃ

```js{3,5}
function BoilingVerdict(props) {
  if (props.celsius >= 100) {
    return <p>The water would boil.</p>;
  }
  return <p>The water would not boil.</p>;
}
```

এরপর, আমরা `Calculator` নামের একটি কম্পোনেন্ট তৈরি করব। এটি একটি `<input>` রেন্ডার করে যা আপনাকে তাপমাত্রা ইনপুট করার সুযোগ করে দেয় এবং ঐ মান `this.state.temperature` এ সংরক্ষণ করে।

এছাড়াও, এটি বর্তমান ইনপুট এর মানের জন্য `BoilingVerdict` রেন্ডার করে।

```js{5,9,13,17-21}
class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {temperature: ''};
  }

  handleChange(e) {
    this.setState({temperature: e.target.value});
  }

  render() {
    const temperature = this.state.temperature;
    return (
      <fieldset>
        <legend>Enter temperature in Celsius:</legend>
        <input
          value={temperature}
          onChange={this.handleChange} />
        <BoilingVerdict
          celsius={parseFloat(temperature)} />
      </fieldset>
    );
  }
}
```

[**CodePen এ চালিয়ে দেখুন**](https://codepen.io/gaearon/pen/ZXeOBm?editors=0010)

## দ্বিতীয় একটি ইনপুট যুক্ত করা {#adding-a-second-input}

আমাদের নতুন প্রয়োজনীয়তা হল, আমরা সেলসিয়াস ইনপুটের পাশাপাশি ফারেনহাইট ইনপুট ও সরবরাহ করব এবং তারা একে অপরের মানের সাথে মিলিয়ে চলবে।

আমরা `Calculator` কম্পোনেন্ট থেকে একটি `TemperatureInput` কম্পোনেন্ট বের করে আনার মাধ্যমে শুরু করতে পারি। আমরা এর সাথে নতুন একটি `scale` prop সংযুক্ত করব যার মান `"c"` অথবা `"f"` হবেঃ

```js{1-4,19,22}
const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
};

class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {temperature: ''};
  }

  handleChange(e) {
    this.setState({temperature: e.target.value});
  }

  render() {
    const temperature = this.state.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input value={temperature}
               onChange={this.handleChange} />
      </fieldset>
    );
  }
}
```

আমরা এখন `Calculator` কে পরিবর্তন করতে পারি যাতে তা দু'টি ভিন্ন তাপমাত্রার ইনপুট রেন্ডার করেঃ

```js{5,6}
class Calculator extends React.Component {
  render() {
    return (
      <div>
        <TemperatureInput scale="c" />
        <TemperatureInput scale="f" />
      </div>
    );
  }
}
```

[**CodePen এ চালিয়ে দেখুন**](https://codepen.io/gaearon/pen/jGBryx?editors=0010)

আমাদের এখন দুইটি ইনপুট রয়েছে, কিন্তু যখন আপনি এদের যেকোন একটিতে তাপমাত্রা প্রবেশ করাবেন, অন্যটিতে কোন আপডেট হবেনা। এটি আমাদের প্রয়োজনীয়তার বিপরীতঃ আমরা এদেরকে একইসাথে আপডেট করতে চাই।

এছাড়াও আমরা `Calculator` থেকে `BoilingVerdict` দেখাতে পারবনা। `Calculator` জানেনা বর্তমান তাপমাত্রা কত কারণ এটি `TemperatureInput` এর ভেতর লুকানো রয়েছে।

## পরিবর্তনের ফাংশন লিখা {#writing-conversion-functions}

প্রথমত, আমরা দুইটি ফাংশন লিখব যা সেলসিয়াস কে ফারেনহাইটে এবং ফারেনহাইটকে পুনরায় সেলসিয়াসে রূপান্তর করতে পারেঃ

```js
function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}
```

এই দুইটি ফাংশন numbers কনভার্ট করে। আমরা আরও একটি ফাংশন লিখব যা একটি string `temperature` এবং একটি converter function কে আর্গুমেন্ট হিসেবে নেবে এবং একটি string রিটার্ন করবে। আমরা এর মাধ্যমে একটি ইনপুটের মান থেকে অন্য ইনপুটের মান নির্ণয় করব।

এটি ভুল `temperature` এর জন্য একটি খালি string রিটার্ন করবে, এবং এটি তিন দশমিক স্থান পর্যন্ত আউটপুটের মান নিখুঁতভাবে রাখবেঃ

```js
function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}
```

উদাহরণস্বরূপ, `tryConvert('abc', toCelsius)` একটি খালি string রিটার্ন করে, এবং `tryConvert('10.22', toFahrenheit)` রিটার্ন করে `'50.396'`।

## State উপরে তোলা {#lifting-state-up}

বর্তমানের, উভয় `TemperatureInput` কম্পোনেন্টই স্বাধীনভাবে তাদের মান local state এ সংরক্ষণ করেঃe:

```js{5,9,13}
class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {temperature: ''};
  }

  handleChange(e) {
    this.setState({temperature: e.target.value});
  }

  render() {
    const temperature = this.state.temperature;
    // ...  
```

যাহোক, আমরা চাই এই দুইটি ইনপুট যাতে একে অপরের সাথে সামঞ্জস্যপূর্ণ হয়। যখনই আমরা সেলসিয়াস ইনপুট আপডেট করব, তখনই ফারেনহাইট ইনপুটও রূপান্তরিত তাপমাত্রা প্রতিফলিত করবে, এবং এর উল্টোটাও হবে।

React-এ, যেই কম্পোনেন্টগুলোর state শেয়ার করার দরকার হয় তাদের নিকটতম পূর্বপুরুষ কম্পোনেন্টে ঐ state কে তুলে এনে state শেয়ার করা হয়। একে বলা হয় "state উপরে তোলা"। আমরা `TemperatureInput` থেকে এর লোকাল state টি মুছে ফেলব এবং একে `Calculator` কম্পোনেন্টে নিয়ে যাব।

যদি `Calculator` এই শেয়ারকৃত state নিয়ন্ত্রণ করে, এটি তখন উভয় ইনপুটেই বর্তমান তাপমাত্রার জন্য "সত্যের উৎস" হয়ে ওঠে। এটি তখন এদের নির্দেশ দিতে পারে যাতে উভয়ের মান একে অপরের সাথে সামঞ্জস্যপূর্ণ হয়। যেহেতু, উভয় `TemperatureInput` এর props গুলোই তাদের একই parent `Calculator` কম্পোনেন্ট থেকে আসছে, সেহেতু উভয় ইনপুটই সবসময় একে অপরের সাথে সামঞ্জস্যপূর্ণ থাকবে।

চলুন, ধাপে ধাপে দেখি এটি কিভাবে কাজ করে।

প্রথমত, আমরা `TemperatureInput` কম্পোনেন্টের `this.state.temperature` কে `this.props.temperature` দ্বারা প্রতিস্থাপিত করব। এখনের জন্য, ধরে নিই `this.props.temperature` বিদ্যমান, যদিও ভবিষ্যতে আমাদেরকে এটি `Calculator` থেকে পাস করতে হবেঃ

```js{3}
  render() {
    // Before: const temperature = this.state.temperature;
    const temperature = this.props.temperature;
    // ...
```

আমরা জানি, [prop হল read-only](/docs/components-and-props.html#props-are-read-only)। যখন `temperature` লোকাল state-এ ছিল, তখন `TemperatureInput` `this.setState()` কল করেই এটি পরিবর্তন করতে পারত। যাহোক, এখন যেহেতু `temperature` parent থেকে একটি prop হিসেবে আসছে, সেহেতু `TemperatureInput`-এর `temperature`-এর উপর কোন নিয়ন্ত্রণ নেই।

React-এ, সাধারণ একটি কম্পোনেন্টকে "controlled" এ রূপান্তরিত করে এটি সমাধান করা হয়। ঠিক যেমন `<input>` একটি `value` এবং `onChange` prop উভয়ই গ্রহণ করে, তেমন করেই `Calculator` parent থেকে কাস্টম `TemperatureInput` একটি `temperature` এবং `onTemperatureChange` prop উভয়ই গ্রহণ করবে।

এখন, যখন `TemperatureInput` এর তাপমাত্রা আপডেট করতে চাইবে, তখন এটি `this.props.onTemperatureChange` কল করবেঃ

```js{3}
  handleChange(e) {
    // Before: this.setState({temperature: e.target.value});
    this.props.onTemperatureChange(e.target.value);
    // ...
```

>বিঃদ্রঃ
>
>কাস্টম কম্পোনেন্টে `temperature` অথবা `onTemperatureChange` prop এর নামগুলোর বিশেষ কোন অর্থ নেই। আমরা চাইলে এদেরকে অন্য যেকোন কিছুও নাম দিতে পারতাম, যেমনঃ `value` এবং `onChange` নাম দিতে পারতাম যা একটি সাধারণ প্রচলন।

The `onTemperatureChange` prop will be provided together with the `temperature` prop by the parent `Calculator` component. It will handle the change by modifying its own local state, thus re-rendering both inputs with the new values. We will look at the new `Calculator` implementation very soon.

Before diving into the changes in the `Calculator`, let's recap our changes to the `TemperatureInput` component. We have removed the local state from it, and instead of reading `this.state.temperature`, we now read `this.props.temperature`. Instead of calling `this.setState()` when we want to make a change, we now call `this.props.onTemperatureChange()`, which will be provided by the `Calculator`:

```js{8,12}
class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onTemperatureChange(e.target.value);
  }

  render() {
    const temperature = this.props.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input value={temperature}
               onChange={this.handleChange} />
      </fieldset>
    );
  }
}
```

Now let's turn to the `Calculator` component.

We will store the current input's `temperature` and `scale` in its local state. This is the state we "lifted up" from the inputs, and it will serve as the "source of truth" for both of them. It is the minimal representation of all the data we need to know in order to render both inputs.

For example, if we enter 37 into the Celsius input, the state of the `Calculator` component will be:

```js
{
  temperature: '37',
  scale: 'c'
}
```

If we later edit the Fahrenheit field to be 212, the state of the `Calculator` will be:

```js
{
  temperature: '212',
  scale: 'f'
}
```

We could have stored the value of both inputs but it turns out to be unnecessary. It is enough to store the value of the most recently changed input, and the scale that it represents. We can then infer the value of the other input based on the current `temperature` and `scale` alone.

The inputs stay in sync because their values are computed from the same state:

```js{6,10,14,18-21,27-28,31-32,34}
class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
    this.state = {temperature: '', scale: 'c'};
  }

  handleCelsiusChange(temperature) {
    this.setState({scale: 'c', temperature});
  }

  handleFahrenheitChange(temperature) {
    this.setState({scale: 'f', temperature});
  }

  render() {
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

    return (
      <div>
        <TemperatureInput
          scale="c"
          temperature={celsius}
          onTemperatureChange={this.handleCelsiusChange} />
        <TemperatureInput
          scale="f"
          temperature={fahrenheit}
          onTemperatureChange={this.handleFahrenheitChange} />
        <BoilingVerdict
          celsius={parseFloat(celsius)} />
      </div>
    );
  }
}
```

[**Try it on CodePen**](https://codepen.io/gaearon/pen/WZpxpz?editors=0010)

Now, no matter which input you edit, `this.state.temperature` and `this.state.scale` in the `Calculator` get updated. One of the inputs gets the value as is, so any user input is preserved, and the other input value is always recalculated based on it.

Let's recap what happens when you edit an input:

* React calls the function specified as `onChange` on the DOM `<input>`. In our case, this is the `handleChange` method in the `TemperatureInput` component.
* The `handleChange` method in the `TemperatureInput` component calls `this.props.onTemperatureChange()` with the new desired value. Its props, including `onTemperatureChange`, were provided by its parent component, the `Calculator`.
* When it previously rendered, the `Calculator` has specified that `onTemperatureChange` of the Celsius `TemperatureInput` is the `Calculator`'s `handleCelsiusChange` method, and `onTemperatureChange` of the Fahrenheit `TemperatureInput` is the `Calculator`'s `handleFahrenheitChange` method. So either of these two `Calculator` methods gets called depending on which input we edited.
* Inside these methods, the `Calculator` component asks React to re-render itself by calling `this.setState()` with the new input value and the current scale of the input we just edited.
* React calls the `Calculator` component's `render` method to learn what the UI should look like. The values of both inputs are recomputed based on the current temperature and the active scale. The temperature conversion is performed here.
* React calls the `render` methods of the individual `TemperatureInput` components with their new props specified by the `Calculator`. It learns what their UI should look like.
* React calls the `render` method of the `BoilingVerdict` component, passing the temperature in Celsius as its props.
* React DOM updates the DOM with the boiling verdict and to match the desired input values. The input we just edited receives its current value, and the other input is updated to the temperature after conversion.

Every update goes through the same steps so the inputs stay in sync.

## Lessons Learned {#lessons-learned}

There should be a single "source of truth" for any data that changes in a React application. Usually, the state is first added to the component that needs it for rendering. Then, if other components also need it, you can lift it up to their closest common ancestor. Instead of trying to sync the state between different components, you should rely on the [top-down data flow](/docs/state-and-lifecycle.html#the-data-flows-down).

Lifting state involves writing more "boilerplate" code than two-way binding approaches, but as a benefit, it takes less work to find and isolate bugs. Since any state "lives" in some component and that component alone can change it, the surface area for bugs is greatly reduced. Additionally, you can implement any custom logic to reject or transform user input.

If something can be derived from either props or state, it probably shouldn't be in the state. For example, instead of storing both `celsiusValue` and `fahrenheitValue`, we store just the last edited `temperature` and its `scale`. The value of the other input can always be calculated from them in the `render()` method. This lets us clear or apply rounding to the other field without losing any precision in the user input.

When you see something wrong in the UI, you can use [React Developer Tools](https://github.com/facebook/react-devtools) to inspect the props and move up the tree until you find the component responsible for updating the state. This lets you trace the bugs to their source:

<img src="../images/docs/react-devtools-state.gif" alt="Monitoring State in React DevTools" max-width="100%" height="100%">
