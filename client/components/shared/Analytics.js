import { Component } from 'react';
import GoogleAnalytics from 'react-ga';

// Code from https://github.com/react-ga/react-ga/issues/122#issuecomment-320436578
class Analytics extends Component {
  constructor(props) {
    super(props);

    GoogleAnalytics.initialize(process.env.GOOGLE_ANALYTICS_ID);

    // Initial page load - only fired once
    this.sendPageChange(props.location.pathname, props.location.search);
  }

  componentWillReceiveProps(nextProps) {
    // When props change, check if the URL has changed or not
    if (
      this.props.location.pathname !== nextProps.location.pathname ||
      this.props.location.search !== nextProps.location.search
    ) {
      this.sendPageChange(
        nextProps.location.pathname,
        nextProps.location.search
      );
    }
  }

  sendPageChange(pathname, search = '') {
    const page = pathname + search;
    GoogleAnalytics.set({ page });
    GoogleAnalytics.pageview(page);
  }

  render() {
    return null;
  }
}

export default Analytics;
