import React from "react";
import styled from "styled-components";
import { changePlan } from "../api/user";

const Button = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  border: none;
  background-color: yellow;
  color: black;
  border-radius: 5px;

`;


const ChangePlanButton: React.FC = () => {
  const handleChangePlan = async () => {
    try {
      const userId=sessionStorage.getItem("userId");
      if (userId) {
        await changePlan(userId);
      }
    } catch (error) {
      console.error("Error actualizando el plan:", error);
    }
  };

  return <Button onClick={handleChangePlan}>Cambiar Plan</Button>;
};

export default ChangePlanButton;