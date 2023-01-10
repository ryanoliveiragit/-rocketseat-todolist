import styles from "./Emptytask.module";

export default function EmptyTask() {
  return (
    <div className={styles.container}>
      <div>
        <img src="https://cdn.discordapp.com/attachments/695348516918263819/1062445751915008201/Clipboard.png" alt="icone de tarefa" />
        <h1 className={styles.title}>Você ainda não tem tarefas cadastradas</h1>
        <h1 className={styles.subTitle}>Crie tarefas e organize seus itens a fazer</h1>
      </div>
    </div>
  );
}
