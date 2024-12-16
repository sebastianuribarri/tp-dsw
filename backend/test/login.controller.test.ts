import request from "supertest";
import express, { Request, Response } from "express";
import UserController from "../src/User/presentation/user.controller";
import UserUseCases from "../src/User/application/user.use_cases";
import User from "../src/User/domain/user.entity";

// Mock para la dependencia UserUseCases
const mockUserUseCases = {
  login: jest.fn(),
};

// Crear app de Express para pruebas
const app = express();
app.use(express.json());

const userController = new UserController(mockUserUseCases as unknown as UserUseCases);
app.post("/login", userController.login);

describe("UserController.login", () => {
  test("debería iniciar sesión correctamente", async () => {
    const loginPayload = {
      username: "testuser",
      password: "password123",
    };

    const mockUser = new User({
      id: "1",
      mail: "testuser@example.com",
      password: "hashedpassword",
      username: "testuser",
    });

    const mockToken = "mockToken";

    mockUserUseCases.login.mockResolvedValueOnce({ user: mockUser, token: mockToken });

    const response = await request(app)
      .post("/login")
      .send(loginPayload);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ user: mockUser, token: mockToken });
    expect(mockUserUseCases.login).toHaveBeenCalledWith(loginPayload.username, loginPayload.password);
  });

  test("debería devolver un error si las credenciales son incorrectas", async () => {
    const loginPayload = {
      username: "testuser",
      password: "wrongpassword",
    };

    mockUserUseCases.login.mockRejectedValueOnce(new Error("Usuario o contraseña incorrectos"));

    const response = await request(app)
      .post("/login")
      .send(loginPayload);

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ message: "Usuario o contraseña incorrectos" });
    expect(mockUserUseCases.login).toHaveBeenCalledWith(loginPayload.username, loginPayload.password);
  });
});