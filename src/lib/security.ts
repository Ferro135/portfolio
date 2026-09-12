export function safeHttpsUrl(value: string | undefined | null): string {
  if (!value) return "";

  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url.toString() : "";
  } catch {
    return "";
  }
}
