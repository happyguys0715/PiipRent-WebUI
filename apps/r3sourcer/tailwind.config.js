const { createGlobPatternsForDependencies } = require('@nrwl/angular/tailwind');
const { join } = require('path');

module.exports = {
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          200: '#eef6ff',
          300: '#d3deea',
          DEFAULT: '#2196f3',
        },
        gray: {
          200: 'rgba(47, 47, 47, 0.1)',
          300: '#7a7a7a',
          DEFAULT: '#333333',
          500: '#828282',
        },
        yellow: '#F58926',
        danger: '#fa5c46',
        success: '#32ba5e',
        warning: '#f58926',
        info: '#28a3fc',
        secondary: {
          200: '#4f4f4f',
          300: '#F5FAFF',
          DEFAULT: '#7a7a7a',
        },
        muted: '#6c757d',
        white: '#fdfdfd',
        black: '#000',
      },
      boxShadow: {
        full: '0 0 6px rgba(0, 0, 0, 0.1)',
        card: '0 0 8px rgba(51, 51, 51, 0.1)',
        button: '0 4px 6px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
