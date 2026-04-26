import { z } from "zod";

export const contactFormPayloadSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(200),
  email: z.string().trim().email("Invalid email").max(320),
  message: z.string().trim().min(1, "Message is required").max(10000),
});

export type ContactFormPayload = z.infer<typeof contactFormPayloadSchema>;
