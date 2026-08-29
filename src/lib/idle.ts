/** Planifie un callback après idle, avec repli setTimeout pour Safari. */
export function scheduleIdleWork(
  callback: () => void,
  options: { timeout: number; fallbackMs: number },
): () => void {
  if (typeof window.requestIdleCallback === 'function') {
    const id = window.requestIdleCallback(callback, { timeout: options.timeout })
    return () => window.cancelIdleCallback(id)
  }

  const timer = window.setTimeout(callback, options.fallbackMs)
  return () => window.clearTimeout(timer)
}
