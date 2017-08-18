// @flow

import React from 'react';
import PropTypes from 'prop-types';
import reactStringReplace from 'react-string-replace';

import type { Glossary } from 'types';

const wrapper = ({ match, definition }) => {
  return (
    <strong>
      {match} ({definition})
    </strong>
  );
};

const highlightText = ({ textToReplace, glossary, wrapper }): Array<*> => {
  const replacedText = glossary.reduce((prev, currentGlossaryEntry) => {
    // TODO do all aliases
    const currentWord = currentGlossaryEntry.names[0];
    return reactStringReplace(prev, currentWord, (match, index, offset) => {
      return wrapper({ match, definition: currentGlossaryEntry.definition });
    });
  }, textToReplace);

  return replacedText;
};

const Highlight = ({
  text,
  glossary,
}: {
  text: string,
  glossary: Glossary,
}) => {
  const highlightedText = highlightText({
    textToReplace: text,
    glossary,
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
