import style from './Task.module.css'

interface TaskProps {
    children: string;
}

export default function Task({children}:TaskProps) {
    return(
        <div className={style.task}>{children}</div>
    )
}