import { useState } from "react";
import style from "./Task.module.css";
import { RadioButton, Check, Trash } from "phosphor-react";

interface TaskProps {
  content: string;
  isComplete: any;
  onDeleteTask: (content: string) => void;
  handleUpdateTask: any
  id: number;
}

export default function Task({ content, onDeleteTask,  handleUpdateTask, id }: TaskProps) {
  const [isChecked, setIsChecked] = useState(false)

  const handleOnChange = (e: any) => {
    setIsChecked(!isChecked)
    handleUpdateTask(id, e.target.checked);
  }

  function handleDeleteTaks(){
    onDeleteTask(content)
  }

  return (
    <div className={style.container}>
      <div className={style.task}>
        <div className={style.checkbox}>
          <input
            checked={isChecked}
            onChange={handleOnChange}
            type="checkbox"
            id="check1"
            className={style.checkbox}
            name="check"
          />
          <label>
            <p className={isChecked ? style.checked : ''}>{content}.</p>
          </label>
          <button onClick={handleDeleteTaks}>excluir</button>
        </div>
      </div>
    </div>
  );
}
