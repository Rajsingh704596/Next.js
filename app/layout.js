
import Navigation from "@/Components/Navigation";
import './globals.css';

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
