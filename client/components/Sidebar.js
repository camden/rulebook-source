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

const SidebarBody = styled.div`
  padding: 1rem 2rem;
  border-right: 1px solid ${props => props.theme.colors.border};
`;

const Sidebar = ({ tableOfContents }: { tableOfContents: TOCTree }) => {
  const renderedTOC = renderChildren({ tree: tableOfContents });
  // TODO do this calculation outside
  return (
    <SidebarBody>
      {renderedTOC}
    </SidebarBody>
  );
};

Sidebar.propTypes = {
  tableOfContents: PropTypes.array.isRequired,
};

export default Sidebar;
