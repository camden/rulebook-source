// @flow

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import MarkdownHeader from 'components/MarkdownHeader';
import type { Glossary as GlossaryType } from 'types';

const glossaryItem = entry => {
  return (
    <MarkdownHeader key={entry.name} id={`glossary-${entry.name}`} level={2}>
      {entry.name}
    </MarkdownHeader>
  );
};

const glossaryDefinitions = (glossary: GlossaryType) => {
  return (
    <div>
      {glossary.map(glossaryItem)}
    </div>
  );
};

const Glossary = ({ glossary }: { glossary: GlossaryType }) => {
  return (
    <section>
      <MarkdownHeader id={'glossary'} level={1}>
        Glossary
      </MarkdownHeader>
      {glossaryDefinitions(glossary)}
    </section>
  );
};

Glossary.propTypes = {
  glossary: PropTypes.array.isRequired,
};

export default Glossary;
