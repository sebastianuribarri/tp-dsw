import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa"; // Import the arrow icon from react-icons
import styled from "styled-components";

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  background-color: #333;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  margin-right: 8px;
  svg {
    color: #bbb;
  }
`;
const BackButton: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  return (
    <Button onClick={handleGoBack}>
      <FaArrowLeft size={20} /> {/* This renders the arrow icon */}
    </Button>
  );
};

export default BackButton;
