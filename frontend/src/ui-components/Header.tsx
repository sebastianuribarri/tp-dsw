import styled from "styled-components";

interface HeaderProps {
  title: string;
  children?: React.ReactNode;
}

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;

  padding: 7px 15px;
  background-color: #333;

  @media (min-width: 768px) {
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
`;

const Logo = styled.img`
  width: 2.3rem;
  height: auto;
  margin-right: 10px;

  @media (min-width: 768px) {
    width: 4rem;
    margin-right: 0;
    margin-bottom: 10px;
  }
`;

const HeaderTitle = styled.h1`
  font-size: 1.3em;
  margin: 0;
  color: white;
  text-align: center;
  font-weight: 600;
  @media (min-width: 768px) {
    text-align: center;
  }
`;

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <HeaderContainer>
      <Logo src="logo.png" alt="Logo" />
      <HeaderTitle>{title}</HeaderTitle>
    </HeaderContainer>
  );
};

export default Header;
