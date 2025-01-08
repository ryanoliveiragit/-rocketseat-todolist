import { useState, useEffect } from "react";
import { IoIosCheckmark } from "react-icons/io"; // Importando o ícone de check
import styles from "./DaysContTask.module.css";

interface Task {
  isComplete: boolean;
}

interface DaysContTaskProps {
  selectedDay: string;
  setSelectedDay: React.Dispatch<React.SetStateAction<string>>;
  setTasksForDay: React.Dispatch<React.SetStateAction<Task[]>>;
}

export const DaysContTask = ({
  selectedDay,
  setSelectedDay,
  setTasksForDay,
}: DaysContTaskProps) => {
  const startDate = new Date(2025, 0, 7); // 7 de janeiro de 2025
  const endDate = new Date(2025, 1, 8); // 8 de fevereiro de 2025

  const days: Date[] = [];
  for (
    let date = new Date(startDate);
    date <= endDate;
    date.setDate(date.getDate() + 1)
  ) {
    days.push(new Date(date));
  }

  const [tasksForDay, setTasksForDayState] = useState<Task[]>([]); // Para armazenar as tarefas do dia
  const [completedDays, setCompletedDays] = useState<Set<string>>(new Set()); // Armazena os dias completos

  // Verifica se todas as tarefas de um dia estão completas
  const areAllTasksCompleted = (tasks: Task[]): boolean => {
    return tasks.length > 0 && tasks.every((task) => task.isComplete === true);
  };

  useEffect(() => {
    // Verifica as tarefas de todos os dias quando o componente for montado
    const checkTasksCompletion = () => {
      const updatedCompletedDays = new Set<string>();
  
      days.forEach((day) => {
        const storedTasks = localStorage.getItem(`tasks-${day.toISOString().split("T")[0]}`);
        if (storedTasks) {
          const tasks: Task[] = JSON.parse(storedTasks);
          if (areAllTasksCompleted(tasks)) {
            updatedCompletedDays.add(day.toISOString().split("T")[0]);
          }
        }
      });
  
      // Só atualiza o estado se houver alguma mudança
      if (updatedCompletedDays.size !== completedDays.size || 
          ![...updatedCompletedDays].every(day => completedDays.has(day))) {
        setCompletedDays(updatedCompletedDays);
      }
    };
  
    checkTasksCompletion();
  }, [days, completedDays]); 

  return (
    <section className={styles.container}>
      <div className={styles.daysContainer}>
        {days.map((day, index) => {
          // Verifica se o dia atual já está concluído (ícone de check)
          const isCompleted = completedDays.has(day.toISOString().split("T")[0]);
          const isSelectedDay = selectedDay === day.toISOString().split("T")[0];

          return (
            <div
              key={index}
              className={`${styles.dayBall} ${isCompleted ? styles.completed : ''} ${isSelectedDay ? styles.selected : ''}`}
              onClick={() => {
                setSelectedDay(day.toISOString().split("T")[0]);
                const storedTasks = localStorage.getItem(`tasks-${day.toISOString().split("T")[0]}`);
                if (storedTasks) {
                  const tasks = JSON.parse(storedTasks);
                  setTasksForDay(tasks);
                }
              }}
            >
              {isCompleted ? <IoIosCheckmark size={20} /> : day.getDate()} {/* Exibe o ícone de check ou o dia */}
            </div>
          );
        })}
      </div>
    </section>
  );
};
