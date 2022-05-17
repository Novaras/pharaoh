const autoprefixer = require("autoprefixer");
const tailwindcss = require("tailwindcss");
const nesting = require("postcss-nesting");

const config = {
  plugins: [
    nesting(),
    tailwindcss(),
    autoprefixer()
  ],
};

module.exports = config;
