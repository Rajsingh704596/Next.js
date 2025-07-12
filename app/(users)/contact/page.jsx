import React from "react";

//^ metadata obj. create for contact page , next js handle this obj automatically
export const metadata = {
  title: "Contact page", // title show when this page load
  description: "description for contact page",
  authors: [{ name: "Raj Dev" }, { name: "Rock Dev", url: "google.com" }],
  keywords: ["nextjs", "reactjs", "fullstack"],
};

const Contact = () => {
  return (
    <div>
      Contact page (Using App router contact path create where contact page
      show)
    </div>
  );
};

export default Contact;
