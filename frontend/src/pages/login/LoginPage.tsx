import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../../api/user";
import { User } from "../../types/User";
import RequestHandler from "../../ui-components/RequestHandler";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [trigger, setTrigger] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);

    try {
      const response = await loginUser(username, password);
      const data = response.data as { token: string; user: User };

      sessionStorage.setItem("authToken", data.token);
      sessionStorage.setItem("userId", String(data.user.id));

      setTimeout(() => navigate("/"), 2000); // Redirigir después de 2 segundos
    } catch (err: any) {
      throw new Error(
        err.response?.data?.message || "Inicio de sesión fallido"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTrigger((prev) => !prev); // Toggle trigger to activate RequestHandler
  };

  return (
    <Container>
      <FormWrapper>
        <Title>Login</Title>
        <RequestHandler onSubmit={handleLogin} trigger={trigger}>
          <Form onSubmit={handleSubmit}>
            <InputWrapper>
              <Label>Username</Label>
              <Input
                data-testid="username-input"
                type="text"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </InputWrapper>
            <InputWrapper>
              <Label>Password</Label>
              <Input
                data-testid="password-input"
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </InputWrapper>
            <Button data-testid="login-button" type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
          </Form>
        </RequestHandler>
        <Footer>
          <Question>¿No tienes cuenta aún?</Question>
          <StyledLink to="/register">Regístrate</StyledLink>
        </Footer>
      </FormWrapper>
    </Container>
  );
};

export default LoginPage;

// Styled Components
// ...existing styled components code...
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const FormWrapper = styled.div`
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #555;
  border-radius: 4px;
  font-size: 1rem;
  background-color: #333;
  &:focus {
    border-color: #167f45;
    outline: none;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }
`;

const Button = styled.button`
  padding: 0.75rem;
  background-color: #167f45;
  color: white;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #037d3e;
  }
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const Message = styled.p<{ type: "error" | "success" }>`
  color: ${({ type }) => (type === "error" ? "#dc3545" : "#28a745")};
  background-color: ${({ type }) =>
    type === "error" ? "rgba(220, 53, 69, 0.2)" : "rgba(40, 167, 69, 0.2)"};
  font-size: 0.9rem;
  text-align: center;
  padding: 0.75rem;
  border-radius: 4px;
  margin-top: -0.5rem;
`;

const Footer = styled.div`
  margin-top: 1.5rem;
  text-align: center;
`;

const Question = styled.p`
  margin: 0;
  font-size: 0.9rem;
  color: #555;
`;

const StyledLink = styled(Link)`
  color: #167f45;
  text-decoration: none;
  font-weight: bold;
  &:hover {
    text-decoration: underline;
  }
`;
