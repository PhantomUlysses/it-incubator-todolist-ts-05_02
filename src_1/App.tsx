import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";

type TodolistType = {
    id: string;
    title: string;
    filter: FilterValuesType;
}

type TasksStateType = {
    [key: string]: Array<TaskType>;
}

function App() {

    let todolistId1 = v1();
    let todolistId2 = v1();

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false}
        ],
        [todolistId2]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ]
    });

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ])

    // let [filter, setFilter] = useState<FilterValuesType>("all");


    function removeTask(todolistId: string, id: string) {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== id)});
        // let todolistTasks = tasks[todolistId];
        // tasks[todolistId] = tasks[todolistId].filter(t => t.id !== id);
        // setTasks({...tasks});
    }

    function addTask(todolistId: string, title: string) {
        setTasks({...tasks, [todolistId]: [{id: v1(), title: title, isDone: false}, ...tasks[todolistId]]});
        // let task = {id: v1(), title: title, isDone: false};
        // let todolistTasks = tasks[todolistId];
        // tasks[todolistId] = [task, ...todolistTasks];
        // setTasks({...tasks});
    }

    function changeStatus(todolistId: string, taskId: string, isDone: boolean) {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, isDone: isDone } : t)})
        // let task = tasks[todolistId].find(t => t.id === taskId);
        // if (task) {
        //     task.isDone = isDone;
        //     setTasks({...tasks});
        // }
    }

    function changeFilter(todolistId: string, value: FilterValuesType) {
        setTodolists(todolists.map(m => m.id === todolistId ? {...m, filter: value} : m));

        // let currentTodolist = todolists.find(f => f.id === todolistId);
        // if (currentTodolist) {
        //     currentTodolist.filter = value;
        //     setTodolists([...todolists]);
        // }
    }


    return (
        <div className="App">
            {todolists.map(tl => {
                let tasksForTodolist = tasks[tl.id];
                if (tl.filter === "active") {
                    tasksForTodolist = tasks[tl.id].filter(t => t.isDone === false);
                }
                if (tl.filter === "completed") {
                    tasksForTodolist = tasks[tl.id].filter(t => t.isDone === true);
                }
                return (
                    <Todolist
                        key={tl.id}
                        todolistId={tl.id}
                        title={tl.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={tl.filter}
                    />
                )
            })}
        </div>
    );
}

export default App;
