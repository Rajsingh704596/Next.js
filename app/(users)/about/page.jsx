import styles from "./about.module.css";

//^ metadata obj. create for about page , next js handle this obj automatically
export const metadata = {
  title: "About page", // title show when this page load
  description: "description for about page",
  authors: [{ name: "Raj Dev" }, { name: "Rock Dev", url: "google.com" }],
  keywords: ["nextjs", "reactjs", "fullstack"],
};

const about = () => {
  return (
    <div>
      <h1 className={styles.heading_title}>about page inside App router</h1>
      <p className="font-roboto">How are you to all</p>
      {/*font-roboto css variable used in tailwind css */}
    </div>
  );
};

export default about;
