//! Global Root Layout - jitne bhi page.jsx/page.tsx hai wo Root layout se hokar(children basis pr) browser ui m show hota hai

import './globals.css';
import {Roboto} from "next/font/google";              // Roboto font import from google font using next/font
import { Work_Sans } from "next/font/google";

// For Root Layout Meta Data Obj add 
export const metadata ={
  title:{
    default: "Rock Web Dev | Learn Full Stack Web development",          // default title show for page when we not define any title
    template: "%s | Rock Web Dev"                       // if individual page have title so %s - work as a placeholder (where that title show then | Rock Web Dev show)
  },
  description: "Next Js v15 Full Stack Web development full course",
  keywords: ["Next.js", "Full Stack Web Development"],
  icons:{
    icon:"/images/rajsingh.png"                // Second way- fav icon add (inside metadata icons)     , First way- favicon.ico that image name store in root
  },
  metadataBase: new URL("https://yourdomain.com"),    // metadata Base url set which automatically add in url (below)
  //^  OG tags define that help when we share website in social site so it's show in card format (where og:Url, type, image, title)
  openGraph:{
    title:"Rock Dev",
    description:"Full Stack Web development - Next Js",
    url:"https://yourdomain.com",
    siteName:"Rock Dev",
    images: [
      {
        url:"/og-image.png",      // here metadataBase Url add - https://yourdomain.com/og-image.png 
        width:1200,
        height:630,
        alt:"Rock Dev Logo"
      },
    ],
    type:`website`, 
  },
  // Twitter Tags add
  twitter:{
    card: "summary_large_image",
    title:"Rock Dev",
    description:"Learn Next Js full stack web dev from scratch",
    creator: "@rockdev",
    image: ["/og-image.png"]
  },
}

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
  variable: "--font-work-sans"        // but variable time kebab case use
})


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} ${workSans.variable}`}>   {/*Adding font variable in body tag - here khuch bhi apply nhi hoga ye ab global css m css variable m pass hoga */}
        {children}           {/* All pages will render here */}
      </body>
    </html>
  );
}