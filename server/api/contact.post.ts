import { Resend } from 'resend'
import { contactSchema } from '../utils/contactSchema'
import { checkRateLimit } from '../utils/rateLimit'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const ip =
    getRequestHeader(event, 'x-forwarded-for')?.split(',')[0]?.trim() ||
    getRequestHeader(event, 'x-real-ip') ||
    'unknown'

  const limited = checkRateLimit(ip)
  if (!limited.ok) {
    throw createError({
      statusCode: 429,
      statusMessage: `Too many requests. Retry in ${limited.retryAfter}s.`,
      data: { message: `Too many requests. Retry in ${limited.retryAfter}s.` },
    })
  }

  const body = await readBody(event)
  const parsed = contactSchema.safeParse(body)

  if (!parsed.success) {
    const errors: Record<string, string> = {}
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] || 'form')
      if (!errors[key]) errors[key] = issue.message
    }
    throw createError({
      statusCode: 400,
      statusMessage: 'Validation failed',
      data: { message: 'Please fix the highlighted fields.', errors },
    })
  }

  // Honeypot tripped — pretend success
  if (parsed.data.company && parsed.data.company.trim().length > 0) {
    return { ok: true }
  }

  const apiKey = config.resendApiKey
  if (!apiKey) {
    throw createError({
      statusCode: 503,
      statusMessage: 'Email service not configured',
      data: {
        message:
          'Contact API is not configured. Set NUXT_RESEND_API_KEY in .env (see .env.example).',
      },
    })
  }

  const resend = new Resend(apiKey)
  const to = config.contactToEmail || 'ahmedtaher4550@gmail.com'
  const from = config.contactFromEmail || 'Portfolio Contact <onboarding@resend.dev>'

  const { fullName, email, phone, subject, message } = parsed.data

  try {
    const result = await resend.emails.send({
      from,
      to: [to],
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      text: [
        `Name: ${fullName}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        `Subject: ${subject}`,
        '',
        message,
      ].join('\n'),
    })

    if (result.error) {
      throw createError({
        statusCode: 502,
        statusMessage: 'Email delivery failed',
        data: { message: 'Email provider rejected the message. Please try again later.' },
      })
    }

    return { ok: true }
  } catch (err: unknown) {
    if (err && typeof err === 'object' && 'statusCode' in err) throw err
    throw createError({
      statusCode: 502,
      statusMessage: 'Email delivery failed',
      data: { message: 'Could not deliver your message. Please email directly.' },
    })
  }
})
