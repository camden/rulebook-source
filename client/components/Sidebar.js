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

const StickyDiv = styled.div`
  position: absolute;
  top: 0;
  width: ${props => props.sidebarPercentage}%;
`;

const Sidebar = ({
  tableOfContents,
  sidebarPercentage,
}: {
  tableOfContents: TOCTree,
  sidebarPercentage: number,
}) => {
  const renderedTOC = renderChildren({ tree: tableOfContents });
  return (
    <StickyDiv sidebarPercentage={sidebarPercentage}>
      {renderedTOC}
    </StickyDiv>
  );
};

Sidebar.propTypes = {
  tableOfContents: PropTypes.array.isRequired,
  sidebarPercentage: PropTypes.number.isRequired,
};

export default Sidebar;
