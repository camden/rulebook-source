// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { generateId } from 'utils';
import { default as LinkIcon } from 'components/icons/Link';
import Link from 'components/shared/Link';

const AnchorLink = styled.span`
  padding-left: 0.25rem;
  transition: all 150ms linear;
  box-sizing: content-box;

  cursor: pointer;

  color: ${props => props.theme.colors.icon.default};

  &:hover {
    color: ${props => props.theme.colors.icon.hover};
  }

  @media print {
    display: none;
  }
`;

const underlineStyle = `
    border-bottom: 1px solid #efefef;
    margin-bottom: 0.5rem;
`;

const Wrapper = styled.div`
  margin-top: 1rem;
  padding: 0.75rem 0 0.25rem;
  ${props => (props.underline ? underlineStyle : '')};
`;

const GenericHeader = styled.div`
  font-size: ${props => props.size};
  font-weight: bold;
  display: inline;
`;

const AnchorOffset = styled.div`
  position: relative;
  top: -5rem;
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
      anchorShowing: false,
    };

    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  handleMouseEnter() {
    this.setState({
      anchorShowing: true,
    });
  }

  handleMouseLeave() {
    this.setState({
      anchorShowing: false,
    });
  }

  render() {
    const title = this.props.children;
    const id = generateId({ title });

    return (
      <Wrapper
        underline={this.props.level === 1}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <AnchorOffset id={id} />
        <GenericHeader size={levelToSizeMap[this.props.level.toString()]}>
          {this.props.children}
        </GenericHeader>
        {this.state.anchorShowing ? (
          <Link to={`#${id}`}>
            <AnchorLink>
              <LinkIcon size={16} />
            </AnchorLink>
          </Link>
        ) : null}
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
