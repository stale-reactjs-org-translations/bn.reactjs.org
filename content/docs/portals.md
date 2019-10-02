---
id: portals
title: পোর্টাল
permalink: docs/portals.html
---

পোর্টাল, একটি  DOM নোডে ফার্স্ট-ক্লাস উপায়ে children রেন্ডার করে থাকে যেটি আসলে parent কম্পোনেন্টের DOM hierarchy এর বাহিরে অবস্থান করে।

```js
ReactDOM.createPortal(child, container)
```

প্রথম আর্গুমেন্টটি(`child`) যেকোন [রেন্ডারেবল React child](/docs/react-component.html#render), যেমন একটি element, string, অথবা fragment. দ্বিতীয় আর্গুমেন্টটি (`container`) একটি DOM element.

## ব্যবহারবিধি {#usage}

সাধারণত, আপনি যখন কম্পোনেন্টের রেন্ডার মেথড থেকে একটি element রিটার্ন করেন, তখন সেটি DOM এ তার নিকটবর্তী  parent নোডের child হিসেবে মাউন্ট হয়ঃ

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

যাহোক, কখনো কখনো একটি child কে DOM এর একটি পৃথক স্থানে ঢোকানো দরকারি হয়ে পড়েঃ

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

পোর্টালগুলির জন্য একটি সাধারণ ব্যবহার ক্ষেত্রে হল যখন parent কম্পোনেন্টের `overflow: hidden` অথবা `z-index` এর মত style থাকে, কিন্তু আপনার তার child কে তার কন্টেইনার থেকে দৃশ্যত "বের করে" আনতে হবে। উদাহরণস্বরূপ, dialogs, hovercards, এবং tooltips.

> বিঃদ্রঃ
>
> যখন পোর্টাল নিয়ে কাজ করবেন, মনে রাখবেন [কিবোর্ড ফোকাস ম্যানেজ](/docs/accessibility.html#programmatically-managing-focus) করা খুব গুরুত্বপূর্ণ।
>
> modal dialogs এর জন্য, আপনাকে নিশ্চিত করতে হবে প্রত্যেকে যেন  [WAI-ARIA Modal Authoring Practices](https://www.w3.org/TR/wai-aria-practices-1.1/#dialog_modal) অনুসরণ করে তাদের সাথে ইন্টারেক্ট করতে পারে।

[**CodePen এ চালিয়ে দেখুন**](https://codepen.io/gaearon/pen/yzMaBd)

## পোর্টাল দিয়ে ইভেন্ট বাব্লিং {#event-bubbling-through-portals}

Even though a portal can be anywhere in the DOM tree, it behaves like a normal React child in every other way. Features like context work exactly the same regardless of whether the child is a portal, as the portal still exists in the *React tree* regardless of position in the *DOM tree*.

This includes event bubbling. An event fired from inside a portal will propagate to ancestors in the containing *React tree*, even if those elements are not ancestors in the *DOM tree*. Assuming the following HTML structure:

```html
<html>
  <body>
    <div id="app-root"></div>
    <div id="modal-root"></div>
  </body>
</html>
```

A `Parent` component in `#app-root` would be able to catch an uncaught, bubbling event from the sibling node `#modal-root`.

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

Catching an event bubbling up from a portal in a parent component allows the development of more flexible abstractions that are not inherently reliant on portals. For example, if you render a `<Modal />` component, the parent can capture its events regardless of whether it's implemented using portals.
