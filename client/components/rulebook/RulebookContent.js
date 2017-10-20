// @flow

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Glossary from 'components/rulebook/Glossary';
import type { Glossary as GlossaryType } from 'types';

const RulebookBody = styled.div`
  padding: 1rem;
  max-width: 100%;
  margin: 0 auto;
  @media (min-width: ${props => props.theme.media.desktop}) {
    padding: 1rem 3rem 3rem;
    max-width: 50rem;
  }
`;

const RulebookContent = ({
  markdown,
  glossary,
}: {
  markdown: Array<*>,
  glossary: GlossaryType,
}) => {
  return (
    <RulebookBody>
      {markdown}
      {glossary && glossary.length > 0 ? (
        <Glossary glossary={glossary} />
      ) : null}
    </RulebookBody>
  );
};

RulebookContent.defaultProps = {
  markdown: [],
  glossary: [],
};

RulebookContent.propTypes = {
  markdown: PropTypes.node.isRequired,
  glossary: PropTypes.array,
};

export default RulebookContent;
