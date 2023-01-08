import React, { FormEvent, InvalidEvent, useState } from "react"
import styles from './CreateNewTask.module.css'
import Task from "./Task";


export default function CreateNewTask(){

    const [newTodoText, setnewTodoText] = useState('')
    //task = valor inicial do input
    //setTask = para controlar esse valor inicial

    const [task, setTask] = useState([
        {
            content: 'task',
            id: String(Math.floor(Math.random() * 1000)),
            isComplete: false,
        },
    ]);
    //aqui vamos definir que o todoList é um array de strings
    //setTodoList é para controlar esse array

    function handleAddTodoList(event: FormEvent) {
    //quando o formulario for enviador (onsubmit do form)
        event.preventDefault();

        const newTask = {
            id: String(Math.floor(Math.random() * 1000)),
            content: newTodoText,
            isComplete: false,
          };
    //não vamos recarregar a pagina, vamos manter ela sem refresh
        setTask((oldTodoList) => [...oldTodoList, newTask]);
    //vamos setar dentro do nosso todolist (usamos o set pra contrar o estado)
    //vamos pegar todos valores anterior do todolist e vamos adicionar mais uma task dentro do nosso array(todoList)
    setnewTodoText('')
    }

    const handleNewTaskEmpty = task.length === 0

    return (
        <div className={styles.container}>

            <form className={styles.formInput} onSubmit={handleAddTodoList}> {/* onsubmit = quando o formulario for enviador */}

                <input
                    className={styles.inputCreateNewTask}
                    placeholder="Adicione uma tarefa"
                    type="text"
                    value={newTodoText}  //aqui vamos pegar o valor do input
                    onChange={(event) => setnewTodoText(event.target.value)} // utilizado para que seja realizada determinada ação após alguma mudança.
                />

                <button 
                    onClick={handleAddTodoList}
                    className={styles.buttonCreateNewTask} type="submit" 
                    disabled={handleNewTaskEmpty}>
                        Criar
                    <img 
                        src="https://cdn.discordapp.com/attachments/1061025601240186921/1061085385612079174/Layer_1.png"
                        alt="Icone de adiionar" /> 
                </button> {/* aqui vamos usar o submit */}
            
            </form>

            <section className={styles.containerList}>
                <div className={styles.containerTaskCounts}>
                    <div>
                        <p>Tarefas criadas</p>
                        <p className={styles.countTask}>{task.length}</p>
                    </div>
                    <div>
                        <p>Concluídas </p>
                        <p className={styles.countTask}>0</p>
                    </div>
                </div>
            <ul>
                {task.map((todo) => //vamos pegar o todoList que adicionamos as taks dentro
                    <Task
                    key={todo.id}
                    isComplete={todo.isComplete}
                    content={todo.content}
                  />//vamos passar um map pra dentro dele e mostrar na tela todos
                //os items que estão dentro do todolist.
                )}             
            </ul>
            </section>
        </div>
    )
}