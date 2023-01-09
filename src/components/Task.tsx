import { useState } from "react";
import style from "./Task.module.css";
import { RadioButton, Check, Trash } from "phosphor-react";

interface TaskProps {
  content: string;
  isComplete: any;
  onDeleteTask: (content: string) => void;
}

export default function Task({ content, onDeleteTask, isCompleteCheckout }: TaskProps) {
  const [isChecked, setIsChecked] = useState(false)

  const handleOnChange = () => {
    setIsChecked(!isChecked)
  }

  function handleDeleteTaks(){
    onDeleteTask(content)
  }
  
  function chekedss (isCompleteCheckout){
    isCompleteCheckout = isChecked
    return isCompleteCheckout
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
            value={chekedss}
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
