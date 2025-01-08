import LocalStorageState from "use-local-storage-state"; // Corrigido o nome do hook
import styles from "./Header.module.css";
import { FaLinkedin } from "react-icons/fa";

export default function Header() {
  const startDate = new Date(2025, 0, 7); // 7 de janeiro de 2025
  const endDate = new Date(2025, 1, 8); // 8 de fevereiro de 2025

  const days: any[] = [];
  for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
    days.push(new Date(date));
  }

  // Gerenciar o valor do contador de tarefas concluídas com localStorage
  const [countCompleteTask, setCountCompleteTask] = LocalStorageState<number>("checkedCount", {
    defaultValue: 0, // Defina o valor inicial como 0
  });

  // Gerenciar o valor do contador de bônus com localStorage
  const [countBonus, setCountBonus] = LocalStorageState<number>("checkedCountBonus", {
    defaultValue: 0, // Defina o valor inicial como 0
  });

  // Calcular o total de pontos (tarefas concluídas + bônus)
  const calculatePoints = () => {
    let totalTasks = 0;

    // Para cada dia, verifica as tarefas e conta as concluídas
    days.forEach((day) => {
      const storedTasks = localStorage.getItem(`tasks-${day.toISOString().split("T")[0]}`);
      if (storedTasks) {
        const tasks = JSON.parse(storedTasks);
        tasks.forEach((task: any) => {
          if (task.isComplete) {
            totalTasks += 1;
          }
        });
      }
    });

    // Adiciona o bônus ao total de tarefas
    const totalPoints = totalTasks + countBonus;
    setCountCompleteTask(totalTasks); // Armazena as tarefas concluídas
    return totalPoints;
  };

  const totalPoints = calculatePoints();

  return (
   <>
    <span className={styles.creditos}> <FaLinkedin style={{
      marginTop: '1px'
    }}/> <a href="https://www.linkedin.com/in/ryan-oliveira-169a371a4/" target="_blank">@ryanvs</a></span>
    <header className={styles.header}>
     
      <div>
        <h1 className={styles.do}>#DesafioTechMaromba</h1>
      </div>
      <div className={styles.count}>
        <span>
          Pontos totais: <strong className={styles.totalCount}>{totalPoints}</strong>
        </span>
      </div>
    </header>
    </>
  );
}
