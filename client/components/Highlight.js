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
    const currentWord: string = currentGlossaryItem.matches[0];
    return reactStringReplace(prev, currentWord, match => {
      return wrapper({ match, glossaryItem: currentGlossaryItem });
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

export default Highlight;
