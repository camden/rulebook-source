// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TOCTitle from 'components/rulebook/TOCTitle';
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
    if (!entry) {
      return null;
    }

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
      {glossary && glossary.length > 0 ? (
        <div>
          <TOCTitle
            level={1}
            id={'glossary'}
            onClick={onCloseTableOfContentsClick}
          >
            Glossary
          </TOCTitle>
          {glossaryItems(glossary, onCloseTableOfContentsClick)}
        </div>
      ) : null}
    </div>
  );
};

TableOfContents.defaultProps = {
  glossary: [],
  tableOfContents: [],
  onCloseTableOfContentsClick: () => {},
};

TableOfContents.propTypes = {
  glossary: PropTypes.array,
  onCloseTableOfContentsClick: PropTypes.func,
  tableOfContents: PropTypes.array,
};

export default TableOfContents;
