import { useState } from "react";
import style from "./Task.module.css";
import { CheckCircle, Check, Trash } from "phosphor-react";

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
    <div>
      <div className={style.task}>
        <div className={style.checkbox}>
          <label className={style.container}>
          <p className={isChecked ? style.checked : ''}>{content}</p>
          <input
            checked={isChecked}
            onChange={handleOnChange}
            type="checkbox"
            id="check1"
            className={style.checkbox}
            name="check"
          />
          <span className={style.check}></span>
          </label>
          <button className={style.deleteTask} onClick={handleDeleteTaks}><Trash className={style.svg} size={24}/></button>
        </div>
      </div>
    </div>
  );
}
