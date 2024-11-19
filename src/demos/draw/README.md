# Drawing Demo

This demo shows how to use Yoha for drawing. For a fully self-contained, smaller example please consider [this](https://github.com/handtracking-io/yoha/tree/main/example).

The demo uses some utilities mainly for visualization that are not part of the Yoha npm package
right now. If you think it would make sense to include some of the utilities in the Yoha packge 
feel free to give feedback.

## Different Backends

Note that the demo is available for all supported backends. Each one has separate
`*_entry.ts` file.

Similarly a separate HTML file is generated for each backend. E.g. `https://localhost:8090/tfjs_webgl_draw.html`

# Running

Install dependencies: `yarn`

Starting webpack dev server: `yarn start`
