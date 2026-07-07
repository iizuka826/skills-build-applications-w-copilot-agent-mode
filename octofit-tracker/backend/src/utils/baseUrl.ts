const codespaceName = process.env.CODESPACE_NAME;

export function getBaseUrl(port: number = 8000): string {
  if (codespaceName) {
    return `https://${codespaceName}-${port}.app.github.dev`;
  }

  return `http://localhost:${port}`;
}
