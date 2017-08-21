// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import TOCTitle from 'components/TOCTitle';

type TOCNode = {
  id: string,
  level: number,
  title: string,
  children: TOCTree,
};

type TOCTree = Array<TOCNode>;

const renderChildren = ({ tree }: { tree: TOCTree }) => {
  return tree.map((node: TOCNode) => {
    return (
      <div key={node.id}>
        <TOCTitle level={node.level} id={node.id}>
          {node.title}
        </TOCTitle>
        {renderChildren({ tree: node.children })}
      </div>
    );
  });
};

const OffsetDiv = styled.div`
  position: absolute;
  top: 0;
  left: ${props => props.offset};
  bottom: 0;
  width: ${props => props.width};
  overflow-y: auto;
`;

const Sidebar = ({
  tableOfContents,
  sidebarOffset,
  sidebarWidth,
}: {
  tableOfContents: TOCTree,
}) => {
  const renderedTOC = renderChildren({ tree: tableOfContents });
  // TODO do this calculation outside
  return (
    <OffsetDiv
      offset={`${sidebarOffset.value -
        sidebarWidth.value}${sidebarOffset.unit}`}
      width={`${sidebarWidth.value}${sidebarWidth.unit}`}
    >
      {renderedTOC}
    </OffsetDiv>
  );
};

Sidebar.propTypes = {
  tableOfContents: PropTypes.array.isRequired,
};

export default Sidebar;
