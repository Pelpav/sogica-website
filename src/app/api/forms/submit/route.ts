import { NextResponse } from 'next/server'
import { z } from 'zod'
import { getPayloadClient } from '@/lib/payload'

const schema = z.object({
  formType: z.enum(['contact', 'quote']),
  locale: z.string().optional(),
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  organization: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().optional(),
  projectLocation: z.string().optional(),
  budget: z.string().optional(),
  timing: z.string().optional(),
  description: z.string().optional(),
  consent: z.string(),
  honeypot: z.string().optional(),
  formStartedAt: z.string().optional(),
  sourcePage: z.string().optional(),
})

export async function POST(request: Request) {
  try {
    const json = await request.json()
    const data = schema.parse(json)

    if (data.honeypot) {
      return NextResponse.json({ ok: true })
    }

    const started = Number(data.formStartedAt || 0)
    if (started && Date.now() - started < 2000) {
      return NextResponse.json({ error: 'Too fast' }, { status: 429 })
    }

    if (data.formType === 'contact' && !data.message) {
      return NextResponse.json({ error: 'Message required' }, { status: 400 })
    }
    if (data.formType === 'quote' && !data.description) {
      return NextResponse.json({ error: 'Description required' }, { status: 400 })
    }

    const payload = await getPayloadClient()
    await payload.create({
      collection: 'form-submissions',
      data: {
        formType: data.formType,
        name: data.name,
        email: data.email,
        phone: data.phone,
        organization: data.organization,
        subject: data.subject,
        message: data.message,
        projectLocation: data.projectLocation,
        budget: data.budget,
        timing: data.timing,
        description: data.description,
        consent: data.consent === 'true',
        locale: data.locale,
        sourcePage: data.sourcePage,
        status: 'new',
      },
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Invalid submission' }, { status: 400 })
  }
}
