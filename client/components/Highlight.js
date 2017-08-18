// @flow

import React from 'react';
import PropTypes from 'prop-types';
import reactStringReplace from 'react-string-replace';

const glossary = [
  {
    name: 'sed',
    aliases: [],
    definition: 'this is a test defn.',
  },
  {
    name: 'erat',
    aliases: [],
    definition: 'this is another def',
  },
];

const wrapper = ({ match, definition }) => {
  return (
    <strong>
      {match} ({definition})
    </strong>
  );
};

const highlightText = ({ textToReplace, definitions, wrapper }): Array<*> => {
  const replacedText = definitions.reduce((prev, current) => {
    return reactStringReplace(prev, current.name, (match, index, offset) => {
      return wrapper({ match, definition: current.definition });
    });
  }, textToReplace);

  return replacedText;
};

const Highlight = ({ text, matches }) => {
  const highlightedText = highlightText({
    textToReplace: text,
    definitions: glossary,
    wrapper,
  });
  return (
    <div>
      {highlightedText}
    </div>
  );
};

Highlight.propTypes = {
  text: PropTypes.string.isRequired,
  matches: PropTypes.arrayOf(
    PropTypes.oneOf([PropTypes.string, PropTypes.instanceOf(RegExp)]).isRequired
  ).isRequired,
};

export default Highlight;
