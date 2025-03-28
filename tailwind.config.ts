import type { Config } from 'tailwindcss'


const config: Config = {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}', // 包含 HTML 文件
    './src/components/**/*.{js,jsx,ts,tsx}',
    './src/pages/**/*.{js,jsx,ts,tsx}',

  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        sidebar: "300px auto", // for sidebar layout. adds grid-cols-sidebar class
      },
      gridTemplateRows: {
        header: "64px auto", // for the navbar layout. adds grid-rows-header class
      },
    },
  },
  plugins: [],
}
export default config
