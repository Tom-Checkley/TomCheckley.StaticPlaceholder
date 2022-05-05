# TomCheckley.StaticPlaceholder

Static placeholder page while site is being built.

## FE Set Up

In console run:

- `nvm use 14.18.1`
- `yarn`

## Dev

Run dev server with BrowserSync, auto compile Sass & JS

- `gulp dev`

Flags:
- `--open` Opens in default browser
- `--port [port number]` Defaults to 3000

## Production

Minify CSS & JS, updates cachebuster in script and link tags. Copies to dist directory

- `gulp prod`
