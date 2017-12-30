import React from 'react';
import styled from 'styled-components';

const Error = styled.div`
  padding: 2rem;
  margin: 0 auto;
  text-align: center;
`;

const ErrorMessage = () => {
  return (
    <Error>
      Sorry, something went wrong! Please reload the page or contact{' '}
      <a href="https://twitter.com/camdenbickel">@camdenbickel</a> on Twitter.
    </Error>
  );
};

export default ErrorMessage;
