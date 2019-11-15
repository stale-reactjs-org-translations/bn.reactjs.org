---
id: portals
title: পোর্টাল
permalink: docs/portals.html
---

পোর্টাল, একটি  DOM নোডে ফার্স্ট-ক্লাস উপায়ে children রেন্ডার করে থাকে যেটি আসলে parent কম্পোনেন্টের DOM hierarchy এর বাহিরে অবস্থান করে।

```js
ReactDOM.createPortal(child, container)
```

প্রথম আর্গুমেন্টটি(`child`) যেকোন [রেন্ডারেবল React চাইল্ড](/docs/react-component.html#render), যেমন একটি element, string, অথবা fragment. দ্বিতীয় আর্গুমেন্টটি (`container`) একটি DOM element.

## ব্যবহারবিধি {#usage}

সাধারণত, আপনি যখন কম্পোনেন্টের রেন্ডার মেথড থেকে একটি element রিটার্ন করেন, তখন সেটি DOM এ তার নিকটবর্তী  parent নোডের চাইল্ড হিসেবে মাউন্ট হয়ঃ

```js{4,6}
render() {
  // React mounts a new div and renders the children into it
  return (
    <div>
      {this.props.children}
    </div>
  );
}
```

যাহোক, কখনো কখনো একটি চাইল্ডকে DOM এর একটি পৃথক স্থানে ঢোকানো দরকারি হয়ে পরেঃ

```js{6}
render() {
  // React does *not* create a new div. It renders the children into `domNode`.
  // `domNode` is any valid DOM node, regardless of its location in the DOM.
  return ReactDOM.createPortal(
    this.props.children,
    domNode
  );
}
```

পোর্টালগুলির জন্য একটি সাধারণ ব্যবহার ক্ষেত্রে হল যখন parent কম্পোনেন্টের `overflow: hidden` অথবা `z-index` এর মত style থাকে, কিন্তু আপনার তার চাইল্ডকে তার কন্টেইনার থেকে দৃশ্যত "বের করে" আনতে হবে। উদাহরণস্বরূপ, dialogs, hovercards, এবং tooltips.

> বিঃদ্রঃ
>
> যখন পোর্টাল নিয়ে কাজ করবেন, মনে রাখবেন [কিবোর্ড ফোকাস ম্যানেজ](/docs/accessibility.html#programmatically-managing-focus) করা খুব গুরুত্বপূর্ণ।
>
> modal dialogs এর জন্য, আপনাকে নিশ্চিত করতে হবে প্রত্যেকে যেন  [WAI-ARIA Modal Authoring Practices](https://www.w3.org/TR/wai-aria-practices-1.1/#dialog_modal) অনুসরণ করে তাদের সাথে ইন্টারেক্ট করতে পারে।

[**CodePen এ চালিয়ে দেখুন**](https://codepen.io/gaearon/pen/yzMaBd)

## পোর্টাল দিয়ে ইভেন্ট বাব্লিং {#event-bubbling-through-portals}

যদিও পোর্টাল DOM ট্রি এর যে কোন জায়গায় থাকতে পারে তবে এটি অন্যভাবে একটি স্বাভাবিক React চাইল্ডের মতো আচরণ করে। context এর মত ফিচারগুলো হুবহু একই রকম কাজ করে কেননা পোর্টাল নিজেই একটি চাইল্ড। বিশেষত portal *React tree* তে চাইল্ড হিসেবেই বিরাজ করে যদিও *DOM tree* তে তার অবস্থান ভিন্ন।

এর মধ্যে ইভেন্ট বাব্লিং অন্তর্ভুক্ত। পোর্টালের ভেতর কোন ইভেন্ট ফায়ার করলে তা *React tree* তে তার উপরের কম্পোনেন্টে প্রসারিত করে যদিও কম্পোনেন্টি *DOM tree* তে তার উপরে অবস্থিত নয়। নিচের HTML structureটির কথাই ধরা যাকঃ

```html
<html>
  <body>
    <div id="app-root"></div>
    <div id="modal-root"></div>
  </body>
</html>
```

`#app-root`এ অবস্থিত `Parent` কম্পোনেন্টি, তার প্রতিবেশী `#modal-root` এর ইভেন্ট বাব্লিং ধরতে সক্ষম।

```js{28-31,42-49,53,61-63,70-71,74}
// These two containers are siblings in the DOM
const appRoot = document.getElementById('app-root');
const modalRoot = document.getElementById('modal-root');

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
  }

  componentDidMount() {
    // The portal element is inserted in the DOM tree after
    // the Modal's children are mounted, meaning that children
    // will be mounted on a detached DOM node. If a child
    // component requires to be attached to the DOM tree
    // immediately when mounted, for example to measure a
    // DOM node, or uses 'autoFocus' in a descendant, add
    // state to Modal and only render the children when Modal
    // is inserted in the DOM tree.
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(
      this.props.children,
      this.el,
    );
  }
}

class Parent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {clicks: 0};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    // This will fire when the button in Child is clicked,
    // updating Parent's state, even though button
    // is not direct descendant in the DOM.
    this.setState(state => ({
      clicks: state.clicks + 1
    }));
  }

  render() {
    return (
      <div onClick={this.handleClick}>
        <p>Number of clicks: {this.state.clicks}</p>
        <p>
          Open up the browser DevTools
          to observe that the button
          is not a child of the div
          with the onClick handler.
        </p>
        <Modal>
          <Child />
        </Modal>
      </div>
    );
  }
}

function Child() {
  // The click event on this button will bubble up to parent,
  // because there is no 'onClick' attribute defined
  return (
    <div className="modal">
      <button>Click</button>
    </div>
  );
}

ReactDOM.render(<Parent />, appRoot);
```

[**CodePen এ চালিয়ে দেখুন**](https://codepen.io/gaearon/pen/jGBWpE)

পোর্টাল থেকে সৃষ্ট ইভেন্ট বাব্লিং parent কম্পোনেন্টে ধরার মাধ্যমে সহজতর abstraction এর ডেভেলপমেন্টকে সাহায্য করে যা পোর্টালের উপর নির্ভর করে না। উদাহরণস্বরূপ, আপনি যদি কোন `<Modal />` কম্পোনেন্ট রেন্ডার করেন, তার parent তার ইভেন্টগুলো ধরতে পারবে যদিও এটি পোর্টাল ব্যবহার করে করা হয়।
