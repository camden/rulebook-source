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

const TableOfContents = props => {
  const { glossary, onCloseTableOfContentsClick, tableOfContents } = props;

  const renderedTOC = renderChildren({
    tree: tableOfContents,
    onClick: onCloseTableOfContentsClick,
  });

  return (
    <div>
      {renderedTOC}
      <TOCTitle level={1} id={'glossary'} onClick={onCloseTableOfContentsClick}>
        Glossary
      </TOCTitle>
      {glossaryItems(glossary, onCloseTableOfContentsClick)}
    </div>
  );
};

TableOfContents.defaultProps = {
  glossary: [],
  tableOfContents: [],
};

TableOfContents.propTypes = {
  glossary: PropTypes.array.isRequired,
  onCloseTableOfContentsClick: PropTypes.func.isRequired,
  tableOfContents: PropTypes.array.isRequired,
};

export default TableOfContents;
