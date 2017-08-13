// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
        <TOCTitle level={node.level}>
          {node.title}
        </TOCTitle>
        {renderChildren({ tree: node.children })}
      </div>
    );
  });
};

const Sidebar = ({ tableOfContents }: { tableOfContents: TOCTree }) => {
  const renderedTOC = renderChildren({ tree: tableOfContents });
  return (
    <div>
      {renderedTOC}
    </div>
  );
};

Sidebar.propTypes = {
  tableOfContents: PropTypes.array.isRequired,
};

export default Sidebar;
