import { useState } from "react";
import style from "./Task.module.css";
import { RadioButton, Check, Trash } from "phosphor-react";

interface TaskProps {
  content: string;
  onDeleteTask: (content: string) => void;
}

export default function Task({ content, onDeleteTask }: TaskProps) {
  const [isChecked, setIsChecked] = useState(false)

  const handleOnChange = (e: { target: { checked: any; }; }) => {
    setIsChecked(!isChecked)
  }

  function handleDeleteTaks(){
    onDeleteTask(content)
  }
  

  return (
    <div className={style.container}>
      <div className={style.task}>
        <div className={style.checkbox}>
          <input
            value="checkbox"
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
