import React from 'react';
import styled from 'styled-components';

const BoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding:0px 10px
`;

const Box = (props) => {
  return <BoxContainer {...props}>{props.children}</BoxContainer>;
};

export default Box;