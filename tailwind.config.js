/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily:{
        quicksand: ['Quicksand', 'sans-serif'],
        robotoSlab: ['Roboto Slab', 'serif'],
      },
      colors:{
        verdeSena : '#39a900',
        lightBlue : '#205EAF'
      }
    },
  },
  plugins: [],
  safelist: [
    'border-verdeSena',   'text-verdeSena',   'bg-verdeSena',
    'border-orange-200',  'text-orange-500',  'bg-orange-50',   'bg-orange-500',  'border-orange-500',
    'border-blue-200',    'text-blue-500',    'bg-blue-50',     'bg-blue-500',    'border-blue-500',
    'border-[#daeeda]',   'bg-[#f0f7f1]',     'bg-[#daeeda]',
  ]
}
