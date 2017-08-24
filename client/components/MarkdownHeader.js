// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link as LinkIcon } from 'react-feather';
import styled from 'styled-components';

import { generateId } from 'utils';
import Link from 'components/Link';

const AnchorLink = styled(LinkIcon)`
  color: #ededed;
  padding-right: 0.5rem;
  transition: all 150ms linear;
  font-size: ${props => props.size};
  box-sizing: content-box;
  padding: 0 0.5rem 0 0;

  &:hover {
    cursor: pointer;
    color: #888;
  }
`;

const Wrapper = styled.div`
  padding: 1.25rem 0 0.5rem;
  ${props => (props.underline ? 'border-bottom: 1px solid #ccc' : '')};
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
    const id = generateId({ title: this.props.children[0] });

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
  children: PropTypes.node.isRequired,
};

export default MarkdownHeader;
