// @flow

import React from 'react';
import PropTypes from 'prop-types';

import MarkdownParagraph from 'components/MarkdownParagraph';
import MarkdownHeader from 'components/MarkdownHeader';
import type { Glossary as GlossaryType } from 'types';

const glossaryItem = entry => {
  return (
    <section key={`${entry.name}`}>
      <MarkdownHeader id={`glossary-${entry.name}`} level={2}>
        {entry.name}
      </MarkdownHeader>
      <MarkdownParagraph>{entry.definition}</MarkdownParagraph>
    </section>
  );
};

const glossaryDefinitions = (glossary: GlossaryType) => {
  return <div>{glossary.map(glossaryItem)}</div>;
};

const Glossary = ({ glossary }: { glossary: GlossaryType }) => {
  return (
    <section>
      {glossary.length > 0 ? (
        // Only render the title "glossary" if the glossary is loaded
        <MarkdownHeader id={'glossary'} level={1}>
          Glossary
        </MarkdownHeader>
      ) : null}
      {glossaryDefinitions(glossary)}
    </section>
  );
};

Glossary.propTypes = {
  glossary: PropTypes.array.isRequired,
};

export default Glossary;
