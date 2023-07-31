import React, { useState } from 'react';
import styled from 'styled-components';

const AccordionContainer = styled.div`
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const AccordionHeader = styled.div`
  background-color: ${(props) => (props.isOpen ? '#ddd' : '#3BB2EB')};
  padding: 10px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Arrow = styled.span`
  font-size: 1.2rem;
  margin-left: 5px;
  transform: ${(props) => (props.isOpen ? 'rotate(180deg)' : 'rotate(0)')};
`;

const AccordionContent = styled.div`
  padding: 10px;

`;
/**
 * Accordion component
 */
const Accordion = ({ title, children , onClosed}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
    if(isOpen) {
      onClosed(true)
    }
  };

  return (
    <AccordionContainer>
      <AccordionHeader isOpen={isOpen} onClick={toggleAccordion}>
        {title}
        <Arrow isOpen={isOpen}>&#9660;</Arrow>
      </AccordionHeader>
      {isOpen && <AccordionContent>{children}</AccordionContent>}
    </AccordionContainer>
  );
};

export default Accordion;
