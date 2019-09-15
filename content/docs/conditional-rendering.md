---
id: conditional-rendering
title: Conditional Rendering
permalink: docs/conditional-rendering.html
prev: handling-events.html
next: lists-and-keys.html
redirect_from:
  - "tips/false-in-jsx.html"
---

React এ আপনি একটি স্বতন্ত্র কম্পোনেন্ট তৈরি করতে পারেন যা আপনার প্রয়োজনীয় চাহিদাগুলোকে পৃথক করে রাখবে। তারপরে, আপনার অ্যাপ্লিকেশনের স্টেটের উপর নির্ভর করে তাদের মধ্যে কয়েকটি রেন্ডার করতে পারেন।

React এ কন্ডিশানাল রেন্ডারিং, জাভাস্ক্রিপ্টে কন্ডিশান যেভাবে কাজ করে ঠিক সেভাবেই কাজ করে। [`if`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else) অথবা [conditional operator](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Conditional_Operator) এর মত জাভাস্ক্রিপ্টের অপারেটরগুলি ব্যবহার করে বর্তমান স্টেটের elements তৈরি করুন, এবং React কে তাদের সাথে মিলিয়ে UI আপডেট করতে দিন।

এই দুটি কম্পোনেন্ট বিবেচনা করুন:

```js
function UserGreeting(props) {
  return <h1>Welcome back!</h1>;
}

function GuestGreeting(props) {
  return <h1>Please sign up.</h1>;
}
```

আমরা একটি `Greeting` কম্পোনেন্ট তৈরি করব, যা ইউজার লগ ইন করেছে কিনা তার উপর নির্ভর করে উপরের কম্পোনেন্টগুলোর মধ্যে যেকোন একটি কম্পোনেন্ট প্রদর্শন করবেঃ

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

[**CodePen এ চালিয়ে দেখুন**](https://codepen.io/gaearon/pen/ZpVxNq?editors=0011)

এই উদাহরণ `isLoggedIn` prop এর মানের উপর নির্ভর করে ভিন্ন ধরনের greeting রেন্ডার করে।

### Element Variables {#element-variables}

elements সংরক্ষণ করতে আপনি variable ব্যবহার করতে পারেন। এটি আপনাকে element এর একটি অংশ কন্ডিশানালি রেন্ডার করতে সহায়তা করতে পারে যদিও তার বাকি অংশের কোন পরিবর্তন হয়নি।

এই দুটি নতুন কম্পোনেন্ট বিবেচনা করুন যা Logout এবং Login buttons তৈরি করেঃ

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

নিচের উদাহরণে, আমরা `LoginControl` নামে একটি [stateful কম্পোনেন্ট](/docs/state-and-lifecycle.html#adding-local-state-to-a-class) তৈরি করব।

এটি বর্তমান স্টেটের উপর নির্ভর করে `<LoginButton />` বা `<LogoutButton />`সরবরাহ করবে। এটা পূর্ববর্তী উদাহরণের `<Greeting />` কম্পোনেন্টকেও রেন্ডার করবেঃ

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

[**CodePen এ চালিয়ে দেখুন**](https://codepen.io/gaearon/pen/QKzAgB?editors=0010)

variable ডিক্লেয়ার করার মাধ্যমে `if` স্টেটমেন্টের ভিতর সেটিকে ব্যবহার করা মূলত কম্পোনেন্টকে কন্ডিশানালি রেন্ডার করার একটু সুন্দর উপায়, মাঝে মাঝে আপনি shorter syntax ব্যবহার করেও এটি করতে পারেন। কন্ডিশানকে inline এর মাধ্যমে JSX এ ব্যবহার করার জন্য কিছু উপায় রয়েছে, নিচে তা ব্যাখ্যা করা হল।

### Logical && Operator এর সাথে Inline If {#inline-if-with-logical--operator}

আপনি curly braces এর ভিতরে [যে কোন এক্সপ্রেশন JSX এর মধ্যে বসাতে পারেন](/docs/introducing-jsx.html#embedding-expressions-in-jsx)। এই এক্সপ্রেশনগুলোর মধ্যে জাভাস্ক্রিপ্টের logical `&&` operator ও অন্তর্ভুক্ত। কন্ডিশানাল element অন্তর্ভুক্ত করার জন্য এটি বেশ সুবিধাজনক হতে পারে।

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

[**CodePen এ চালিয়ে দেখুন**](https://codepen.io/gaearon/pen/ozJddz?editors=0010)

এটি কার্যকরী, কারণ জাভাস্ক্রিপ্টে `true && expression`টি `expression`কে মূল্যায়ন করে এবং `false && expression` টি `false`কে মূল্যায়ন করে।

অতএব, যদি কন্ডিশানটি `true` হয়, তবে `&&` এরপরের কম্পোনেন্টি আউটপুট এ প্রদর্শিত হবে। যদি `false` হয় তবে React এটিকে অবজ্ঞা করবে এবং বাদ দিবে।

### Conditional Operator এর সাথে Inline If-Else {#inline-if-else-with-conditional-operator}

element কে inline এ কন্ডিশানালি রেন্ডারিং করার অন্য একটি উপায় হচ্ছে জাভাস্ক্রিপ্টের conditional operator [`condition ? true : false`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Conditional_Operator) ব্যবহার করা।

নিম্নের উদাহরণে আমরা এটা ব্যবহার করে text এর একটি ছোট ব্লককে কন্ডিশানালি রেন্ডার করেছি।

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

এটি বৃহত্তর expressions এর জন্যও ব্যবহার করা যেতে পারে যদিও কী ঘটছে তা মোটেও স্পষ্ট নয়ঃ

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

জাভাস্ক্রিটের মতই, আপনি এবং আপনার দলের কাছে কোন styleটি পাঠযোগ্য তার উপর ভিত্তি করে আপনি আপনার পছন্দমত style নির্বাচন করতে পারেন। এছাড়াও মনে রাখবেন কন্ডিশান খুব জটিল হয়ে পরে, এটি একটি উপযুক্ত সময় [কম্পোনেন্টকে extract করার](/docs/components-and-props.html#extracting-components)।

### কম্পোনেন্টকে রেন্ডারিং থেকে বিরত রাখা {#preventing-component-from-rendering}

বিরল ক্ষেত্রে আপনি হয়ত চাইবেন একটি কম্পোনেন্ট hide থাকুক যদিও এটি অন্য একটি কম্পোনেন্ট দিয়ে রেন্ডার হয়েছিল। এটা কার্যকর করার জন্য তার রেন্ডার আউটপুটের পরিবর্তে। `null` রিটার্ন করুন।

নিম্নের উদাহরণটিতে `<WarningBanner />`কে `warn` prop এর মানের উপর নির্ভর করে রেন্ডার করা হয়েছে। যদি prop এর মান `false` হয় তবে কম্পোনেন্টটি রেন্ডার করবে নাঃ

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

[**CodePen এ চালিয়ে দেখুন**](https://codepen.io/gaearon/pen/Xjoqwm?editors=0010)

কম্পোনেন্টের `render` মেথড থেকে `null` রিটার্ন করা, ওই কম্পোনেন্টের লাইফসাইকেল মেথডগুলোতে কোন প্রভাব ফেলে না। উদাহরণ স্বরূপ `componentDidUpdate` তখনো কল হবে।
