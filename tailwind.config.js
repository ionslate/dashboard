const flattenColorPalette = require('tailwindcss/lib/util/flattenColorPalette')
  .default;

module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      animation: ['active'],
    },
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class',
    }),
    ({ addUtilities, e, theme, variants }) => {
      let colors = flattenColorPalette(theme('borderColor'));
      delete colors['default'];

      // Replace or Add custom colors
      if (
        this.theme &&
        this.theme.extend &&
        this.theme.extend.colors !== undefined
      ) {
        colors = Object.assign(colors, this.theme.extend.colors);
      }

      const colorMap = Object.keys(colors).map((color) => ({
        [`.border-t-${color}`]: { borderTopColor: colors[color] },
        [`.border-r-${color}`]: { borderRightColor: colors[color] },
        [`.border-b-${color}`]: { borderBottomColor: colors[color] },
        [`.border-l-${color}`]: { borderLeftColor: colors[color] },
      }));

      addUtilities(colorMap, variants('borderColor'));
    },
  ],
};
