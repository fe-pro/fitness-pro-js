export function getParamFromUrl(paramName) {

  const params = window.location.search
  const urlParams = new URLSearchParams(params)
  const param = urlParams.get(paramName)

  if(!param) throw new Error(404)

  return param
}

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