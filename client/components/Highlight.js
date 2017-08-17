// @flow

import React from 'react';
import reactStringReplace from 'react-string-replace';

const Highlight = ({ text, regex, wrapper }) => {
  const result = reactStringReplace(text, regex, (match, index, offset) => {
    return wrapper({ match });
  });
  return (
    <div>
      {result}
    </div>
  );
};

export default Highlight;
