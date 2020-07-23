import React from 'react';
import styled from 'styled-components';

const ButtonStyled = styled.button`
  border: none;
  border-radius: 4px;
  font-size: 1.4rem;
  font-weight: 600;
  padding: 0.5rem 1rem;
  color: #fff;
  outline: none;
  cursor: pointer;
  background: #ffa2a2;
  transition: all 0.2s ease;
  &:hover {
    background: #70a7ff;
    transition: all 0.2s ease;
  }
`;

const Button = props => <ButtonStyled {...props} />;

export default Button;