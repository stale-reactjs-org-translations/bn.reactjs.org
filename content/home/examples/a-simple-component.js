class HelloMessage extends React.Component {
  render() {
    return <div>হ্যালো {this.props.name}</div>;
  }
}

root.render(<HelloMessage name="টেইলর" />);
