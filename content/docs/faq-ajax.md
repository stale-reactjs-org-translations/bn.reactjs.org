---
id: faq-ajax
title: AJAX এবং APIs
permalink: docs/faq-ajax.html
layout: docs
category: FAQ
---

### আমি কিভাবে AJAX ব্যবহার করবো? {#how-can-i-make-an-ajax-call}

React এর সাথে আপনি যেকোনো AJAX লাইব্রেরি ব্যবহার করতে পারবেন। কয়েকটি বিখ্যাত AJAX লাইব্রেরি হলো [Axios](https://github.com/axios/axios), [jQuery AJAX](https://api.jquery.com/jQuery.ajax/) এবং ব্রাউজারের নিজস্ব [window.fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)।

### আমি কম্পোনেন্টের জীবনচক্রের কোথায় AJAX ব্যবহার করবো?{#where-in-the-component-lifecycle-should-i-make-an-ajax-call}

আপনার উচিত [`componentDidMount`](/docs/react-component.html#mounting) জীবনচক্রের মেথডে ডাটা লোড করা। কারণ, এভাবে আপনার ডাটা লোড হওয়ার পর আপনি `setState` ব্যবহার করে আপনার কম্পোনেন্টের state পরিবর্তন করতে পারবেন।

### উদাহরণ: AJAX এর তথ্য ব্যবহার করে স্থানীয় state সেট করা। {#example-using-ajax-results-to-set-local-state}

নিচের কম্পোনেন্টে `componentDidMount` এ কিভাবে AJAX ব্যবহার করে স্থানীয় state পরিবর্তন করা যায়, তা দেখানো হয়েছে।

উদাহরণের API-টি নিচের মতো JSON object ফেরত পাঠায়ঃ

```
{
  "items": [
    { "id": 1, "name": "Apples",  "price": "$2" },
    { "id": 2, "name": "Peaches", "price": "$5" }
  ] 
}
```

```jsx
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    fetch("https://api.example.com/items")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.items
          });
        },
        // বিঃদ্রঃ এখানে catch() ব্লক এর বদলে error
        // সামলানো খুবই গুরুত্বপূর্ণ কেননা আমরা চাই না
        // কম্পোনেন্টের আসল কোনো সমস্যা হজম করতে।
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <ul>
          {items.map(item => (
            <li key={item.name}>
              {item.name} {item.price}
            </li>
          ))}
        </ul>
      );
    }
  }
}
```
