// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import TOCTitle from 'components/TOCTitle';
import type { Glossary as GlossaryType } from 'types';

type TOCNode = {
  id: string,
  level: number,
  title: string,
  children: TOCTree,
};

type TOCTree = Array<TOCNode>;

const renderChildren = ({
  tree,
  onClick,
}: {
  tree: TOCTree,
  onClick: Function,
}) => {
  return tree.map((node: TOCNode) => {
    return (
      <div key={node.id}>
        <TOCTitle level={node.level} id={node.id} onClick={onClick}>
          {node.title}
        </TOCTitle>
        {renderChildren({ tree: node.children, onClick })}
      </div>
    );
  });
};

const glossaryItems = (glossary: GlossaryType, onClick: Function) => {
  return glossary.map(entry => {
    return (
      <TOCTitle
        key={entry.name}
        level={2}
        id={`glossary-${entry.name}`}
        onClick={onClick}
      >
        {entry.name}
      </TOCTitle>
    );
  });
};

const SidebarBody = styled.nav`
  padding: 1rem 2rem;
  border-right: 1px solid ${props => props.theme.colors.border};
  background-color: white;
  width: 100%;
`;

const Sidebar = props => {
  const { glossary, onCloseSidebarClick, tableOfContents } = props;

  const renderedTOC = renderChildren({
    tree: tableOfContents,
    onClick: onCloseSidebarClick,
  });

  return (
    <SidebarBody>
      {renderedTOC}
      <TOCTitle level={1} id={'glossary'} onClick={onCloseSidebarClick}>
        Glossary
      </TOCTitle>
      {glossaryItems(glossary, onCloseSidebarClick)}
    </SidebarBody>
  );
};

Sidebar.defaultProps = {
  glossary: [],
  tableOfContents: [],
};

Sidebar.propTypes = {
  glossary: PropTypes.array.isRequired,
  onCloseSidebarClick: PropTypes.func.isRequired,
  tableOfContents: PropTypes.array.isRequired,
};

export default Sidebar;
