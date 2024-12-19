import axios from "axios";
import { Request, Response, NextFunction } from "express";

export const validateRecaptcha = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { recaptchaToken } = req.body;

  if (!recaptchaToken) {
    res.status(400).json({ message: "El token de reCAPTCHA es requerido" });
    return;
  }

  try {
    const response = await axios.post(
      "https://www.google.com/recaptcha/api/siteverify",
      null,
      {
        params: {
          secret: process.env.RECAPTCHA_SECRET!,
          response: recaptchaToken,
        },
      }
    );

    const { success, score, "error-codes": errorCodes } = response.data;

    if (!success) {
      res.status(400).json({
        message: "El token de reCAPTCHA no es válido",
        errors: errorCodes || [],
      });
      return;
    }

    if (score && score < 0.5) {
      res.status(400).json({ message: "Actividad sospechosa detectada" });
      return;
    }

    next(); // El token es válido, continúa con la ejecución
  } catch (error) {
    console.error("Error validando reCAPTCHA:", error);
    res.status(500).json({ message: "Error validando reCAPTCHA" });
  }
};
