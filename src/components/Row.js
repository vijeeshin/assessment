import React from 'react';
import styled from 'styled-components';

const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding:0px 10px
`;

const Row = (props) => {
  return <RowContainer {...props}>{props.children}</RowContainer>;
};

export default Row;