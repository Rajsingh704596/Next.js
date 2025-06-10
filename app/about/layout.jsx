export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <h3>
          About Layout page - this layout page show only about router path{" "}
        </h3>
        {children}
      </body>
    </html>
  );
}
