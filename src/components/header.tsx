"use client"

// fonts
import { El_Messiri } from "next/font/google";

// components
import ThemeSwitcher from "./ui/themeSwicher";

const elMessiri = El_Messiri({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
});


export default function Header () {
  return (
    <header className='bg-primary text-white min-h-[10vh] flex justify-between items-center px-4 sm:px-20'>
      <h1 className={`${elMessiri.className} text-2xl font-bold`}>مُدَبِرْ</h1>
      <ThemeSwitcher />
    </header>
  );
};