// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactProgress from 'react-progress';

import { MainTheme } from 'themes';

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
    if (this.props.loading) {
      this.startAutoIncrement();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.loading) {
      if (!nextProps.loading) {
        // Was loading, now finished loading, so fill the bar
        // The timeout guarantees a minimum loading time of 500ms
        this.setState(
          {
            percent: 100,
          },
          this.stopAutoIncrement
        );
      }
    } else {
      // Finished loading, now loading again, so restart bar
      if (nextProps.loading) {
        this.stopAutoIncrement();
        this.setState(
          {
            percent: 0,
          },
          () => {
            this.startAutoIncrement();
          }
        );
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
    const toAdd = remainingPercent * 0.3 * Math.random();

    this.setState({
      percent: this.state.percent + toAdd,
    });
  }

  style({ relative, height }) {
    let styleObj = {
      height: '0.4vh',
      boxShadow: `1px 2px 4px ${MainTheme.colors.primary_transparent}`,
      zIndex: '100',
    };

    if (relative) {
      styleObj.position = 'relative';
      styleObj.display = 'block';
    }

    if (height) {
      styleObj.height = height;
    }

    return styleObj;
  }

  render() {
    return (
      <div>
        <ReactProgress
          {...this.props}
          percent={this.state.percent}
          color={MainTheme.colors.primary}
          style={this.style({
            relative: this.props.relative,
            height: this.props.height,
          })}
        />
      </div>
    );
  }
}

ProgressBar.defaultProps = {
  loading: true,
  relative: false,
  height: '',
};

ProgressBar.propTypes = {
  loading: PropTypes.bool.isRequired,
  relative: PropTypes.bool,
  height: PropTypes.string,
};

export default ProgressBar;
