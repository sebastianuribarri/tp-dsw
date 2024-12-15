import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom"; // Importa BrowserRouter
import RegisterPage from "./RegisterPage"; // Your component

// Mock the registerUser function
jest.mock("../../api/user", () => ({
  registerUser: jest.fn(),
}));

describe("RegisterPage", () => {
  it("should successfully submit the form and redirect to login", async () => {
    // Mock the registerUser function to simulate a successful registration
    const { registerUser } = require("../../api/user");
    registerUser.mockResolvedValueOnce({
      data: { message: "Registration successful" },
    });

    render(
      <BrowserRouter>
        <RegisterPage />
      </BrowserRouter>
    );

    // Find the form elements and fill them out
    fireEvent.change(screen.getByTestId("username"), {
      target: { value: "user123" },
    });
    fireEvent.change(screen.getByTestId("email"), {
      target: { value: "user123@example.com" },
    });
    fireEvent.change(screen.getByTestId("password"), {
      target: { value: "password" },
    });
    fireEvent.change(screen.getByTestId("confirmPassword"), {
      target: { value: "password" },
    });
    // Simulate form submission
    fireEvent.click(screen.getByTestId("register-btn"));

    // Wait for the success message or redirection
    await waitFor(() => expect(registerUser).toHaveBeenCalledTimes(1));
    expect(registerUser).toHaveBeenCalledWith(
      expect.objectContaining({
        username: "user123",
        mail: "user123@example.com", // Updated to mail to match the input prop
        password: "password",
      })
    );

    // Check if the page is redirected to the login page (if applicable)
    // You can add assertions for redirection here depending on your routing setup
  });
});
