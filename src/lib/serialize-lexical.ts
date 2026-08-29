export function serializeLexical(content: unknown): string {
  if (typeof content === 'string') return content
  if (!content || typeof content !== 'object') return ''
  const root = (content as { root?: { children?: unknown[] } }).root
  if (!root?.children) return ''
  return root.children
    .map((node) => {
      const n = node as { type?: string; children?: { text?: string }[]; tag?: string }
      if (n.type === 'paragraph') {
        const text = n.children?.map((c) => c.text || '').join('') || ''
        return text ? `<p>${text}</p>` : ''
      }
      if (n.type === 'heading') {
        const text = n.children?.map((c) => c.text || '').join('') || ''
        const tag = n.tag || 'h2'
        return text ? `<${tag}>${text}</${tag}>` : ''
      }
      return ''
    })
    .join('')
}
