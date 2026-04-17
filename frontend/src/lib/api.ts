import * as v from 'valibot'

const apiErrorSchema = v.object({
  error: v.object({
    code: v.string(),
    message: v.string(),
    fields: v.optional(v.nullable(v.record(v.string(), v.array(v.string())))),
  }),
})

export class ApiError extends Error {
  status: number
  code?: string
  fields?: Record<string, string[]>

  constructor({
    status,
    message,
    code,
    fields,
  }: {
    status: number
    message: string
    code?: string
    fields?: Record<string, string[]>
  }) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.code = code
    this.fields = fields
  }
}

export async function apiRequest<T>(
  path: string,
  {
    init,
    parse,
  }: {
    init?: RequestInit
    parse?: (input: unknown) => T
  } = {},
): Promise<T> {
  const headers = new Headers(init?.headers)

  if (init?.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }

  const response = await fetch(path, {
    ...init,
    headers,
    credentials: 'include',
  })

  if (!response.ok) {
    let message = 'Request failed'
    let code: string | undefined
    let fields: Record<string, string[]> | undefined

    try {
      const errorJson = v.parse(apiErrorSchema, await response.json())
      message = errorJson.error.message
      code = errorJson.error.code
      fields = errorJson.error.fields ?? undefined
    } catch {
      message = response.statusText || message
    }

    throw new ApiError({
      status: response.status,
      message,
      code,
      fields,
    })
  }

  if (response.status === 204) {
    return undefined as T
  }

  const data = await response.json()
  return parse ? parse(data) : (data as T)
}
