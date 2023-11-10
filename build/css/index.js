import tailwindcss from "tailwindcss";
import tailwindcssNesting from "tailwindcss/nesting";
import autoprefixer from "autoprefixer";
import postcssNesting from "postcss-nesting";

export const css = {
  preprocessorOptions: {},
  postcss: {
    plugins: [
      tailwindcssNesting(postcssNesting),
      tailwindcss,
      autoprefixer,
    ],
  },
}