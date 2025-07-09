
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



//! 1.App Router - In Next.js(after v13+) for routing we use app router where inside App folder structure, folder create and their page.jsx ui define and Root layout.js(where all page.jsx render pass then show in Ui) 

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


//! 8. Dynamic Route Segments [slug] (only use in Server Component + Access by props.params)

//# A dynamic segment is created by wrapping a folder name in square brackets: [folderName]
//# For example, a blog route could look like: app/blog/[slug]/page.js
//# Here, [slug] is the dynamic segment representing the unique identifier for each blog post.

//# Use Case: When we need a single route with dynamic values — e.g. for user profiles,
//# where the route is the same (e.g. /profile/[id]) but the id changes based on the user. 

//* Nested Dynamic Route Segment (e.g - app/(user)/users/[username]/post/[postId])- create inside Dynamic Route segment folder (e.g - app/(user)/users/[username])


//! 8.1 Catch-all Segments ( [...slug] for dynamic nested routes - it' part of Advance routing) (only use in Server Component + Access by props.params)

//# In Next.js catch-all segments [...slug] are incredibly useful when we want to handle "dynamic nested routes" without having to manually define each level of the path.

//^e.g 1> Blog with Nested Categories - Path eg:  /blog/technology/javascript
// Use Case - we may have blog categories and subcategories:
//            /blog     /blog/technology     /blog/technology/javascript

//* Instead of creating separate [category]/[subcategory]/page.jsx , we can use  app/blog/[...slug]/page.jsx
//* here [...slug] handle category inside multiple subcategory

//^e.g 2> E-commerce Product Catalog - Path e.g:  /shop/clothing/men/shirts
// Use Case - Users can filter or browser products through multiple nested categories.
// File:    app/shop/[...slug]/page.js


//! 8.2 Optional Catch-all Segments [[...slug]]  (only use in Server Component + Access by props.params)
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


//! 9. Dynamic or Nested Route Segments in Client Component - (using React 19 feature use api hook)  [Not Recommended]
//#  use Api hook - use is a React Api that read the value of a resource like a "Promise or context" .
// syntax-  const value = use(resource); 
//? [Not Recommended] Dynamic or Nested Dynamic Route segments Always use in Server Component 


//! 10. What is a "searchParams"? How To use URl Query String ? [In React Server Component]
//# In Next js (especially in App Router), searchParams is an optional prop we can access in server components or via loader functions "to read query parameters directly from the URL".
//# It's extremely useful for building features like Filtering, Sorting, Pagination, Search, Dynamic Deals  -- all of which are essential in e-commerce(ecom) websites.
//# searchParams is a Dynamic API whose values cannot be known ahead of time. Using it will opt the page into "dynamic rendering" at request time.

// it refers to the query string parameters in the URL - like this:
//             /products?category=shoes&sort=price_asc&page=2           (after ? mark all data is query string)

//^ (feature)             (Example URL)                       (what searchParams Enables)
//$ Filtering       /products?category=shoes&brand=nike       Filter product list by category and brand
//$ Sorting         /products?sort=price_asc                  Show result sorted by price, popularity, rating
//$ Pagination      /products?page=3                          Show next page of products
//$ Search          /products?query=red+jacket                Search product by keyword
//$ Dynamic Deals   /products?category=shoes&brand=nike       Show product with discounts over 30%


//! 11. Get Url Data (from Url path) or Handle Url Query String In Client Component In 2 way -
    
   //? 11.1   Using "searchParams" with the help useApi React 19 hook in Client Component
        //#  if React Client Component not page.jsx or it's component use inside server Component at that time we must pass prop.searchParams as a props otherwise it's shows undefined searchParams and throw error

   //? 11.2   Using "useSearchParams hook"{next js hook/method/function} in Client Component   (Recommended way)
          //# useSearchParams is a Client Component hook that lets we read the current URl's query string.


//! 12 Fetch API Data + Url Query String in Different way in Server Component vs Client Component -

   //? 12.1 In React async Server Component - Fetch Api Data direct + if need to get urlQuery string then use props.searchParams 
   //? 12.2 In React Client Component - Fetch Api Data inside useEffect() + if need to get urlQuery string then (1st way)useSearchParams() hook / (2nd way) use(props.searchParams) 

//! 13 loading.js/.jsx/.tsx file- (Automatic Loading show in next.js by using "loading.jsx" file(where Loading component define) inside App Folder)  

//# When Content Not Serve / take time to load in UI / Fetch Data At that time we can show an instant loading state from the server while the content of a route segment streams in.
//# By default, this file is a Server Component - but we can also be used as a Client Component through the "use client" directive.

 //? we can use same loading for all files {where loading.jsx file define in root folder} or Individual Ui loading for individual page.jsx folder {where individual loading.jsx file define inside that particular app folder name }
 // todo_Note -  file name Must be small letter loading.js  and inside function component Name - Loading

// ! 14 <Suspense> fallback - [Part of page/UI loading... show in Server Component]
//# <Suspense> display fallback ui(loading.../loading animation) until it's children have finished loading or not get properly or take time
//# Suspense in Next.js : Load Async Part Only (wrap that component)- so Rest of UI Loads Immediately + fallback ui (together)
//@ Suspense only works for asynchronous child components of the current tree.
//@ But if the parent component itself throws or rejects (because the API call failed in the parent), then the entire tree cannot render, and React has no fallback to show
//@ fetch(...) runs before Suspense even comes into play.
//@ If fetch fails in parent(where suspense define) → Parent cannot render → Suspense never gets mounted → hydration mismatch/error.

//^ For example-
//  Show a loading spinner for just part of the page 
//  Fetch server-side data inside a component(server component)
//  Make our UI feel more responsive without waiting for everything

//? (Best Practice for Lazy loading or handle Async data)
//# In Server component - Use Suspense only when part of UI depends on slow server-side component data.(for Api call , Db queries, Rendering partial layout while data loads)
//todo Note- React.lazy() in server component not supported.

//# In Client component - Use when component is heavy or depends on client-only libraries(e.g charts, maps, modals etc)
//* 1st way> use React.lazy() + Suspense { Pure React style lazy loading} (Not Recommended)
//* 2nd way> next/dynamic()  {Preferred in Next.js , More flexible, Can enable/disable SSR , Works well with 3rd-party libs} 

//! 15.1 Static Page Rendering [SSG] vs 15.2 Dynamic Page Rendering [SSR]  {In Server Component} -
//^ (In Console show)
// ○  (Static)   prerendered as static content
// ƒ  (Dynamic)  server-rendered on demand


  //? Static Page (Default Behavior) / Pre-rendered once at build (SSG)
  //# In Next.js, all routes page are 'static' by default.
  //^ for e.g - 
  //$ Page is generated once during npm run build.
  //$ Doesn't change based on user or request data.
  //$ Loads super fast and can be cached by CDNs.  
  
  //* Note- Static Page Rendering - npm run build time that file show in console with this symbol "o" - that means "static (pre-rendered as static content)" , and after npm run build then npm run start- data which show first time in UI always fixed not change (even after database will change/update/delete that not reflect ) and store in cached {that called static site generation (SSG)/Pre-rendered once at build (SSG)}
  //e.g [console show this]   o rendering/static

  //? Dynamic Page Rendered on Every Request (SSR)
  //# A page becomes dynamic when it depends on data that can change between requests, like:
  //^ for e.g- (page where we use any of this become dynamic page)
  //$ searchParams  (e.g- url query string-  /user?id=rock)
  //$ header() function
  //$ cookies() function
  //$ useSearchParams() or usePathname()
  //$ fetch() with cache : 'no-store' or next:{revalidate:0}
  //$ Or when we manually mark a page (forcefully) as dynamic using (Route segment config):-     export const dynamic = "force-dynamic" ;    
    //* Note- Dynamic Page Rendering - npm run build time that file show in console with this symbol "f" - that means "Dynamic (server rendered on demand)" , and after npm run build then npm run start - data show in UI and constantly update on Every Request when (reload page), and automatically change based on database on Every Request (even after build, when database will change/update/delete that reflect) {that called server side rendering(SSR)}
  //e.g [console show this]   ƒ /rendering/dynamic

  
//! 15.3  Incremental Static Regeneration (ISR)  [auto update/regenerate Static Pages without Rebuild after revalidation period]-
//# Update static content without rebuilding the entire site.
//# Reduce server load by serving pre-rendered, static page for most request.
//# Blend of both worlds: static generation + background revalidation.
//# On-demand revalidation: call res.revalidate('/page') in an API route to refresh specific pages 

//* Note: To convert a static page to use ISR (Incremental Static Regeneration),
// add the following line inside the server component of the static page:

// export const revalidate = 60;  

//^ This means (after build):
// - The cached data will be valid for 60 seconds (1 minute).
// - After that, the next request will trigger a background fetch to get fresh data.
// - During this fetch, stale data is still shown to the user.
// - Once regeneration completes, a page reload will show the updated data.
// - This helps serve pages faster (from cache) and reduces server load.

//e.g [console show this npm run build time]   o rendering/ISR       //^ that o means pre-rendered static content           


//$ Summary Table -
//| Strategy            | When to Use                                |   Next.js Highlights                                             | 
//| ------------------- | ------------------------------------------ | ---------------------------------------------------------------  |
//| Static (SSG)        | Stable content, marketing, docs            | Parallel builds, edge caching, hydration                         |
//| Dynamic (SSR)       | User-specific or real-time data            | Use server props or `cookies()` APIs; controlled by `dynamic`flag|
//| ISR                 | Frequently updated content, but cacheable  | Per-page `revalidate`, on-demand API revalidation                |
//| PartialPre-Rendering| Mixed static & dynamic content on one page | Components inside Suspense for dynamic zones                     |

//$ Best Practices in Next.js 15 (For Server component) -
//? 🔹 Static Pages (SSG):
// - Use static rendering by default for speed and simplicity.
// - Best for pages with content that doesn’t change often.
// - Example: Static Routes in the App Router. (e.g. /about) – fast & simple

//? 🔹 Dynamic Pages (SSR):
// - Use Server-Side Rendering when you need real-time, user-specific, or authenticated data.
// - Example: Dynamic Routes with SSR. , Use for dynamic data like /dashboard or /profile – real-time/authenticated.

//? 🔹 ISR (Incremental Static Regeneration):
// - Use ISR to keep static pages up-to-date without needing a full rebuild.
// - It combines the performance of static pages with the freshness of dynamic content.
// - Example:Use for static pages that need updates(ISR+SSG) (e.g. /blog) – `export const revalidate = 60`..

//? 🔹 PPR (Partial Pre-Rendering) + Suspense:
// - Blend Combine static and dynamic rendering on the same page for better performance.
// - Use `Suspense` to load dynamic parts without blocking the static ones.
// - Great for improving performance while handling dynamic data.
// - Use for mixed content pages (e.g. /product/[id]) – show static shell, load dynamic parts.




