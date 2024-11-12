export function sanitizeHTML(input) {

  const htmlEscapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;',
  }

  const sanitizedInput = input.replace(/[&<>"'/]/g, match => htmlEscapeMap[match])
  return sanitizedInput
}