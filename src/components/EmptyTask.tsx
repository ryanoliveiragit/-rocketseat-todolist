import styles from "./Emptytask.module.css";

export default function EmptyTask() {
  return (
    <div className={styles.container}>
      <div>
        <img src="https://media.tenor.com/J3RtD7O0Qy4AAAAM/mamberroi-jr-grand-m.gif" alt="icone de tarefa" />
        <h1 className={styles.title}>Você ainda não tem atividades cadastradas</h1>
        <h1 className={styles.subTitle}>Crie tarefas e organize seus itens a fazer</h1>
      </div>
    </div>
  );
}
