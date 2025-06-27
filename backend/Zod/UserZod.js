const { z } = require("zod");

const userCreateSchema = z.object({
  userName: z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().optional(),
  }),
  age: z.number().int().positive("Age must be a positive number"),
  gender: z.enum(["male", "female"]),
  email: z.string().email("Invalid email"),
  password: z.string().min(4, "Password must be at least 8 characters"),
});

module.exports = { userCreateSchema };
