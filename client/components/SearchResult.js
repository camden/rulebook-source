// @flow

import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Link from 'components/Link';

const ResultWrapper = styled.div`
  width: 100%;
  padding: 1rem;
  margin: 1rem 0;
  box-shadow: ${props => props.theme.shadows.light};
  transition: all 250ms ease;

  &:hover,
  &:focus {
    box-shadow: ${props => props.theme.shadows.medium};
  }
`;

const ResultTags = styled.div``;

const Tag = styled.span`
  background-color: ${props => props.theme.colors.border};
  color: ${props => props.theme.colors.black};

  font-size: 0.75rem;
  border-radius: 4px;
  padding: 0.25rem 0.5rem;
  margin-right: 0.75rem;
  margin-top: 0.5rem;
  cursor: pointer;
  display: inline-block;
  text-transform: capitalize;
`;

const getTags = tags => {
  return (
    <ResultTags>
      {tags.map(tag => {
        return <Tag key={tag}>{tag}</Tag>;
      })}
    </ResultTags>
  );
};

class SearchResult extends Component {
  render() {
    const url = this.props.name
      ? `/rules/${this.props.name}`
      : this.props.linkTo;
    return (
      <Link to={url}>
        <ResultWrapper>
          {this.props.title}
          {getTags(this.props.tags)}
        </ResultWrapper>
      </Link>
    );
  }
}

SearchResult.defaultProps = {
  tags: [],
};

SearchResult.propTypes = {
  title: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
  name: PropTypes.string,
  linkTo: PropTypes.string,
};

export default SearchResult;
