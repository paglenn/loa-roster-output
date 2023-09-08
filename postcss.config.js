module.exports = {
  plugins: [
   
    require("autoprefixer"),
    require("postcss-import"),
    require("tailwindcss/nesting")(require("postcss-nesting")),
    require("tailwindcss"),
  ],
};
