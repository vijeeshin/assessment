import React from 'react';
import styled from 'styled-components';

const A = styled.a`
  padding: 0.5em;
  margin: 0.5em;
`;

const Link = ({title, isCompleted}) => {
  return <A >{title}{isCompleted && <i>&#10003;</i>}</A>;
};

export default Link;