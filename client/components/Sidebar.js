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

const glossaryItems = (glossary: GlossaryType) => {
  return glossary.map(entry => {
    return (
      <TOCTitle key={entry.name} level={2} id={`glossary-${entry.name}`}>
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
  const { tableOfContents, glossary } = props;
  const renderedTOC = renderChildren({ tree: tableOfContents });
  return (
    <SidebarBody>
      {renderedTOC}
      <TOCTitle level={1} id={'glossary'}>
        Glossary
      </TOCTitle>
      {glossaryItems(glossary)}
    </SidebarBody>
  );
};

Sidebar.defaultProps = {
  tableOfContents: [],
  glossary: [],
};

Sidebar.propTypes = {
  tableOfContents: PropTypes.array.isRequired,
  glossary: PropTypes.array.isRequired,
};

export default Sidebar;
