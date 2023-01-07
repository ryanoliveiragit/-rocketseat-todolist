import React, { ChangeEvent, FormEvent, InvalidEvent, useState } from "react"
import styles from './Tarefa.module.css'


export default function Tarefa(){
    const [task, setTask] = useState('');
    const [todoList, setTodoList] = useState<string[]>([]);

    console.log(todoList)

    function handleAddTodoList(event: FormEvent) {
        event.preventDefault();
        setTodoList((oldTodoList) => [...oldTodoList, task]);
        setTask('')

    }

    return(
        <div className={styles.container}>
            <form onSubmit={handleAddTodoList}>
                <input
                    type="text" 
                    value={task}
                    onChange={(event) => setTask(event.target.value)}
                />
                <button type="submit">Adicionar</button>
            </form>

            <ul>
                {todoList.map((todo) => 
                    <li>{todo}</li>
                )}
            </ul>
        </div>
    )
}