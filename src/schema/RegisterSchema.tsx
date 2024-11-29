import { z } from "zod";

export const RegisterSchema = z.object({
    fullName: z.string().min(1, {
      message: "Full name cannot be empty"
    }),
    email: z.string().email({
      message: "Please enter a valid email address"
    }),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters long"
    })
  })