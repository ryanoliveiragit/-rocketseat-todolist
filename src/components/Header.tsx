import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div>
      <img
        src="https://cdn.discordapp.com/attachments/1061025601240186921/1061044027069300817/Layer_2.png"
        alt="to-do list Logotipo"
      />
        <h1 className={styles.to}>to</h1>
        <h1 className={styles.do}>do</h1>
      </div>
    </header>
  );
}
