// Root Layout
import Navigation from "@/Components/Navigation";
import '../globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="p-5">
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



 