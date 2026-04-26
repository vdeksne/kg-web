Place licensed Gotham webfont files here (woff2 recommended):

  Gotham-Light.woff2
  Gotham-Book.woff2
  Gotham-Medium.woff2
  Gotham-Bold.woff2
  Gotham-Black.woff2

Then edit src/app/globals.css @font-face rules: after each local(...) pair, add a comma and
  url("/fonts/<matching-file>.woff2") format("woff2")

Until then, CSS uses local() only so the browser does not request missing /fonts/*.woff2 (no 404). The stack still falls back to Helvetica / Arial when Gotham is not installed locally.
