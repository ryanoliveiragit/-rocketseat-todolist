import { CheckCircle, Check, Trash } from "phosphor-react";
import style from "./Task.module.css";

interface TaskProps {
  content: string;
  isComplete: boolean;
  onDeleteTask: (content: string) => void;
  handleUpdateTask: (id: number, isComplete: boolean) => void;
  id: number;
}

export default function Task({
  content,
  isComplete,
  onDeleteTask,
  handleUpdateTask,
  id,
}: TaskProps) {
  // Utilizando o isComplete diretamente, sem estado local isChecked
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleUpdateTask(id, e.target.checked);
  };

  function handleDeleteTask() {
    onDeleteTask(content); // Excluindo a tarefa pelo conteúdo
  }

  return (
    <div>
      <div className={style.task}>
        <div className={style.checkbox}>
          <label className={style.container}>
            <p className={isComplete ? style.checked : ""}>{content}</p>
            <input
              checked={isComplete}
              onChange={handleOnChange}
              type="checkbox"
              id={`check-${id}`} // Alterado para usar id único
              className={style.checkbox}
              name="check"
            />
            <span className={style.check}></span>
          </label>
          <button className={style.deleteTask} onClick={handleDeleteTask}>
            <Trash className={style.svg} size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}
