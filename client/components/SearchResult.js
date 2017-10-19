// @flow

import React, { Component } from 'react';
import styled from 'styled-components';

import RulebookCard from 'components/RulebookCard';

const Result = styled(RulebookCard)`margin: 1rem 0;`;

class SearchResult extends Component {
  render() {
    return <Result {...this.props} />;
  }
}

export default SearchResult;
