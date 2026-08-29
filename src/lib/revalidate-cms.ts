import { revalidateTag } from 'next/cache'

export function revalidateCmsCache() {
  try {
    revalidateTag('cms', { expire: 0 })
  } catch (error) {
    console.error('[cms] cache revalidation failed:', error)
  }
}
