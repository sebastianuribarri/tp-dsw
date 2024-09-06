import React from "react";
import styled from "styled-components";
import { HiArrowDown } from "react-icons/hi2";
// Styled button with icon
const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1em auto;
  padding: 5px;
  font-size: 1em;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 40px;
  height: 40px;

  svg {
    width: 90%;
    height: 90%;
    color: #bbb;
  }
`;

// SVG for down arrow
const DownArrowIcon = () => <HiArrowDown />;

// SeeMoreButton Component
const SeeMoreButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <Button onClick={onClick}>
    <DownArrowIcon />
  </Button>
);

export default SeeMoreButton;
