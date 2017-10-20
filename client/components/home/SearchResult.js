// @flow

import React, { Component } from 'react';
import styled from 'styled-components';

import RulebookCard from 'components/shared/RulebookCard';

const Result = styled.div`margin: 1rem 0;`;

class SearchResult extends Component {
  render() {
    return (
      <Result>
        <RulebookCard {...this.props} />
      </Result>
    );
  }
}

export default SearchResult;
