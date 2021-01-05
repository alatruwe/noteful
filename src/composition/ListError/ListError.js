import React, { Component } from "react";

export default class ListError extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <h2>Oops, something went wrong. Try again later!</h2>;
    }
    return this.props.children;
  }
}
