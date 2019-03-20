---
id: conditional-rendering
title: Conditional Rendering
permalink: docs/conditional-rendering.html
prev: handling-events.html
next: lists-and-keys.html
redirect_from:
  - "tips/false-in-jsx.html"
---

React এ আপনি একটি পৃথক গঠন তৈরি করতে পারেন যা আপনার ব্যাবহারের চাহিদাকে ঘিরে গড়ে উঠবে।
তারপরে, আপনি আপনার অ্যাপ্লিকেশনের অবস্থার উপর নির্ভর করে কেবল তাদের মধ্যে কয়েকটি রেন্ডার করতে পারেন। 

Conditional rendering, React ও JavaScript এ একি শর্ত মেনে কাজ করে.  
['if`] অথবা [conditional operator] এর মত JavaScript অপারেটরগুলি ব্যবহার করুন,(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else) (https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Conditional_Operator)
বর্তমান অবস্থা প্রতিনিধিত্বকারী উপাদানগুলি তৈরি করতে, এবং React কে তাদের সাথে মিলিয়ে UI আপডেট করতে দিন।

এই দুটি উপাদান বিবেচনা করুন:

```js
function UserGreeting(props) {
  return <h1>Welcome back!</h1>;
}

function GuestGreeting(props) {
  return <h1>Please sign up.</h1>;
}
```


আমরা একটি 'Greeting' গঠন তৈরি করব যা প্রদর্শন করবে এগুলোর মধ্যে একটি উপাদান , যা নির্ভর করবে একজন ব্যবহারকারীর লগ ইন করেছে কিনা তার উপরঃ

```javascript{3-7,11,12}
function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}

ReactDOM.render(
  // Try changing to isLoggedIn={true}:
  <Greeting isLoggedIn={false} />,
  document.getElementById('root')
);
```

[**Try it on CodePen**](https://codepen.io/gaearon/pen/ZpVxNq?editors=0011)

এই উদাহরণগুলো কার্যকর করবে নানারকম greeting যা নির্ভর করবে `isLoggedIn` prop এর মানের উপর।

### Element Variables {#element-variables}


আপনি উপাদান সংরক্ষণ করতে variable ব্যবহার করতে পারেন। এটি আপনাকে উপাদানটির অংশটি শর্তাধীনভাবে রেন্ডার করতে সহায়তা করতে পারে যদিও বাকি আউটপুট পরিবর্তন হয় না। 

এই দুটি নতুন উপাদান বিবেচনা করুন যাকিনা Logout এবং Login বোতামের ভূমিকা পালন করবেঃ


```js
function LoginButton(props) {
  return (
    <button onClick={props.onClick}>
      Login
    </button>
  );
}

function LogoutButton(props) {
  return (
    <button onClick={props.onClick}>
      Logout
    </button>
  );
}
```


নিচের উদাহরণে, আমরা তৈরি করব একটি [stateful component](/docs/state-and-lifecycle.html#adding-local-state-to-a-class) যার নাম `LoginControl`.

এটি বর্তমান অবস্থার উপর নির্ভর করে `<LoginButton />` বা `<LogoutButton /> 'সরবরাহ করবে। এটা পূর্ববর্তী উদাহরণের `<Greeting />`কেও কার্যকর করবেঃ

```javascript{20-25,29,30}
class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = {isLoggedIn: false};
  }

  handleLoginClick() {
    this.setState({isLoggedIn: true});
  }

  handleLogoutClick() {
    this.setState({isLoggedIn: false});
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    let button;

    if (isLoggedIn) {
      button = <LogoutButton onClick={this.handleLogoutClick} />;
    } else {
      button = <LoginButton onClick={this.handleLoginClick} />;
    }

    return (
      <div>
        <Greeting isLoggedIn={isLoggedIn} />
        {button}
      </div>
    );
  }
}

ReactDOM.render(
  <LoginControl />,
  document.getElementById('root')
);
```

[** CodePen এ পরীক্ষা করুন **](https://codepen.io/gaearon/pen/QKzAgB?editors=0010)


একটি variable ঘোষণা করে এবং একটি 'if' বিবৃতি ব্যবহার করে উপাদানটিকে  conditionally render করার একটি দুর্দান্ত উপায় মাঝে মাঝে আপানার ইচ্ছে হতে পারে খুদ্র syntax ব্যাবহার করার জন্য। অল্পসংখ্যক উপায় আছে JSX এর শর্তাবলীকে inline করার জন্য, নিচে ব্যাখ্যা করা হল।

### Inline If with Logical && Operator {#inline-if-with-logical--operator}


আপনি [JSX ] এর মধ্যে যে কোন এক্সপ্রেশন বসাতে পারেন (/docs/introducing-jsx.html#embedding-expressions-in-jsx) curly braces দিয়ে মড়িয়ে। JavaScript logical `&&` operator এর মধ্যে অন্তর্ভুক্ত। এটা সুবিধাজনক হতে পারে শর্তসাপেক্ষে একটি উপাদান অন্তর্ভুক্ত করার জন্য।

```js{6-10}
function Mailbox(props) {
  const unreadMessages = props.unreadMessages;
  return (
    <div>
      <h1>Hello!</h1>
      {unreadMessages.length > 0 &&
        <h2>
          You have {unreadMessages.length} unread messages.
        </h2>
      }
    </div>
  );
}

const messages = ['React', 'Re: React', 'Re:Re: React'];
ReactDOM.render(
  <Mailbox unreadMessages={messages} />,
  document.getElementById('root')
);
```

[**CodePen এ পরীক্ষা করুন**](https://codepen.io/gaearon/pen/ozJddz?editors=0010)

এটি কার্যকরী কারণ, JavaScript এ `true && expression`টি `expression`কে মূল্যায়ন করে এবং `false && expression` টি`false`কে মূল্যায়ন করে।


অতএব, যদি শর্তটি `true` হয়, তবে `&&` পরের উপাদানটি আউটপুট এ প্রদর্শিত হবে। যদি `false হয় তবে React এটিকে অবজ্ঞা করবে এবং বাদ দিবে।

### Inline If-Else with Conditional Operator {#inline-if-else-with-conditional-operator}

Conditionally rendering এ  উপাদানগুলোকে inline করার অন্য একটি উপায় হচ্ছে JavaScript এর conditional operator ব্যাবহার করা [`condition ? true : false`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Conditional_Operator).

নিম্নের উদাহরণে আমরা এটা ব্যবহার করে conditionally render করেছি একটি small block of text। 

```javascript{5}
render() {
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>
      The user is <b>{isLoggedIn ? 'currently' : 'not'}</b> logged in.
    </div>
  );
}
```


এটি বৃহত্তর  expressions এর জন্যও ব্যবহার করা যেতে পারে যদিও কী ঘটছে তা কম স্পষ্ট:

```js{5,7,9}
render() {
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>
      {isLoggedIn ? (
        <LogoutButton onClick={this.handleLogoutClick} />
      ) : (
        <LoginButton onClick={this.handleLoginClick} />
      )}
    </div>
  );
}
```

JavaScript এর মতই, একটি উপযুক্ত শৈলী নির্বাচন আপনার  উপর যা আপনি এবং আপনার দল  আরো পাঠযোগ্য বলে বিবেচনা করবে।
এছাড়াও যখন পরিস্থিতি খুব জটিল হয়ে পরে মনে রাখবেন, এটি একটি ভাল সময় হতে পারে [extract a component] করার,(/docs/components-and-props.html#extracting-components)।

### Preventing Component from Rendering {#preventing-component-from-rendering}


বিরল ক্ষেত্রে আপনি হয়তবা চাইবেন একটি component লুকোয় থাকুক যদিওবা এটি অন্য একটি component দিয়ে  rendered হয়েছিল। এটা কার্যকর করার জন্য `null`return করুন তার render output এর পরিবর্তে।

নিম্নের উদাহরণটিতে `<WarningBanner />`কে rendered করা হয়েছে `warn` নামের prop এর মানের উপর নির্ভর করে. যদি prop এর মান`false`হয় তবে,component টি render করবে না:

```javascript{2-4,29}
function WarningBanner(props) {
  if (!props.warn) {
    return null;
  }

  return (
    <div className="warning">
      Warning!
    </div>
  );
}

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showWarning: true};
    this.handleToggleClick = this.handleToggleClick.bind(this);
  }

  handleToggleClick() {
    this.setState(state => ({
      showWarning: !state.showWarning
    }));
  }

  render() {
    return (
      <div>
        <WarningBanner warn={this.state.showWarning} />
        <button onClick={this.handleToggleClick}>
          {this.state.showWarning ? 'Hide' : 'Show'}
        </button>
      </div>
    );
  }
}

ReactDOM.render(
  <Page />,
  document.getElementById('root')
);
```

[**CodePen এ পরীক্ষা করুন**](https://codepen.io/gaearon/pen/Xjoqwm?editors=0010)

Returning `null` from a একটি component এর `render`পদ্ধতি থেকে  `null`Return করলে তা ওই component এর জীবনচক্রের কার্যকারিতায় কোন প্রভাব ফেলে না। উদাহরণ স্বরূপ `componentDidUpdate` কেও অভিহিত করা হবে।
