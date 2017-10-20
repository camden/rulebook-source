// @flow

import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { default as InlineLink } from 'components/shared/Link';

const ResultWrapper = styled.div`
  width: 100%;
  padding: 1rem;
  margin: 0;
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

const Link = InlineLink.extend`
  display: block;
  text-decoration: none;
`;

const getTags = tags => {
  return (
    <ResultTags>
      {tags.map(tag => {
        return <Tag key={tag}>{tag.replace('-', ' ')}</Tag>;
      })}
    </ResultTags>
  );
};

class RulebookCard extends Component {
  render() {
    let { name, title, tags } = this.props;

    if (this.props.rulebook) {
      const rulebook = this.props.rulebook;
      name = rulebook.name;
      title = rulebook.title;
      tags = rulebook.tags;
    }

    const url = name ? `/rules/${name}` : this.props.linkTo;

    return (
      <Link className={this.props.className} to={url}>
        <ResultWrapper>
          {title}
          {getTags(tags)}
        </ResultWrapper>
      </Link>
    );
  }
}

RulebookCard.defaultProps = {
  className: '',
  tags: [],
};

RulebookCard.propTypes = {
  rulebook: PropTypes.shape({
    name: PropTypes.string,
    title: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
  }),
  name: PropTypes.string,
  title: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
  linkTo: PropTypes.string,
  className: PropTypes.string,
};

export default RulebookCard;
