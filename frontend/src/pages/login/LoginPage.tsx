import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom"; // Importa Link para navegación interna
import { loginUser } from "../../api/user";
import { User } from "../../types/User";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Hook para la redirección

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    console.log("Rendering LoginPage");
    try {
      const response = await loginUser(username, password);
      const data = response.data as { token: string; user: User };
      console.log("token", data.token);

      sessionStorage.setItem("authToken", data.token);
      sessionStorage.setItem("userId", String(data.user.id));

      navigate("/");
    } catch (err: any) {
      console.error("Login failed:", err);
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <FormWrapper>
        <Title>Login</Title>
        <Form onSubmit={handleLogin}>
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
          {error && (
            <ErrorMessage data-testid="error-message">{error}</ErrorMessage>
          )}
          <Button data-testid="login-button" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
        </Form>
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

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.9rem;
  text-align: center;
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
