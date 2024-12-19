import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { changePlan } from "../api/user";
import { User } from "../types/User";

const Button = styled.button<{ isPremium: boolean }>`
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  background-color: ${({ isPremium }) => (isPremium ? "#222" : "yellow")};
  color: ${({ isPremium }) => (isPremium ? "white" : "black")};
  transition: background-color 0.3s ease, color 0.3s ease;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const ChangePlanButton: React.FC<{ user: User | null }> = ({ user }) => {
  const [userPremium, setUserPremium] = useState(user?.premium || false);

  // Sincronizar el estado userPremium cada vez que el user cambie
  useEffect(() => {
    setUserPremium(user?.premium || false);
  }, [user]);

  const handleChangePlan = async () => {
    try {
      if (user?.id) {
        await changePlan(user.id);
        setUserPremium(!userPremium);
      }
    } catch (error) {
      console.error("Error actualizando el plan:", error);
    }
  };

  return (
    <Wrapper>
      <Button isPremium={userPremium} onClick={handleChangePlan}>
        {userPremium ? "Cambiar a Basic" : "Cambiar a Premium"}
      </Button>
    </Wrapper>
  );
};

export default ChangePlanButton;
