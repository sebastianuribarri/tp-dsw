import styled from "styled-components";

const LogoContainer = styled.div`
  display: none;
  @media (min-width: 768px) {
    display: flex;
    flex-direction: row;
    padding: 7px 15px;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
`;

const Image = styled.img`
  width: 2.3rem;
  height: auto;
  margin-right: 10px;

  @media (min-width: 768px) {
    width: 4rem;
    margin-right: 0;
    margin-bottom: 10px;
  }
`;

const AppName = styled.h1`
  font-size: 1.3em;
  margin: 0;
  color: white;
  text-align: center;
  font-weight: 600;
  @media (min-width: 768px) {
    text-align: center;
  }
`;

const AppLogo: React.FC = () => {
  return (
    <LogoContainer>
      <Image src="logo.png" alt="Logo" />
      <AppName>TodoFulbo</AppName>
    </LogoContainer>
  );
};

export default AppLogo;
