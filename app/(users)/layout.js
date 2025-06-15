//! Root Layout - jitne bhi page.jsx/page.tsx hai wo Root layout se hokar(children basis pr) browser ui m show hota hai

import Navigation from "@/Components/Navigation";
import '../globals.css';
import {Roboto} from "next/font/google";              // Roboto font import from google font using next/font
import { Work_Sans } from "next/font/google";
import { Roboto_Flex } from "next/font/google";       // variable font Roboto_Flex import

// Font Loader call and store in variable
const roboto = Roboto ({
  subsets : ["latin"],
})


// If Fonts have 2 or more word than call like this (in Snake_case format)-  //^ Non-Variable Font (Work Sans)
const workSans = Work_Sans({
  weight  : '600',           // Required for non-variable fonts (weight or style)
  subsets : ["latin-ext"],
  style : "italic"
})

// Variable Font (Roboto Flex)
const robotoFlex = Roboto_Flex({
  subsets: ["cyrillic"],
  variable: '--font-roboto-flex', // Required for variable fonts
  display: 'swap',    // Optional: for prevent FOIT (Flash of Invisible Text) and Text load fast 
});


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>        {/* In body, roboto font-family access like by roboto variable , Note - Roboto is non-variable font */}
           <h1 className={workSans.className}>Font Check (Work Sans - Non-Variable)</h1>              {/*Word Sans font apply on this heading using variable font */}
           <h2 className={robotoFlex.className}>Variable Font : Roboto_Flex</h2>
        <Navigation/>
        {children}
     
      </body>
    </html>
  );
}



//! 1.App Router - In Next.js(after v13+) for routing we use app router where inside App folder structure, folder create and their page.jsx ui define

//! 2.Route Group- (it's not affect the final URL path)
//? In Next.js App Router, Router Groups are way to organize our routes without affecting the URL structure.
//? This helps separate pages logically (like admin, user, auth) without showing these groups in the final route path.
//^ Usecase - Defining multiple root layouts.

//* e.g -  users folder ko rename karege (Route Group) banane k liye : (users) 

// In short Route groups ek aisa folder hota hain jinka naam bracket m diya jata hai , ye folder url path m appear nhi hota hai , but here only users folder ko bracket m close kiya hai admin ko nhi isliye usse access karne k liye url path m admin likhna padega , and dono k root layout bhi different hai

//! Font Optimization - next/font used     
//# next/font automatically optimize font , it's built in self-hosting for any font file, so we can optimally load web fonts(no required to  send request for third party font)   

//# import it from next/font/local or next/font/google

//? What is Subset in next/font ?
//# A subset in fonts refers to a specific "group of characters(glyphs)" based on a language or script.
//* e.g-
//$ Latin - includes basic "English and Western European characters".
//$ Cyrillic - includes characters for Russian, Bulgarian, etc.
//$ Arabic -includes Arabic script.
//$ Greek, Hebrew, etc.
 //^ Advantage -  Instead of downloading all possible characters in every script, we specify the subsets we need, this:
 // Reduces the font file size
 // Improves performance and loading times
 // Makes the font more focused on our audience's language  

 //? Why Weight Property is Not Required in next/font when used variable font ?
 // when we use variable font , weight (default-400), style also automatically add. (e.g- "Roboto_Flex" )
 // Next.js recommended using variable fonts for the best performance and flexibility.
 // But if we not use variable font, we will need to specify a weight, style. (e.g- "Roboto","Word Sans" )


 