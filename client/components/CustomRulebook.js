// @flow

import React, { Component } from 'react';
import styled from 'styled-components';

import Rulebook from 'components/Rulebook';

const Input = styled.textarea`
  position: absolute;
  border: none;
  box-shadow: ${props => props.theme.shadows.light};
  top: 10px;
  left: 0;
  right: 0;
  width: 90%;
  z-index: 100;
  margin: 0 auto;
`;

class CustomRulebook extends Component {
  constructor(props) {
    super(props);

    this.state = {
      customBase64: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    this.setState({
      customBase64: event.target.value,
    });
  }

  render() {
    return (
      <div>
        <Input
          name="custom-base-64"
          type="text"
          value={this.state.customBase64}
          onChange={this.handleInputChange}
        />
        <Rulebook customBase64={this.state.customBase64} {...this.props} />
      </div>
    );
  }
}

export default CustomRulebook;
