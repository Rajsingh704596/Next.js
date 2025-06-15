//! Global Root Layout - jitne bhi page.jsx/page.tsx hai wo Root layout se hokar(children basis pr) browser ui m show hota hai

import './globals.css';
import {Roboto} from "next/font/google";              // Roboto font import from google font using next/font
import { Work_Sans } from "next/font/google";

// Font Loader call and store in variable
const roboto = Roboto ({
  subsets : ["latin"],
  variable: "--font-roboto"          // variable property add for inside tailwind font variables used    
})


// If Fonts have 2 or more word than call like this (in Snake_case format)-  //^ Non-Variable Font (Work Sans)
const workSans = Work_Sans({
  weight  : '600',           // Required for non-variable fonts (weight or style)
  subsets : ["latin"],
  style : "italic",
  variable: "--font-work-sans"
})


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} ${workSans.variable}`}>   {/*Adding font variable in body tag - here khuch bhi apply nhi hoga ye ab global css m css variable m pass hoga */}
        {children}
      </body>
    </html>
  );
}