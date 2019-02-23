class HelloMessage extends React.Component {
  render() {
    return (
      <div>
        হ্যালো {this.props.name}
      </div>
    );
  }
}

ReactDOM.render(
  <HelloMessage name="টেইলর" />,
  document.getElementById('hello-example')
);