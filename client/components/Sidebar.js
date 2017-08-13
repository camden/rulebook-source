// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';

type TOCNode = {
  id: string,
  level: number,
  title: string,
  children: TOCTree,
};

type TOCTree = Array<TOCNode>;

const renderChildren = ({ tree }: { tree: TOCTree }) => {
  let node: TOCNode;
  for (node of tree) {
    console.log(node.title);
    renderChildren({ tree: node.children });
  }

  return <div />;
};

const Sidebar = ({ tableOfContents }: { tableOfContents: TOCTree }) => {
  return renderChildren({ tree: tableOfContents });
};

Sidebar.propTypes = {
  tableOfContents: PropTypes.array.isRequired,
};

export default Sidebar;
