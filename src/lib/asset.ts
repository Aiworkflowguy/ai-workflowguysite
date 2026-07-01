import { existsSync } from 'node:fs';
import { join } from 'node:path';

// Returns the public URL for an asset ONLY if the file actually exists in
// /public, otherwise null. Lets pages reference generated images (see
// `npm run images`) that appear automatically once created — and render a
// graceful fallback until then, so the build never ships a broken <img>.
export function publicImage(path: string): string | null {
  const rel = path.replace(/^\//, '');
  return existsSync(join(process.cwd(), 'public', rel)) ? path : null;
}
