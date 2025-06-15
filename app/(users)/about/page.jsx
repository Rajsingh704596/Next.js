import styles from "./about.module.css";
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
