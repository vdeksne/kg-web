/** Soft hyphen (U+00AD): may render as “-” when the line wraps at this point. */
const SHY = "\u00AD";

/**
 * Inserts soft hyphen break opportunities inside long non-whitespace runs so absurd
 * “one word” payloads can wrap in the UI (e.g. admin inbox).
 */
export function withSoftHyphenBreaks(text: string, chunkSize = 16): string {
  if (!text) return text;
  return text.replace(/\S+/g, (token) => {
    if (token.length <= chunkSize) return token;
    const parts: string[] = [];
    for (let i = 0; i < token.length; i += chunkSize) {
      parts.push(token.slice(i, i + chunkSize));
    }
    return parts.join(SHY);
  });
}
