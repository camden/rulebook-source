// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactProgress from 'react-progress';

class ProgressBar extends Component {
  state: {
    percent: number,
    intervalId: ?number,
  };

  constructor(props) {
    super(props);

    this.state = {
      percent: 0,
      intervalId: 0,
    };
  }

  componentDidMount() {
    this.startAutoIncrement();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.loading) {
      if (!nextProps.loading) {
        // Was loading, now finished loading, so fill the bar
        this.setState({
          percent: 100,
        });
        this.stopAutoIncrement();
      }
    } else {
      // Finished loading, now loading again, so restart bar
      if (nextProps.loading) {
        this.setState({
          percent: 0,
        });
        this.startAutoIncrement();
      }
    }
  }

  startAutoIncrement() {
    const intervalId = setInterval(this.incrementProgress.bind(this), 100);

    this.setState({
      intervalId: intervalId,
    });
  }

  stopAutoIncrement() {
    if (!this.state.intervalId) {
      return;
    }

    clearInterval(this.state.intervalId);

    this.setState({
      intervalId: null,
    });
  }

  incrementProgress() {
    if (this.state.percent >= 100) {
      return;
    }

    const remainingPercent = 100 - this.state.percent;
    const toAdd = remainingPercent * 0.5 * Math.random();

    this.setState({
      percent: this.state.percent + toAdd,
    });
  }

  render() {
    return (
      <ReactProgress
        {...this.props}
        percent={this.state.percent}
        color="hsl(200, 100%, 76%)"
        style={{
          height: '0.5vh',
          boxShadow: '1px 1px 1px hsl(200, 100%, 90%)',
        }}
      />
    );
  }
}

ProgressBar.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default ProgressBar;
