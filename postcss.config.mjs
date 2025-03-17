const config = {
  plugins: ['@tailwindcss/postcss'],
  theme: {
    extend: {
      colors: {
        // ... colores existentes ...
      },
      backgroundImage: {
        'gradient-video':
          'linear-gradient(180deg, hsla(0, 0%, 8%, 0) 0, hsla(0, 0%, 8%, .15) 15%, hsla(0, 0%, 8%, .35) 29%, hsla(0, 0%, 8%, .58) 44%, #171717 68%, #171717)',
      },
    },
  },
};

export default config;
