import React, { Component } from 'react';

export default class Rulebook extends Component {
  render() {
    return (
      <div>
        {this.props.match.params.rulebookName}
      </div>
    );
  }
}
