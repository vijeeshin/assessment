import React from 'react';
import styled from 'styled-components';

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding:0px 10px
`;

const Column = (props) => {
  return <ColumnContainer {...props}>{props.children}</ColumnContainer>;
};

export default Column;