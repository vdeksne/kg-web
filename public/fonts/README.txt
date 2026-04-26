Licensed Gotham webfonts for this site (hyphenated filenames — required for correct URLs on Vercel/Linux):

  Gotham-Light.woff2   (+ optional .woff)
  Gotham-Book.woff2
  Gotham-Medium.woff2
  Gotham-Bold.woff2
  Gotham-Black.woff2

`src/app/globals.css` loads these from `/fonts/...`. Commit this folder to git so production deploys include the files; otherwise the browser falls back to Helvetica.

Do not use spaces in filenames (e.g. "Gotham Light.woff2"); use hyphens as above.
