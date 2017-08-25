// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { generateId } from 'utils';
import { default as LinkIcon } from 'components/icons/Link';
import Link from 'components/Link';

const AnchorLink = styled(LinkIcon)`
  padding-right: 0.5rem;
  transition: all 150ms linear;
  font-size: ${props => props.size};
  box-sizing: content-box;
  padding: 0 0.5rem 0 0;

  cursor: pointer;

  color: ${props => props.theme.colors.icon.default};

  &:hover {
    color: ${props => props.theme.colors.icon.hover};
  }
`;

const underlineStyle = `
    border-bottom: 1px solid #ccc;
    margin-bottom: 0.5rem;
`;
const Wrapper = styled.div`
  padding: 0.75rem 0 0.25rem;
  ${props => (props.underline ? underlineStyle : '')};
`;

const GenericHeader = styled.div`
  font-size: ${props => props.size};
  font-weight: bold;
  display: inline;
`;

const levelToSizeMap = {
  '1': '1.8rem',
  '2': '1.5rem',
  '3': '1.3rem',
  '4': '1.1rem',
  '5': '1rem',
  '6': '0.8rem',
};

class MarkdownHeader extends Component {
  state: {
    collapsed: boolean,
  };

  constructor(props) {
    super(props);

    this.state = {
      collapsed: true,
    };
  }

  render() {
    const title = this.props.children;
    const id = generateId({ title });

    return (
      <Wrapper underline={this.props.level === 1}>
        <Link to={`#${id}`}>
          <AnchorLink size={'1em'} />
        </Link>
        <GenericHeader
          id={id}
          size={levelToSizeMap[this.props.level.toString()]}
        >
          {this.props.children}
        </GenericHeader>
      </Wrapper>
    );
  }
}

MarkdownHeader.propTypes = {
  id: PropTypes.string.isRequired,
  level: PropTypes.number.isRequired,
  children: PropTypes.string.isRequired,
};

export default MarkdownHeader;
