export function getApiBaseUrl() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME
  return codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api`
    : 'http://localhost:8000/api'
}

export function normalizeResponse(data, key) {
  if (Array.isArray(data)) {
    return data
  }
  return (
    data?.[key] ||
    data?.items ||
    data?.results ||
    data?.data ||
    data ||
    []
  )
}
