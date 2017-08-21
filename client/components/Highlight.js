// @flow

import React from 'react';
import PropTypes from 'prop-types';
import reactStringReplace from 'react-string-replace';

import HighlightedString from 'components/HighlightedString';

import type { Glossary } from 'types';

const wrapper = HighlightedString;

const highlightText = ({
  textToReplace,
  glossary,
  wrapper,
}: {
  textToReplace: string,
  glossary: Glossary,
  wrapper: Function,
}): string => {
  const replacedText = glossary.reduce((prev, currentGlossaryItem) => {
    // TODO do all aliases
    let currentWord: string = currentGlossaryItem.name;

    if (currentGlossaryItem.matches) {
      currentWord = currentGlossaryItem.matches[0];
    }

    return reactStringReplace(prev, currentWord, (match, index) => {
      return wrapper({ match, glossaryItem: currentGlossaryItem, index });
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
  if (!glossary) {
    return (
      <span>
        {text}
      </span>
    );
  }

  const highlightedText = highlightText({
    textToReplace: text,
    glossary,
    wrapper,
  });

  return (
    <span>
      {highlightedText}
    </span>
  );
};

Highlight.propTypes = {
  text: PropTypes.array.isRequired,
  glossary: PropTypes.array.isRequired,
};

export default Highlight;
