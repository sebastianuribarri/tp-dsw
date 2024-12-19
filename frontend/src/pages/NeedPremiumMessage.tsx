import { useState, useEffect } from "react";
import styled from "styled-components";
import { getUserById } from "../api/user";
// Asegúrate de que esta función esté correctamente implementada

interface NeedPremiumMessageProps {
  message: string;
}

const WarningMessage = styled.div`
  color: red;
  font-weight: bold;
  text-align: center;
  margin-top: 20px;
`;

const NeedPremiumMessage = ({ message }: NeedPremiumMessageProps) => {
  const [isPremium, setIsPremium] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = sessionStorage.getItem("userId");
        if (userId) {
          const user = await getUserById(userId);
          setIsPremium(user.data.premium);
        }
      } catch (error) {
        console.error("Error al obtener información del usuario:", error);
        setIsPremium(false); // En caso de error, asumimos que no es premium
      }
    };

    fetchUser();
  }, []);

  if (isPremium === null) {
    return null; // Mientras se carga la información, no mostramos nada
  }

  if (isPremium) {
    return null; // Si el usuario es premium, no mostramos el mensaje
  }

  return <WarningMessage>{message}</WarningMessage>;
};

export default NeedPremiumMessage;
