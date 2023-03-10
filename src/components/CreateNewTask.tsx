import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import styles from "./CreateNewTask.module.css";
import EmptyTask from "./EmptyTask";
import Task from "./Task";

export default function CreateNewTask() {
  const [task, setTask] = useState([
    {
      id: 1,
      content: "NewTask",
      isComplete: false,
    },
  ]);

  const [inputCheckedCount, setInputCheckedCount] = useState(0);

  useEffect(() => {
    function countInputChecked() {
      const filterInputs = task.filter((input) => input.isComplete === true);
      setInputCheckedCount(filterInputs.length);
    }
    countInputChecked();
  }, [task]);

  const [newTask, setNewTask] = useState("");

  function handleAddTodoList(event: FormEvent) {
    const NewTaskContent: {
      id: number;
      content: string;
      isComplete: boolean;
    } = {
      id: Number(Math.floor(Math.random() * 1000)),
      content: newTask,
      isComplete: false,
    };
    event.preventDefault();
    setTask((oldTodoList) => [...oldTodoList, NewTaskContent]);
    setNewTask("");
  }

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity("");

    const value = event.target.value;

    if (value.match(/^\s+$/)) {
      event.preventDefault();
      event.target.setCustomValidity("Não é permitido somente espaços");
    } else {
      setNewTask(value);
    }
  }

  function handleUpdateTask(id: number, isComplete: boolean) {
    setTask((prevTask) =>
      prevTask.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            isComplete,
          };
        }
        return task;
      })
    );
  }

  function deleteTask(deletedTodo: string) {
    const filterTodos = task.filter((todo) => todo.content !== deletedTodo);
    setTask(filterTodos);
  }

  const handleNewTaskEmpty = newTask.length === 0;

  return (
    <div className={styles.container}>
      <form className={styles.formInput} onSubmit={handleAddTodoList}>
        <input
          className={styles.inputCreateNewTask}
          placeholder="Adicione uma tarefa"
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
          Criar
          <img
            src="https://cdn.discordapp.com/attachments/1061025601240186921/1061085385612079174/Layer_1.png"
            alt="Icone de adiionar"
          />
        </button>
      </form>

      <section className={styles.containerList}>
        <div className={styles.containerTaskCounts}>
          <div>
            <p>Tarefas criadas</p>
            <p className={styles.countTask}>{task.length}</p>
          </div>
          <div>
            <p className={styles.concluida}>Concluídas </p>
            <p className={styles.countTask}>
              {inputCheckedCount} de {task.length}
            </p>
          </div>
        </div>
        {task.length > 0 ? (
          <ul>
            {task.map((todo) => (
              <Task
                key={todo.id}
                onDeleteTask={deleteTask}
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
