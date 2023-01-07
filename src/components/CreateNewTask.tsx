import React, { FormEvent, useState } from "react"
import styles from './CreateNewTask.module.css'
import Task from "./Task";


export default function CreateNewTask(){

    const [task, setTask] = useState('');
    //task = valor inicial do input
    //setTask = para controlar esse valor inicial

    const [todoList, setTodoList] = useState<string[]>([]);
    //aqui vamos definir que o todoList é um array de strings
    //setTodoList é para controlar esse array

    function handleAddTodoList(event: FormEvent) {
    //quando o formulario for enviador (onsubmit do form)
        event.preventDefault();
    //não vamos recarregar a pagina, vamos manter ela sem refresh
        setTodoList((oldTodoList) => [...oldTodoList, task]);
    //vamos setar dentro do nosso todolist (usamos o set pra contrar o estado)
    //vamos pegar todos valores anterior do todolist e vamos adicionar mais uma task dentro do nosso array(todoList)
        setTask('')
    }

    return (
        <div className={styles.container}>

            <form onSubmit={handleAddTodoList}> {/* onsubmit = quando o formulario for enviador */}

                <input
                    placeholder="Adicione uma tarefa"
                    type="text" 
                    value={task}  //aqui vamos pegar o valor do input
                    onChange={(event) => setTask(event.target.value)} // utilizado para que seja realizada determinada ação após alguma mudança.
                />

                <button type="submit">Adicionar</button> {/* aqui vamos usar o submit */}
            
            </form>

            <ul>
                {todoList.map((todo) => //vamos pegar o todoList que adicionamos as taks dentro
                    <Task>{todo}</Task> //vamos passar um map pra dentro dele e mostrar na tela todos
                //os items que estão dentro do todolist.
                )}             
            </ul>
        </div>
    )
}