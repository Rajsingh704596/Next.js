
import Navigation from "@/Components/Navigation";
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
    <>
    {/* Note - html or body tag only use root layout for prevent Hydration Error  */}

      {/* <body className={roboto.className}>        In body, roboto font-family access like by roboto variable , Note - Roboto is non-variable font */}           {/*ab ye work nhi karega kyuki global layout m body define kiya hai */}
 
        {/*  <h1 className={workSans.className}>Font Check (Work Sans - Non-Variable)</h1>  */}            {/*Word Sans font apply on this heading using variable font */}
        {/*  <h2 className={robotoFlex.className}>Variable Font : Roboto_Flex</h2>   */}  
        <Navigation/>    
        <div className="pt-20">
        {children}               {/*All page render which inside about folder */}
        </div> 
     
   </>
   
  );
}



//! 1.App Router - In Next.js(after v13+) for routing we use app router where inside App folder structure, folder create and their page.jsx ui define

//! 2.Route Group- (it's not affect the final URL path)
//? In Next.js App Router, Router Groups are way to organize our routes without affecting the URL structure.
//? This helps separate pages logically (like admin, user, auth) without showing these groups in the final route path.
//^ Usecase - Defining multiple root layouts.

//* e.g -  users folder ko rename karege (Route Group) banane k liye : (users) 

// In short Route groups ek aisa folder hota hain jinka naam bracket m diya jata hai , ye folder url path m appear nhi hota hai , but here only users folder ko bracket m close kiya hai admin ko nhi isliye usse access karne k liye url path m admin likhna padega , and dono k root layout bhi different hai

//! 3.Global Css vs Css Module

//! 4.Image Component with diff. property & SEO benefits

//! 5.Font Optimization - next/font used     
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

//! 6.Add Metadata, Fav Icon, OG Tags, Twitter cards (It helps for SEO and Web shareability(show image card in social media when share website link) ) -
//# two default meta tag are always add if route doesn't define metadata (meta charset tag , meta viewport tag) .
//# Metadata object we add all data (meta data , fav icon, Og (open Graph) tag, Twitter tag) , this object we can define in Root Layout, any individual Page or layout .

//! 7. React Server Component(backend part here)  v/s Client Component (React-Frontend part here)
//# By default Inside App folder all files is server component , except one file that is error.js

 //* when use Client Components when you need:  
    //  State and event handlers. E.g. onClick, onChange.
    //  Lifecycle logic. E.g. useEffect.
    //  Browser-only APIs. E.g. localStorage, window, Navigator.geolocation, etc.
    //  Custom hooks.

 //* Use Server Components when you need:
    // Fetch data from databases or APIs close to the source.
    // Use API keys, tokens, and other secrets without exposing them to the client. (means browser pr client side network tab m api key or other variable show nhi hote hai kuyki wo directly server per phle render hoke then client pr show hota hai )
    // Reduce the amount of JavaScript sent to the browser.
    // Improve the First Contentful Paint (FCP), and stream content progressively to the client.   


//! 8. Dynamic Route Segments [slug] (only use in Server Component )

//# A dynamic segment is created by wrapping a folder name in square brackets: [folderName]
//# For example, a blog route could look like: app/blog/[slug]/page.js
//# Here, [slug] is the dynamic segment representing the unique identifier for each blog post.

//# Use Case: When we need a single route with dynamic values — e.g. for user profiles,
//# where the route is the same (e.g. /profile/[id]) but the id changes based on the user. 

//* Nested Dynamic Route Segment (e.g - app/(user)/users/[username]/post/[postId])- create inside Dynamic Route segment folder (e.g - app/(user)/users/[username])


//! 8.1 Catch-all Segments ( [...slug] for dynamic nested routes - it' part of Advance routing)

//# In Next.js catch-all segments [...slug] are incredibly useful when we want to handle "dynamic nested routes" without having to manually define each level of the path.

//^e.g 1> Blog with Nested Categories - Path eg:  /blog/technology/javascript
// Use Case - we may have blog categories and subcategories:
//            /blog     /blog/technology     /blog/technology/javascript

//* Instead of creating separate [category]/[subcategory]/page.jsx , we can use  app/blog/[...slug]/page.jsx
//* here [...slug] handle category inside multiple subcategory

//^e.g 2> E-commerce Product Catalog - Path e.g:  /shop/clothing/men/shirts
// Use Case - Users can filter or browser products through multiple nested categories.
// File:    app/shop/[...slug]/page.js


//! 8.2 Optional Catch-all Segments [[...slug]]
//# Catch-all Segments can be made optional by including the parameter in double square brackets: [[...folderName]].

// For example, app/shop/[[...slug]]/page.js will also match /shop, in addition to /shop/clothes, /shop/clothes/tops, /shop/clothes/tops/t-shirts.

//? Diff. b/w Catch-All Segments and Optional Catch-All Segments -
//^ [...slug]  Catch-all segments
//  At least 1 slug required (e.g. /blog/a, /blog/a/b)
//  Does NOT match /blog   , if slug not present it's show 404 error
//  params.slug = ['a', 'b']

//^ [[...slug]]  Optional catch-all segments
//  0 or more slugs allowed (e.g. /blog, /blog/a, /blog/a/b)
//  Matches /blog also    ,   if slug not present default page show (like all posts) and deeper slugs to show details
//  params.slug = undefined | ['a'] | ['a', 'b']            

