import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import styles from "./CreateNewTask.module.css";
import EmptyTask from "./EmptyTask";
import Task from "./Task";
import { IoIosAdd } from "react-icons/io";
import { DaysContTask } from "./DaysContTask";

export default function CreateNewTask() {
  const [selectedDay, setSelectedDay] = useState<string>("2025-01-07");
  const [tasksForDay, setTasksForDay] = useState<any[]>([]);

  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    // Carregar as tarefas do dia selecionado do localStorage
    const storedTasks = localStorage.getItem(`tasks-${selectedDay}`);
    if (storedTasks) {
      setTasksForDay(JSON.parse(storedTasks));
    } else {
      // Se não houver tarefas, cria as 4 tarefas iniciais
      const initialTasks = [
        { id: 1, content: "Treino + alimentação", isComplete: false },
        { id: 2, content: "Hidratação", isComplete: false },
        { id: 3, content: "Atividade mental", isComplete: false },
        { id: 4, content: "Incentivo (Bônus)", isComplete: false, bonus: true }
      ];
      setTasksForDay(initialTasks);
      // Salvar as tarefas iniciais no localStorage
      localStorage.setItem(`tasks-${selectedDay}`, JSON.stringify(initialTasks));
    }
  }, [selectedDay]); // Quando o dia selecionado mudar, carregue as tarefas correspondentes

  const handleAddTodoList = (event: FormEvent) => {
    event.preventDefault();

    const newTaskData = {
      id: Number(Math.floor(Math.random() * 1000)),
      content: newTask,
      isComplete: false,
    };

    const updatedTasks = [...tasksForDay, newTaskData];
    setTasksForDay(updatedTasks);

    // Salvar as tarefas no localStorage para o dia selecionado
    localStorage.setItem(`tasks-${selectedDay}`, JSON.stringify(updatedTasks));

    setNewTask(""); // Limpar o campo de input
  };

  const handleNewTaskChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.target.setCustomValidity("");

    const value = event.target.value;

    if (value.match(/^\s+$/)) {
      event.preventDefault();
      event.target.setCustomValidity("Não é permitido somente espaços");
    } else {
      setNewTask(value);
    }
  };

  const handleUpdateTask = (id: number, isComplete: boolean) => {
    const updatedTasks = tasksForDay.map((task) =>
      task.id === id ? { ...task, isComplete } : task
    );
    setTasksForDay(updatedTasks);

    // Salvar as tarefas atualizadas no localStorage
    localStorage.setItem(`tasks-${selectedDay}`, JSON.stringify(updatedTasks));
  };

  const deleteTask = (content: string) => {
    // Remover a tarefa com base no conteúdo
    const updatedTasks = tasksForDay.filter((task) => task.content !== content);
    setTasksForDay(updatedTasks);

    // Salvar as tarefas restantes no localStorage
    localStorage.setItem(`tasks-${selectedDay}`, JSON.stringify(updatedTasks));
  };

  const handleNewTaskEmpty = newTask.length === 0;

  return (
    <div className={styles.container}>
      <form className={styles.formInput} onSubmit={handleAddTodoList}>
        <input
          className={styles.inputCreateNewTask}
          placeholder="Adicione uma atividade"
          type="text"
          value={newTask}
          onChange={handleNewTaskChange}
        />
        <button
          onClick={handleAddTodoList}
          className={styles.buttonCreateNewTask}
          type="submit"
          disabled={handleNewTaskEmpty}
        >
          Adicionar
          <IoIosAdd size={23} />
        </button>
      </form>

      <section>
        <DaysContTask
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
          setTasksForDay={setTasksForDay}
        />
      </section>

      <section className={styles.containerList}>
        {tasksForDay.length > 0 ? (
          <ul>
            {tasksForDay.map((todo) => (
              <Task
                key={todo.id}
                onDeleteTask={deleteTask} // Passando a função de exclusão
                content={todo.content}
                isComplete={todo.isComplete}
                handleUpdateTask={handleUpdateTask}
                id={todo.id}
              />
            ))}
          </ul>
        ) : (
          <EmptyTask />
        )}
      </section>
    </div>
  );
}
