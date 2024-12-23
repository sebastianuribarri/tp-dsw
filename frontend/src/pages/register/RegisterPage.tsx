import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import { registerUser } from "../../api/user"; // Función para registrar usuario
import { Link } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha"; // Importa ReCAPTCHA

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      setLoading(false);
      return;
    }

    if (!recaptchaToken) {
      setError("Por favor, completa el reCAPTCHA");
      setLoading(false);
      return;
    }

    try {
      const user = { username, mail, password, recaptchaToken };
      await registerUser(user);

      navigate("/login");
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Registration failed:", err.message);
        setError(err.message || "Registration failed");
      } else {
        console.error("Unknown error occurred:", err);
        setError("Registration failed");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token);
  };

  return (
    <Container>
      <FormWrapper>
        <Title>Register</Title>
        <Form onSubmit={handleRegister}>
          <InputWrapper>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              data-testid="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </InputWrapper>
          <InputWrapper>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              data-testid="email"
              type="email"
              value={mail}
              onChange={(e) => setMail(e.target.value)}
              required
            />
          </InputWrapper>
          <InputWrapper>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              data-testid="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </InputWrapper>
          <InputWrapper>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              data-testid="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </InputWrapper>
          <RecaptchaWrapper>
            <ReCAPTCHA
              sitekey="6LdEfqAqAAAAALMWJpXg2_1oyVK0GN8p2aHHgMoc"
              onChange={handleRecaptchaChange}
            />
          </RecaptchaWrapper>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <Button type="submit" data-testid="register-btn" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </Button>
        </Form>
        <Footer>
          <Question>¿Ya tienes cuenta?</Question>
          <StyledLink to="/login">Inicia sesión</StyledLink>
        </Footer>
      </FormWrapper>
    </Container>
  );
};

export default RegisterPage;

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
  margin-bottom: 1rem;
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
  width: 100%; /* Asegura que el input ocupe todo el ancho disponible */
  box-sizing: border-box; /* Incluye padding y border en el tamaño total */
  &:focus {
    border-color: #007bff;
    outline: none;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }
`;

const RecaptchaWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
`;

const Button = styled.button`
  padding: 0.75rem;
  background-color: #007bff;
  color: white;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%; /* Hace que el botón también ocupe todo el ancho */
  &:hover {
    background-color: #0056b3;
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
  color: #007bff;
  text-decoration: none;
  font-weight: bold;
  &:hover {
    text-decoration: underline;
  }
`;
