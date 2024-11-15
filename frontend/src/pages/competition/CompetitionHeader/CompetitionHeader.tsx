import React from "react";
import { CompetitionDetail } from "../../../types/Competition";
import styled from "styled-components";
import BackButton from "../../../ui-components/BackButton/BackButton";

interface CompetitionHeaderProps {
  competition: CompetitionDetail;
}

const HeaderContainer = styled.div`
  display: flex;
  align-items: center; /* Centra verticalmente */
  justify-content: center; /* Centra horizontalmente */
  padding: 0 10px;
  width: 100%;
  position: relative; /* Permite posicionar el botón de retroceso */
`;

const BackButtonContainer = styled.div`
  position: absolute;
  left: 10px; /* Ubica el botón de retroceso a la izquierda */
`;

const LogoAndNameContainer = styled.div`
  display: flex;
  align-items: center; /* Centra logo y nombre en línea */
`;

const Logo = styled.img`
  width: 50px;
  height: 50px;
  object-fit: contain;
`;

const CompetitionName = styled.h1`
  font-size: 20px;
  font-weight: bold;
  margin-left: 10px; /* Espacio entre logo y nombre */
`;

const CompetitionHeader: React.FC<CompetitionHeaderProps> = ({
  competition,
}) => {
  return (
    <HeaderContainer>
      <BackButtonContainer>
        <BackButton />
      </BackButtonContainer>
      <LogoAndNameContainer>
        <Logo src={competition.logo} alt={`${competition.name} logo`} />
        <CompetitionName>{competition.name}</CompetitionName>
      </LogoAndNameContainer>
    </HeaderContainer>
  );
};

export default CompetitionHeader;
