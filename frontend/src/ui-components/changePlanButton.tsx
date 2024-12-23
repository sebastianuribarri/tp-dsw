import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { changePlan } from "../api/user";
import { User } from "../types/User";
import RequestHandler from "./RequestHandler";

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
  const [trigger, setTrigger] = useState(false);

  // Sincronizar el estado userPremium cada vez que el user cambie
  useEffect(() => {
    setUserPremium(user?.premium || false);
  }, [user]);

  const handleChangePlan = async () => {
    if (user?.id) {
      await changePlan(user.id);
      setUserPremium(!userPremium);
    } else {
      throw new Error("Error en el servidor");
    }
  };

  const handleButtonClick = () => {
    setTrigger((prev) => !prev); // Toggle trigger to activate RequestHandler
  };

  return (
    <Wrapper>
      <RequestHandler onSubmit={handleChangePlan} trigger={trigger}>
        <Button isPremium={userPremium} onClick={handleButtonClick}>
          {userPremium ? "Cambiar a Basic" : "Cambiar a Premium"}
        </Button>
      </RequestHandler>
    </Wrapper>
  );
};

export default ChangePlanButton;
