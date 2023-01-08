import React, { FormEvent, InvalidEvent, useState } from "react"
import styles from './CreateNewTask.module.css'
import Task from "./Task";


export default function CreateNewTask(){

    const [selectedCount, setSelectedCount] = useState(0);

    const updateSelectedCount = (isChecked: boolean) => {
        if (isChecked) {
            setSelectedCount (selectedCount + 1);
        } else {
            setSelectedCount (selectedCount - 1 );
        }
    }


    const [newTodoText, setnewTodoText] = useState('')
    //newTodoText = valor inicial do input
    //setnewTodoText = para controlar esse valor inicial

    const deleteTask = ({taskToDelete, ischeched}:any) => {
        const updatedTasks = [...task];

        if(selectedCount > 0) {
            setSelectedCount (selectedCount -1);
        }

        updatedTasks.splice(taskToDelete, 1)
        setTask(updatedTasks )
     }
     
    const [task, setTask] = useState([
        {
            content: 'task',
            id: String(Math.floor(Math.random() * 1000)),
            //isComplete: false,
        },
    ]);
    //aqui vamos definir que o task é um array
    //setTask é para controlar esse array

    function handleAddTodoList(event: FormEvent) {
    //quando o formulario for enviador (onsubmit do form)
        event.preventDefault();
    
        const newTask = {
            id: String(Math.floor(Math.random() * 1000)),
            content: newTodoText,
            isComplete: false,
          };
        setTask((oldTodoList) => [...oldTodoList, newTask]);
    //vamos setar dentro do nosso todolist (usamos o set pra contrar o estado)
    //vamos pegar todos valores anterior do todolist e vamos adicionar mais uma task dentro do nosso array(todoList)
    setnewTodoText('')
    }

    const handleNewTaskEmpty = newTodoText.length === 0

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
                        <p className={styles.countTask}> {selectedCount} de {task.length}</p>
                    </div>
                </div>
            <ul>
                {task.map((todo, taskToDelete) => //vamos pegar o todoList que adicionamos as taks dentro
                    <Task
                        key={todo.id}
                        onDeleteTask={() => deleteTask(taskToDelete)}
                        content={todo.content}
                        updateSelectedCount={updateSelectedCount}                 />//vamos passar um map pra dentro dele e mostrar na tela todos
                //os items que estão dentro do todolist.
                )}             
            </ul>
            </section>
        </div>
    )
}