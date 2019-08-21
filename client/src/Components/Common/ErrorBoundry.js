import React, { Component } from "react";
import * as Sentry from "@sentry/browser";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null, eventId: null };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error });
    if (process.env.NODE_ENV === "production") {
      Sentry.withScope(scope => {
        scope.setExtras(errorInfo);
        const eventId = Sentry.captureException(error);
        this.setState({ eventId });
      });
    }
  }

  showSentryDialogFrom = () => {
    if (process.env.NODE_ENV === "production") {
      Sentry.showReportDialog({ eventId: this.state.eventId });
    }
  };

  render() {
    if (this.state.error) {
      //render fallback UI
      return (
        <div>
          <h1>Oops… Help us fix this by submitting a report</h1>
          <button onClick={this.showSentryDialogFrom}>Report feedback</button>
        </div>
      );
    }

    //when there's not an error, render children untouched
    return this.props.children;
  }
}

export default ErrorBoundary;
