import React from "react";
import { CompetitionDetail } from "../../../types/Competition";
import styled from "styled-components";
import BackButton from "../../../ui-components/BackButton/BackButton";

interface CompetitionHeaderProps {
  competition: CompetitionDetail;
}

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  width: 100%;
`;

const Logo = styled.img`
  width: 50px;
  height: 50px;
  object-fit: contain;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 20px;
`;

const CompetitionName = styled.h1`
  font-size: 20px;
  font-weight: bold;
`;

const CompetitionHeader: React.FC<CompetitionHeaderProps> = ({
  competition,
}) => {
  return (
    <HeaderContainer>
      <BackButton />
      <Logo src={competition.logo} alt={`${competition.name} logo`} />
      <InfoContainer>
        <CompetitionName>{competition.name}</CompetitionName>
      </InfoContainer>
    </HeaderContainer>
  );
};

export default CompetitionHeader;
