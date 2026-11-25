import { z } from 'zod'

export const contactSchema = z.object({
  fullName: z.string().trim().min(2, 'Full name is required').max(100),
  email: z.string().trim().email('Valid email is required').max(200),
  phone: z.string().trim().max(40).optional().or(z.literal('')),
  subject: z.string().trim().min(2, 'Subject is required').max(160),
  message: z.string().trim().min(10, 'Message must be at least 10 characters').max(5000),
  company: z.string().optional(), // honeypot
})

export type ContactPayload = z.infer<typeof contactSchema>
