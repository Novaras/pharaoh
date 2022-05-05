const preprocess = require("svelte-preprocess");

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: preprocess({
    defaults: {
      style: `postcss`
    },
    postcss: true
  })
};

module.exports = config;
