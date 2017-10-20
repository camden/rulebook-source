// @flow

import React, { Component } from 'react';
import styled from 'styled-components';

import Rulebook from 'components/rulebook/Rulebook';

const Input = styled.textarea`
  position: relative;
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
      customMarkdown: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    this.setState({
      customMarkdown: event.target.value,
    });
  }

  render() {
    return (
      <div>
        <Input
          name="custom-markdown"
          type="text"
          value={this.state.customMarkdown}
          onChange={this.handleInputChange}
        />
        <Rulebook customMarkdown={this.state.customMarkdown} {...this.props} />
      </div>
    );
  }
}

export default CustomRulebook;
