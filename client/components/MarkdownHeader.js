// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Link as LinkIcon } from 'react-feather';
import styled from 'styled-components';

const AnchorLink = styled(LinkIcon)`
  color: #ccc;
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

const Wrapper = styled.div`padding: 0.5rem 0;`;

const GenericHeader = styled.div`
  font-size: ${props => props.size};
  font-weight: bold;
  display: inline;
`;

const levelToSizeMap = {
  '1': '2em',
  '2': '1.5em',
  '3': '1.17em',
  '4': '1.12em',
  '5': '.83em',
  '6': '.75em',
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
    return (
      <Wrapper>
        <Link to={`#${this.props.id}`}>
          <AnchorLink size={'1em'} />
        </Link>
        <GenericHeader
          id={this.props.id}
          size={levelToSizeMap[this.props.level.toString()]}
        >
          {this.props.children}
        </GenericHeader>
      </Wrapper>
    );
  }
}

MarkdownHeader.propTypes = {
  id: PropTypes.number.isRequired,
  level: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
};

export default MarkdownHeader;
