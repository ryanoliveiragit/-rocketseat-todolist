import { useState } from "react";
import style from "./Task.module.css";
import { RadioButton, Check, Trash } from "phosphor-react";

interface TaskProps {
  content: string;
  isComplete: boolean;

}

export default function Task({ content, isComplete }: TaskProps) {
  const [isChecked, setIsChecked] = useState(false)

  const handleOnChange = () => {
    setIsChecked(!isChecked)
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
        </div>
      </div>
    </div>
  );
}
